/**
 * Created by alphabeta on 18-1-28.
 */
const Sequelize = require('sequelize');
const log4js = require('log4js');
const {config} = require('./config/index');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');

log4js.configure(config);
const logger = log4js.getLogger();

const Op = Sequelize.Op;
const db = {
  host: 'localhost',
  database: 'xiaoma_new_bz',
  username: 'xiaoma_bz',
  password: 'xiaoma_bz',
};

const sequelize = new Sequelize(db.database, db.username, db.password, {
  host: config.host,
  dialect: 'mysql',
  operatorsAliases: Op,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});


// 使用Model模式

const TaskImageData = sequelize.define('task_image_data', {
  batchId: { type: Sequelize.INTEGER, field: 'batch_id', primaryKey: true },
  taskId: { type: Sequelize.INTEGER, field: 'task_id',  primaryKey: true },
  imageId: { type: Sequelize.INTEGER, field: 'image_id',  primaryKey: true },
  data: Sequelize.TEXT,
  passStatus: { type: Sequelize.INTEGER, field: 'pass_status' },
  state: Sequelize.STRING,
  createTime: { type: Sequelize.DATE, field: 'create_time' },
  updateTime: { type: Sequelize.DATE, field: 'update_time' },
}, {
  timestamps: false,
  createdAt: false,
  updatedAt: false,
  tableName: 'task_image_data',
});

async function getImage(batchId) {
  const images = await sequelize.query('select * from image where batch_id = ?', {
    replacements: [batchId],
    type: Sequelize.QueryTypes.SELECT,
  });
  let objs = [];
  if (images) {
    objs = images.map(image => {
      const {id, url, width, height} = image;
      const filename = url.slice(url.lastIndexOf(path.sep) + 1, url.length);
      return {
        "file_name":filename,
        "id":id,
        "width":width,
        "height":height
      };
    });
  }
  return objs;
}

async function getTag(batchId) {
  const tags = await sequelize.query('select * from batch_tag where batch_id = ?', {
    replacements: [batchId],
    type: Sequelize.QueryTypes.SELECT,
  });
  let objs = [];
  if (tags) {
    objs = tags.map(tag => {
      const {id, value, en, zh} = tag;
      return {
        "id":id,
        "name": value,
      };
    });
  }
  return objs;
}

async function getAnnotation(batchId) {
  const images = await TaskImageData.findAll({
    where: {
      batchId: {
        [Op.eq]: batchId
      }
    }
  });
  let annotations = [];
  if(images) {
    let totalIndex = 1;
    images.forEach((image) => {
      // 三种方式访问Model属性等价
      if(image.data) {
        const dataList = JSON.parse(image.data);
        const objects = [];
        if (dataList) {
          dataList.forEach(data => {
            const {type, label, path, width, height, left, top, right, bottom, properties: {tags}} = data;
            objects.push({
              label,
              left,
              top,
              right,
              bottom,
              width,
              height,
              tags,
            });
          });
          objects.forEach(o => {
            const {label, left, top, right, bottom, width, height, tags} = o;
            if (tags && tags.length > 0) {
              const area = Math.round(width * height);
              const line = {
                "id":totalIndex,
                "category_id":tags[0],
                "bbox":[left,top,width,height],
                "image_id":image.imageId,
                "iscrowd":0,
                "area":area
              };
              annotations.push(line);
              totalIndex++;
            }
          });
        }
      }
    });
  }
  return annotations;
}


async function generate(batchId) {
  const images = await getImage(batchId);
  const tags = await getTag(batchId);
  const annotations = await getAnnotation(batchId);
  return {
    batchId,
    images,
    tags,
    annotations,
  };
}


generate(30).then((batch) => {
  const {
    batchId,
    images,
    tags,
    annotations,
  } = batch;

  const stream = fs.createWriteStream(`${__dirname}/output/${batchId}.txt`, {flags: 'w+'});
  stream.write(JSON.stringify({
    images,
    categories: tags,
    annotations: annotations.map((item) => {
      const tag = tags.filter(t => {
        return t.name === item.category_id;
      });
      const categoryId = tag && tag.length > 0 ? tag[0].id : '';
      return {
        ...item,
        category_id: categoryId
      }
    }),
  }));
  stream.close();
});

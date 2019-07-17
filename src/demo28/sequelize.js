/**
 * Created by alphabeta on 18-1-28.
 */
const Sequelize = require('sequelize');
const log4js = require('log4js');
const {config} = require('./config/index');
const _ = require('lodash');
const fs = require('fs');

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

// sequelize.authenticate()
//   .then(() => {
//     logger.info('Connection has been established successfully.');
//   })
//   .catch(err => {
//     logger.error('Unable to connect to the database:', err);
//   });

// sequelize默认返回的是(results, metadata)的结果，参看spread方法。
// results是结果集(results array)，metadata是受影响的记录(affected rows)。
// 由于是raw query模式，如果不需要metadata记录，可以指定type: Sequelize.QueryTypes.SELECT，只获取results
// sequelize.query('select * from t_user',
//   {
//     type: Sequelize.QueryTypes.SELECT,
//   })
//   .then((tUserRows) => {
//     logger.info(tUserRows);
//   })
//   .catch(err => {
//     logger.error('Unable to execute sql:', err);
//   });
//
// sequelize.query('select * from t_user where id = ?',
//   {
//     replacements: [130],
//   })
//   .spread((results, metadata) => {
//     // Results will be an empty array and metadata will contain the number of affected rows.
//     logger.info(results);
//     logger.info(metadata);
//   });

// 两种不同的变量替换，?和:key方式，以下是?方式
// sequelize.query('select * from t_user where id = ?',
//   {
//     replacements: [130],
//     type: Sequelize.QueryTypes.SELECT,
//   })
//   .then((tUserRows) => {
//     logger.info(tUserRows);
//   })
//   .catch(err => {
//     logger.error('Unable to execute sql:', err);
//   });

// sequelize.query('select * from t_user where id in(?)',
//   {
//     replacements: [[122, 123]],
//     type: Sequelize.QueryTypes.SELECT,
//   })
//   .then((tUserRows) => {
//     logger.info(tUserRows);
//   })
//   .catch(err => {
//     logger.error('Unable to execute sql:', err);
//   });

// sequelize.query('select * from t_user where name like ?',
//   {
//     replacements: ['%赵%'],
//     type: Sequelize.QueryTypes.SELECT,
//   })
//   .then((tUserRows) => {
//     logger.info(tUserRows);
//   })
//   .catch(err => {
//     logger.error('Unable to execute sql:', err);
//   });

// 两种不同的变量替换，?和:key方式，以下是:key方式
// sequelize.query('select * from t_user where id = :id',
//   {
//     replacements: {
//       id: 130,
//     },
//     type: Sequelize.QueryTypes.SELECT,
//   })
//   .then((tUserRows) => {
//     logger.info(tUserRows);
//   })
//   .catch(err => {
//     logger.error('Unable to execute sql:', err);
//   });
//
// sequelize.query('select * from t_user where id in(:ids)',
//   {
//     replacements: {
//       ids: [122, 123],
//     },
//     type: Sequelize.QueryTypes.SELECT,
//   })
//   .then((tUserRows) => {
//     logger.info(tUserRows);
//   })
//   .catch(err => {
//     logger.error('Unable to execute sql:', err);
//   });
//
// sequelize.query('select * from t_user where name like :name',
//   {
//     replacements: {
//       name: '%赵%',
//     },
//     type: Sequelize.QueryTypes.SELECT,
//   })
//   .then((tUserRows) => {
//     logger.info(tUserRows);
//   })
//   .catch(err => {
//     logger.error('Unable to execute sql:', err);
//   });


// 使用Model模式

const TaskVideoData = sequelize.define('task_video_data', {
  batchId: { type: Sequelize.INTEGER, field: 'batch_id', primaryKey: true },
  taskId: { type: Sequelize.INTEGER, field: 'task_id',  primaryKey: true },
  videoId: { type: Sequelize.INTEGER, field: 'video_id',  primaryKey: true },
  data: Sequelize.TEXT,
  passStatus: { type: Sequelize.INTEGER, field: 'pass_status' },
  state: Sequelize.STRING,
  createTime: { type: Sequelize.DATE, field: 'create_time' },
  updateTime: { type: Sequelize.DATE, field: 'update_time' },
}, {
  timestamps: false,
  createdAt: false,
  updatedAt: false,
  tableName: 'task_video_data',
});

TaskVideoData.findAll({
  where: {
    batchId: {
      [Op.eq]: 47
    }
  }
}).then(videos => {
  if(videos) {
    videos.forEach(video => {
      // 三种方式访问Model属性等价
      const dataList = JSON.parse(video.data);
      const paths = [];
      if(dataList) {
        const sortTracks = _.sortBy(dataList, item => item.id);

        sortTracks.forEach(track => {
          const {id, class: className, path} = track;
          if(path) {
            path.forEach(p => {
              const [timestamp, outside, occluded, bbox, attrs] = p;
              paths.push({
                id,
                class: className,
                timestamp,
                outside,
                occluded,
                bbox,
                attrs
              });
            })
          }
        });

        // const orderBy = _.sortBy(paths, item => item.id);
        const orderBy = _.sortBy(paths, item => item.timestamp);

        const stream = fs.createWriteStream(`${__dirname}/output/${video.videoId}.txt`);

        orderBy.forEach(p => {
          const {id, class: className, timestamp, outside, occluded, bbox, attrs} = p;
          const line = `${timestamp + 1}, ${id.replace(new RegExp(`${video.videoId}_`), '')}, ${bbox[0]}, ${bbox[1]}, ${bbox[2]}, ${bbox[3]}, ${outside ? 0 : 1}, ${className === 'niao' ? 4 : 1}, ${occluded ? 1 : 0}`;
          // console.log(line);
          stream.write(line + '\r\n');
        });
        stream.close();
      }
    })
  }
}).then(() => {
  // process.exit(0);
});

//
// // 过滤属性
// User.findAll({
//   attributes: ['id', 'name']
// }).then(users => {
//   users.forEach(user => {
//     logger.info(user.id, user.name, user.get('name'), user.getDataValue('name'))
//   });
// });


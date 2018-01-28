/**
 * Created by alphabeta on 18-1-28.
 */
var Sequelize = require('sequelize');
var log4js = require('log4js');
var {config} = require('./config');

log4js.configure(config);
const logger = log4js.getLogger();

const db = {
  host: 'localhost',
  database: 'jxrs',
  username: 'jxrs',
  password: 'jxrs',
};

var sequelize = new Sequelize(db.database, db.username, db.password, {
  host: config.host,
  dialect: 'mysql',

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

const User = sequelize.define('user', {
  id: { type: Sequelize.INTEGER, primaryKey: true },
  wechatId: { type: Sequelize.STRING, field: 'wechat_id' },
  name: Sequelize.STRING,
  phone: Sequelize.STRING,
  email: Sequelize.STRING,
  nickName: { type: Sequelize.STRING, field: 'nick_name' },
  sign: Sequelize.STRING,
  avatar: Sequelize.STRING,
  status: Sequelize.INTEGER,
  createTime: { type: Sequelize.DATE, field: 'create_time' },
  modifyTime: { type: Sequelize.DATE, field: 'modify_time' },
  registFrom: { type: Sequelize.STRING, field: 'regist_from' },
  firstLogon: { type: Sequelize.STRING, field: 'first_logon' },
  firstLogonTime: { type: Sequelize.DATE, field: 'first_logon_time' },
}, {
  timestamps: false,
  createdAt: false,
  updatedAt: false,
  tableName: 't_user',
});

User.findById(130).then(user => {
  // 三种方式访问Model属性等价
  logger.info(user.id, user.name, user.get('name'), user.getDataValue('name'))
});

// 过滤属性
User.findAll({
  attributes: ['id', 'name']
}).then(users => {
  users.forEach(user => {
    logger.info(user.id, user.name, user.get('name'), user.getDataValue('name'))
  });
});


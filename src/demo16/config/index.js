var path = require('path');

const config = {
  appenders: {
    stdout: {
      type: 'stdout',
    },
    everything: {
      type: 'file',
      filename: path.resolve(__dirname, '../logs/all-the-logs.log'),
    },
    emergencies: {
      type: 'file',
      filename: path.resolve(__dirname, '../logs/emergency.log'),
    },
    errors: {
      type: 'logLevelFilter',
      appender: 'emergencies',
      level: 'error'
    },
  },
  categories: {
    default: {
      appenders: ['stdout', 'errors', 'everything'],
      level: 'debug'
    },
    symbol: {
      appenders: ['stdout', 'errors', 'everything'],
      level: 'error'
    }
  }
};

exports.config = config;

'use strict';

const log4js = require('log4js');
const logger = log4js.getLogger();
const chalk = require('chalk');

logger.level = 'debug';
logger.debug("Some debug messages");
logger.debug(chalk.blue.underline.bgGreen('blue underline bgGreen'));

// tslint:disable: no-unsafe-any
require('dotenv').config();
import { Database } from './config/database';
import { IBotConfig } from './types/bot-user.interface';
import { Bot } from './bot';

let config: IBotConfig;
let locales: string;

try {
  config = require('../bot.json');
  console.info('Config bot found');
} catch {
  console.error('Config bot not found...');
  process.exit(1);
}

try {
  locales = require(`../locales/${ config.lang }.json`);
  console.info('Locales found');
} catch {
  console.error('Locales not found');
  process.exit(1);
}

Database.init()
  .then(res => {
    console.info(`Database Ok : Version ${ res.version }`);
    new Bot(config, locales);
  })
  .catch((err: Error) => {
    console.error(`Database KO : ${ err }`);
    process.exit(1);
  });

import mongoose = require('mongoose');

import { IConnectOptions } from 'types/databaseConfig.interface';

/**
 * @export
 * @abstract
 * @class Database
 */
export abstract class Database {
  /**
   * Initialize Database
   * @static
   * @memberof Database
   */
  public static async init(autoReco: boolean = false, recoTry: number = 5, recoInterval: number = 2000) {
    const connectOptions: IConnectOptions = {
      autoReconnect: autoReco,
      reconnectTries: recoTry,
      reconnectInterval: recoInterval,
      useNewUrlParser: true,
    };
    mongoose.Promise = global.Promise;
    return await mongoose.connect(`${ process.env.MONGODB_URI }${ process.env.MONGODB_DB }`, connectOptions);
  }
}

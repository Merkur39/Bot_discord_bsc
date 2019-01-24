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
  public static async init() {
    Promise.resolve();
  }
}

// TODO Implement Sequalize ORM
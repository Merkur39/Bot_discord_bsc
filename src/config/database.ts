import { IConnectOptions } from 'types/databaseConfig.interface';

/**
 * @export
 * @class Database
 */
export class Database {
  private static instance: Database;

  constructor() {
    // TODO Implement Sequalize ORM
  }

  /**
   * Initialize Database
   * @static
   * @returns
   * @memberof Database
   */
  public static init() {
    return new Promise((resolve, reject) => {
      if (!Database.instance) {
        Database.instance = new Database();
        resolve(Database.instance);
      }
      reject('Database is already instantiated');
    });
  }
}

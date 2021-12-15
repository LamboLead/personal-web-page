/**
 * This is the database module.<br>
 * It exports an IndexedDB database object.
 * @module Storage/database
*/

import * as DatabaseModule from './database-management-module.js';

/**
 * An IndexedDB database object
 * @type {IDBDatabase}
 */
const database = await DatabaseModule.openDatabase("LamboLead", 1, [
  {
    name: "Custom preferences"
  }
]);

Object.freeze(database);
export default database;
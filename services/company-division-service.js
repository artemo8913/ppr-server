const db = require("../db");
/**
 * Сервис для обращения к ДБ с данными о цехах, дистанциях электроснабжения, дирекциях,
 * а также к данным станциям и перегонов.
 * Доступ только у РАЗРАБОТЧИКА.
 * Подразделения хранят в себе: id, наименование, id вышестоящей подразделения.
 * Локации: id, наименование станции\перегона, класс линии
 */
class CompanyDivisionsService {
  static tableNames = ["directions", "distances", "subdivisions"];
  getTableNames() {
    return CompanyDivisionsService.tableNames;
  }
  async getId(name) {
    const columnNames = ["name", "name_short"];
    let result = null;

    firstCicle: for (let tName of CompanyDivisionsService.tableNames) {
      for (let colName of columnNames) {
        const queryString = `SELECT id FROM ${tName} WHERE ${colName} = ${name}`;
        const queryResult = await db.query(queryString);
        const find = queryResult.rows[0];
        if (find) {
          result = { [tName]: find };
          break firstCicle;
        }
      }
    }
    return result;
  }

  async createDirection(divisionTableName, name, shortName) {
    //Строку формирую вне запроса, т.к. нельзя передавать переменную для названия таблиц и
    //столбцов
    const queryString = `INSERT INTO ${divisionTableName} (name, name_short) VALUES ('${name}','${shortName}') RETURNING *`;
    const queryResult = await db.query(queryString);
    return queryResult.rows[0];
  }
  async getDivisionData(divisionTableName, id) {
    //Строку формирую вне запроса, т.к. нельзя передавать переменную для названия таблиц и
    //столбцов
    const queryString = `SELECT * FROM ${divisionTableName} WHERE id = ${id}`;
    const queryResult = await db.query(queryString);
    return queryResult.rows[0];
  }
  async getAllDivisionData() {
    const result = {};
    for (let tName of CompanyDivisionsService.tableNames) {
      const queryString = `SELECT * FROM ${tName}`;
      const queryResult = await db.query(queryString);
      result[tName] = queryResult.rows;
    }
    return result;
  }
  async updateDivisionData(divisionTableName, id, param, value) {
    const queryString = `UPDATE ${divisionTableName} SET ${param}='${value}' WHERE id = ${id} RETURNING *`;
    const queryResult = await db.query(queryString);
    return queryResult.rows[0];
  }
  async deleteDivision(divisionTableName, id){
    const queryString = `DELETE FROM ${divisionTableName} WHERE id = ${id}`;
    const queryResult = await db.query(queryString);
    return queryResult.rows[0];
  }
}
module.exports = new CompanyDivisionsService();
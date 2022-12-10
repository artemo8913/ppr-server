const db = require("../db");
/**
 * Сервис для обращения к ДБ с данными о цехах, дистанциях электроснабжения, дирекциях,
 * а также к данным станциям и перегонов.
 * Доступ только у РАЗРАБОТЧИКА.
 * Подразделения хранят в себе: id, наименование, id вышестоящей подразделения.
 * Локации: id, наименование станции\перегона, класс линии
 */
class companyDivisionsService {
  async getId(name) {
    const tableNames = ["directions", "distances", "subdivisions"];
    const columnNames = ["name", "name_short"];
    let result = null;

    firstCicle: for (let tName of tableNames) {
      for (let colName of columnNames) {
        const find = (
          await db.query(`SELECT id FROM $1 WHERE $2 = $3`, [
            tName,
            colName,
            name,
          ])
        ).rows[0];
        if (find) {
          result = { [tName]: find };
          break firstCicle;
        }
      }
    }
    return result;
  }
}
module.exports = new companyDivisionsService();

const db = require("../db");
/**
 * Сервис для работы с ППРами.
 * ДБ хранит в себе: id строки,
 */
class pprService {
  async addNewPlanToAllYearsPlans(
    name,
    year,
    id_subdivision,
    id_distance,
    id_direction,
    status = "формирование"
  ) {
    const queryResult = await db.query(
      `INSERT INTO all_pprs (name, year, id_subdivision, id_distance, id_direction, status) RETURNING id`,
      [name, year, id_subdivision, id_distance, id_direction, status]
    );
    return queryResult.rows[0];
  }
  async createNewYearPlan(
    name,
    year,
    id_subdivision,
    id_distance,
    id_direction,
    status = "формирование"
  ) {
    const queryResult = await db.query(
      `CREATE TABLE $1_$2 RETURNING *`,[name,year]
    );
  }
}
module.exports = new pprService();

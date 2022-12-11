const db = require("../db");
/**
 * Сервис для работы с ППРами.
 * ДБ хранит в себе: id строки,
 */
class PprService {
  async getPlanFromAllPlans(nameOfPprTable) {
    const queryResult = await db.query(`SELECT * FROM all_pprs WHERE name=$1`, [
      nameOfPprTable,
    ]);
    return queryResult.rows[0];
  }
  async addNewPlanToAllPlans(
    nameOfPprTable,
    year,
    idSubdivision,
    idDistance,
    idDirection,
    status
  ) {
    const queryResult = await db.query(
      `INSERT INTO all_pprs (name, year, id_subdivision, id_distance, id_direction, status) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [nameOfPprTable, year, idSubdivision, idDistance, idDirection, status]
    );
    return queryResult.rows[0];
  }
  async updatePlanInAllYearsPlans(id, param, value) {
    const queryString = `UPDATE all_pprs SET ${param}='${value} WHERE id=${id}' RETURNING *`;
    const queryResult = await db.query(queryString);
    return queryResult.rows[0];
  }
  async createNewYearPlan(prototypePlanName, nameOfPprTable) {
    const queryString = `CREATE TABLE ${nameOfPprTable} AS SELECT * FROM ${prototypePlanName}`;
    const queryResult = await db.query(queryString);
    console.log(queryResult);
  }
}
module.exports = new PprService();

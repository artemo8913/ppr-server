const db = require("../db");
//Добавить в таблицу столбы по согласованию
/**
 * Сервис для работы с ППРами.
 */
class PprService {
  static availableStatus = [
    "формирование",
    "шаблон",
    "на согласовании",
    "на утверждении",
    "утвержден",
    "ввод выполнения работ за январь",
    "ввод выполнения работ за февраль",
    "ввод выполнения работ за март",
    "ввод выполнения работ за апрель",
    "ввод выполнения работ за май",
    "ввод выполнения работ за июнь",
    "ввод выполнения работ за июль",
    "ввод выполнения работ за август",
    "ввод выполнения работ за сентябрь",
    "ввод выполнения работ за октябрь",
    "ввод выполнения работ за ноябрь",
    "ввод выполнения работ за декабрь",
    "завершен",
  ];
  getAvailableStatus() {
    return [...PprService.availableStatus];
  }
  async getPlanFromAllPlansByName(nameOfPprTable) {
    const queryResult = await db.query(`SELECT * FROM all_pprs WHERE name=$1`, [
      nameOfPprTable,
    ]);
    return queryResult.rows[0];
  }
  async getPlanFromAllPlansById(id) {
    const queryResult = await db.query(`SELECT * FROM all_pprs WHERE id=$1`, [
      id,
    ]);
    return queryResult.rows[0];
  }
  async getAllPlans() {
    const queryResult = await db.query(`SELECT * FROM all_pprs`);
    return queryResult.rows;
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
  async updatePlanInAllPlans(id, param, value) {
    const queryString = `UPDATE all_pprs SET ${param}='${value} WHERE id=${id}' RETURNING *`;
    const queryResult = await db.query(queryString);
    return queryResult.rows[0];
  }
  async deletePlanFromAllPlans(id){
    const queryString = `DELETE FROM all_pprs WHERE id=${id}`;
    const queryResult = await db.query(queryString);
    return `delete ppr with id=${id}`;
  }
  async createYearPlan(prototypePlanName, nameOfPprTable) {
    const queryString = `CREATE TABLE ${nameOfPprTable} AS SELECT * FROM ${prototypePlanName}`;
    const query = await db.query(queryString);
  }
  async getYearPlan(nameOfPprTable) {
    const queryString = `SELECT * FROM ${nameOfPprTable}`;
    const queryResult = await db.query(queryString);
    return queryResult.rows;
  }
  async updateYearPlan(nameOfPprTable, data) {
    const queryDeleteString = `DELETE FROM ${nameOfPprTable}`;
    const queryDelete = await db.query(queryDeleteString);
    let queryString = `INSERT INTO ${nameOfPprTable} (index_number, work_id, user_branch, subbranch, user_section, user_subsection, user_legal_document, user_norm_of_time, user_norm_of_time_document, user_periodicity, location, entry_year, last_maintenance_year, totalcount, user_measure, class_of_line, year_plan, year_plan_time, year_fact, year_fact_norm_time, year_fact_time, jan_plan, jan_plan_time, jan_fact, jan_fact_norm_time, jan_fact_time, feb_plan, feb_plan_time, feb_fact, feb_fact_norm_time, feb_fact_time, mar_plan, mar_plan_time, mar_fact, mar_fact_norm_time, mar_fact_time) VALUES `;
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      queryString += `('${row.index_number}', '${row.work_id}', '${row.user_branch}', '${row.subbranch}', '${row.user_section}', '${row.user_subsection}', '${row.user_legal_document}', '${row.user_norm_of_time}', '${row.user_norm_of_time_document}', '${row.user_periodicity}', '${row.location}', '${row.entry_year}', '${row.last_maintenance_year}', '${row.totalcount}', '${row.user_measure}', '${row.class_of_line}', '${row.year_plan}', '${row.year_plan_time}', '${row.year_fact}', '${row.year_fact_norm_time}', '${row.year_fact_time}', '${row.jan_plan}', '${row.jan_plan_time}', '${row.jan_fact}', '${row.jan_fact_norm_time}', '${row.jan_fact_time}', '${row.feb_plan}', '${row.feb_plan_time}', '${row.feb_fact}', '${row.feb_fact_norm_time}', '${row.feb_fact_time}', '${row.mar_plan}', '${row.mar_plan_time}', '${row.mar_fact}', '${row.mar_fact_norm_time}', '${row.mar_fact_time}')`;
      if(i < data.length - 1){
        queryString += `, `
      }
    }
    queryString += " RETURNING *";
    const query = await db.query(queryString);
    return query.rows;
  }
  async deletePprPlan(pprName){
    const queryString = `DROP TABLE ${pprName}`;
    const query = await db.query(queryString);
    return `deleted ppr ${pprName}`;
  }
}
module.exports = new PprService();
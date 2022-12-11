const db = require("../db");
/**
 * Сервис для обработки БД с работами.
 * Доступ только у РАЗРАБОТЧИКА.
 * В БД входят: ID, Раздел работы (эксплуатация, доп работы, непредвиденные, обеспечение),
 * Категория (в соответствии с нормативным документом),
 * Подкатегории (в соответствии с нормативным документом),
 * Ссылка на номер нормативного документа, Номер пункта нормативного документа, Ссылка на документ,
 * регламентирующий норму времени, Норма времени, Единица измерения
 */
class workService {
  async addWork(params) {
    const {
      branch,
      subbranch,
      section,
      subsection,
      legal_document,
      legal_document_chapter,
      measure,
      norm_of_time,
      norm_of_time_document,
      first_periodicity,
      second_periodicity,
      third_periodicity,
      forth_periodisity,
      fifth_periodisity
    } = params;
    const queryResult = await db.query(
      `INSERT INTO works (branch,
        subbranch,
        section,
        subsection,
        legal_document,
        legal_document_chapter,
        measure,
        norm_of_time,
        norm_of_time_document,
        first_periodicity,
        second_periodicity,
        third_periodicity,
        forth_periodisity,
        fifth_periodisity) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
        RETURNING *`,
      [
        branch,
        subbranch,
        section,
        subsection,
        legal_document,
        legal_document_chapter,
        measure,
        norm_of_time,
        norm_of_time_document,
        first_periodicity,
        second_periodicity,
        third_periodicity,
        forth_periodisity,
        fifth_periodisity,
      ]
    );
    return queryResult.rows;
  }
  async updateWork(id, param, value) {
    //Строку формирую вне запроса, т.к. нельзя передавать переменную для названия таблиц и
    //столбцов
    const queryString = `UPDATE works SET ${param}='${value}' WHERE id=${id} RETURNING *`;
    const queryResult = await db.query(queryString);
    return queryResult.rows[0];
  }
  async getWorkData(id) {
    const queryResult = await db.query(
      `SELECT * FROM works WHERE id = $1 RETURNING *`,
      [id]
    );
    return queryResult.rows[0];
  }
  async getAllWorkData() {
    const queryResult = await db.query(`SELECT * FROM works`);
    return queryResult.rows;
  }
  async deleteWork(id) {
    const queryResult = await db.query(
      `DELETE FROM works WHERE id = $1`,
      [id]
    );
    return queryResult.rows[0];
  }
}
module.exports = new workService();

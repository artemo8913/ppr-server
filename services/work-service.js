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
  async addWork(
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
  ) {
    await db.query(
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
        fifth_periodisity) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`,
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
  }
  async updateWork(id, param, value) {
    await db.query(`UPDATE works SET $2 = $3 WHERE id = $1`, [
      id,
      param,
      value,
    ]);
  }
}
module.exports = new workService();

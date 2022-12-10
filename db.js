const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ppr",
  password: "artemo8913",
  port: 5432,
});
module.exports = pool;

/**DATA BASE HELPER**/
/*
---------------ALL TABLES-------------------
Схема  |     Имя      |   Тип   | Владелец
--------+--------------+---------+----------
 public | all_pprs     | таблица | postgres
 public | directions   | таблица | postgres
 public | distances    | таблица | postgres
 public | ppr_proto    | таблица | postgres
 public | subdivisions | таблица | postgres
 public | users        | таблица | postgres
 public | works        | таблица | postgres
============================================

------------- directions ------------------
id | name | name_short
------------- distances -------------------
id | name | id_direction | name_short
------------- subdivisions ----------------
id | name | id_distance | name_short
============================================

-------------  users ----------------------
id | login | password | role | id_subdivision | id_distance | id_direction
============================================

------------- works ------------------------
id | branch | section | subsection | legal_document | legal_document_chapter | norm_of_time | norm_of_time_document | first_periodicity | second_periodicity | third_periodicity | forth_periodisity | fifth_periodisity | measure | subbranch
============================================

---------------- ppr_proto -------------------
id | index_number | work_id | user_branch | user_section | user_subsection | user_legal_document | user_norm_of_time | user_norm_of_time_document | user_periodicity | location | entry_year | last_maintenance_year | totalcount | user_measure | class_of_line | year_plan | year_plan_time | year_fact | year_fact_norm_time | year_fact_time | jan_plan | jan_plan_time | jan_fact | jan_fact_norm_time | jan_fact_time | feb_plan | feb_plan_time | feb_fact | feb_fact_norm_time | feb_fact_time | mar_plan | mar_plan_time | mar_fact | mar_fact_norm_time | mar_fact_time | subbranch

---------------- all_pprs -------------------
id | year | id_subdivision | id_distance | id_direction | status | name

*/
# Цифровой ППР дистанции электроснабжения. Серверная часть.
Node.JS + Express + PG + PostgreSQL

## API запросы
---------/api/work-------------------------
- post("/", addWork)
--- req.data:{branch, subbranch, section, subsection, legal_document, legal_document_chapter, measure, norm_of_time, norm_of_time_document, first_periodicity, second_periodicity, third_periodicity, forth_periodisity, fifth_periodisity}
- get("/:id", getWorkData);
--- req.params: {id}
- get("/", getAllWorkData);
- put("/", updateWorkData);
--- req.data: {id, param, value}
- delete("/:id", deleteWork)
--- req.params: {id}.
---------/api/ppr------------------------------
- post("/", createYearPpr);
--- req.data: {prototypePlanName, nameOfPprTable}.
- get("/:id", getYearPlan);
--- req.params: {id}.
- get("/", getAllPlans)
- put("/", updateYearPlan);
--- req.data: {nameOfPprTable, data: {index_number, work_id, user_branch, subbranch, user_section, user_subsection, user_legal_document, user_norm_of_time, user_norm_of_time_document, user_periodicity, location, entry_year, last_maintenance_year, totalcount, user_measure, class_of_line, year_plan, year_plan_time, year_fact, year_fact_norm_time, year_fact_time, jan_plan, jan_plan_time, jan_fact, jan_fact_norm_time, jan_fact_time, feb_plan, feb_plan_time, feb_fact, feb_fact_norm_time, feb_fact_time, mar_plan, mar_plan_time, mar_fact, mar_fact_norm_time, mar_fact_time}}.
- delete("/", deleteYearPlan);
--- req.params: {id}.
---------/api/divisions----------------
- post("/", companyDivisionConntroller.createDivision);
--- req.data: {divisionTableName, name, shortName};
- get("/:divisionTableName/:id", companyDivisionConntroller.getDivisionData);
--- req.params: {divisionTableName, id};
- get("/all", companyDivisionConntroller.getAllDivisionsData);
- put("/", companyDivisionConntroller.updateDivisionData);
--- req.data: {divisionTableName, id, param, value};
- delete("/", companyDivisionConntroller.deleteDivision);
--- req.params: {divisionTableName, id};

## SQL Database tables
============================================
|Название таблицы| Описание|
| ------------ | ---------- |
| all_pprs     | Содержит сводные данные обо всех годовых планах |
| directions   | Перечень дирекций по энергообеспечению |
| distances    | Перечень дистанций по электроснабжению |
| subdivisions | Перечень подразделений дистанций |
| ppr_proto    | Шаблон для составления годового плана |
| users        | Данные пользователей |
| works        | Информация о работах |

------------- directions ------------------
|Название Поля | Описание   |
| ------------ | ---------- |
| id           | id         |
| name         | Наименование |
| name_short   | Короткое наименование |

------------- distances -------------------
|Название Поля | Описание   |
| ------------ | ---------- |
| id           | id         |
| id_direction | Ссылка на id дирекции, куда входит дистанция |
| name         | Наименоваие|
| name_short   | Короткое наименование |

------------- subdivisions ----------------
|Название Поля | Описание   |
| ------------ | ---------- |
| id           | id         |
| id_distance  | Ссылка на id дистанции куда входит подразделение |
| name         | Наименоваие|
| name_short   | Короткое наименование |

-------------  users ----------------------
|Название Поля | Описание   |
| ------------ | ---------- |
| id           | id         |
| login        | логин      |
| password     | хэшированный пароль |
| role         | роль пользователя   |
| id_subdivision | id подразделения (если работает в подразделении) |
| id_distance  | id дистанции (если работает в дистанции) |
| id_direction | id дирекции (если работает в дирекции) |

---------------- all_pprs -------------------
|Название Поля | Описание   |
| ------------ | ---------- |
| id | id |
| year | год годового плана|
| id_subdivision | id подразделения|
|id_distance | id дистанции |
|id_direction | id дирекции |
|status | статус (состояние) |
|name| наименование |
* Хотя годовые планы составляются исключительно в подразделениях, думаю, что стоит дать возможность дистанциям и дирекциям разрабатывать свои шаблоны для ППР, на основе которых подразделения могли бы делать свои ППР. С другой стороны можно удалить лишние поля и оставить только id_subdivision, в котором null значило бы, что это шаблон ППРа.

------------- works ------------------------
|Название Поля | Описание   |
| ------------ | ---------- |
| id | id |
| branch | раздел работ |
| subbranch | подраздел работ |
| section | общее название работы |
| subsection | подраздел работы |
| legal_document | наименование нормативного документа, утверждающую данную работу |
| legal_document_chapter | глава нормативаного документа, утверждающую данную работу |
| norm_of_time | норма времени на выполнение работы |
| norm_of_time_document | документ, утверждающий норму времени на работу |
| measure| единица измерения работы | 
| first_periodicity | периодичность выполнения работы для линий I класса |
| second_periodicity | периодичность выполнения работы для линий II класса |
| third_periodicity | периодичность выполнения работы для линий III класса |
| forth_periodisity | периодичность выполнения работы для линий IV класса |
| fifth_periodisity | периодичность выполнения работы для линий V класса |

---------------- ppr_proto -------------------
|Название Поля | Описание   |
| ------------ | ---------- |
| id | id |
| index_number | index строки для сортировки |
| work_id | id номер работы |
| user_branch | (если нет work_id) пользовательский раздел работ |
| user_subbranch | пользовательский подраздел работ |
| user_section | (если нет work_id) общее название работы |
| user_subsection | (если нет work_id) подраздел работы |
| user_legal_document | (если нет work_id) наименование нормативного документа, утверждающую данную работу |
| user_norm_of_time | (если нет work_id) норма времени на работу |
| user_norm_of_time_document | (если нет work_id) документ, утверждающий норму времени на работу |
| user_periodicity |периодичность проведения работы (фактическая, проставляется пользователем) |
| user_measure | (если нет work_id) ед.измерения работы|
| location | местоположение, участок проведения работ |
| entry_year | год ввода в эксплуатация оборудования, в относительно которого создано оборудование |
| last_maintenance_year | год последнего полного выполнения работ |
| totalcount | общее кол-во оборудования |
| class_of_line | класс линии участка |
| year_plan | годовой план (объем работ) |
| year_plan_time | требуемый затраты чел.-ч на выполнение годового объема работ |
| year_fact | фактическое выполнение годового плана (объем работ) |
| year_fact_norm_time | затраты чел.-ч на фактический выполненные объем в соответствии с номой времени  |
| year_fact_time | фактические затраты чел.-ч на выполненные объем |
| jan_plan | план на январь (объем работ) |
| jan_plan_time | требуемый затраты чел.-ч на выполнение объема работ в январе |
| jan_fact |  фактическое выполнение январского плана (объем работ) |
| jan_fact_norm_time | затраты чел.-ч на фактический выполненные объем в соответствии с номой времени |
| jan_fact_time | фактические затраты чел.-ч на выполненные объем |
| ...etc | ... |

# Описание задачи 
## Процесс составления планов 
 
Ежегодно в каждом предприятии составляются планы выполнения планового-предупредительных работ (далее Годовые планы). 
Выглядят они как перечень работ, которые необходимо выполнить в течении года и сколько времени это займет. В Годовом плане всё расписано на каждый месяц. 
 
В этих планах помимо непосредственно обслуживания устройств электроснабжения содержаться различные организационные мероприятия (например, прохождение работниками медицинских осмотров, организация технической учебы). 
 
Первым делом при планировании считается сколько вообще человеко-часов есть (сколько рабочего времени работник отработает) с разбивкой по месяцам. 
 
Далее по каждому разделу разбиваются объемы работ так, чтобы работники были способны его выполнить. 
 
Когда начальник цеха подготовил Годовой план его проверяет инженер тех отдела, нормировщик (инженер по труду и заработной плате), инженер по охране труда, согласует заместитель начальника и утверждает начальник дистанции. 
 
Ежемесячно начальник подразделения составляет ведомость работ на следующий месяц (далее Месячный план). Составляется он на основе Годового плана с учётом невыполненных ранее работ (например работа была не выполнена в марте и перенесена на май или же июнь). 
Эти планы проверяет инженер тех отдела, нормировщик, утверждает заместитель начальника. 
По завершению месяца в Месячном плане и в Годовом плане ставится отметка об объеме выполненных работ, затраченном времени. Если были выполнены работы вне плана, то они дополнительно прописываются. Делается это зачастую вручную. 
Потом печатается/пишется рапорт о невыполненных позициях (что не сделали, в каком объеме, сколько времени на выполнение этой работы нужно было, и почему не выполнили). 
Самим начальникам 
 
Задача инженера проверить не наврал ли ему начальник цеха (по ошибке или злому умыслу). При этом не регламентируется как именно должен проверять. И в общем случае паралельно начальнику цеха заполняются годовые планы, сверяются данные по выполнению годовых планов, месячных, рапорта о не выполненных работах. 
 
В вышестоящей структуре тоже должны проверять нас, также это нерегламентировано. По этому какую ответную форму придумают, такой мы и будет отчитываться. Сейчас это заполнить таблицу по затраченному времени на выполнение работ и письменный доклад с перечислением того, что не сделано. 
 
## Проблема 
 
В зависимости от ответственности начальника, его понимания порядка действий, способностями даже просто печатать в ворде, добавить/скрыть строку в ексель на выходе имеем информацию, в которой надо сидеть, пытаться в ней разобраться, обработать. 
 
Помимо бумажной волокиты уже имеется несколько систем автоматизированного планирования, но в них начальники подразделений либо ничего не делают, либо проставляют значения "от фонаря": лишь бы по итоговым трудозатратам/часам цифры были нормальные. Эти автоматизированных системы не упрощают жизнь, не дополняют, а тем более не заменяют работу с бумажной документаций. 
 
# Чего хотелось бы добиться 
Для начальников цехов: 
 * Автоматизировать составление годовых, месяных планов, рапортов по установленным формам, внесение данных выполнения. Тем самым уменьшить затраты времени на их заполнение; 
 * Подготовка ланов, рапортов, их печать 
 * Снизить вероятность возникновение ошибок при переносе информации из одного плана в другой, данных о выполнении работ (они ведь дублируются), данных о перенесенных работах. 
 * Интерфейс должен быть настолько простой, но при этом гибким на добавление/исправление данных. Интерфейс такой, чтобы даже креветка справилась. 
 
Для руководителей дистанции, тех отдела (мое место): 
 * Согласовывать, утверждать планы.
 * Просмотр сводных данных, аналитических таблиц, диаграмм. Крч, смотрят кто, что выполнил, в каком объеме. Например, у нас 14 подразделений. Есть одна сводная таблица с работами и объемами запланированного и выполненного. Нажимаешь мышкой на какие-то позиции и показывается кто что сделал. 
 
Для руководителей выше нас: 
 * Тоже просто смотрят. Например имеется у них сводная таблица по всем работам по структурам сродни нашей. Нажатием мышки руководител идёт и ищет не выполняющие план цеха, лишает всех премии и думает о том, какой он хороший манагер. 
 * В общем, наблюдает всякие аналитические справки, данные, таблицы, диаграммы

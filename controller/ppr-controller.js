const pprService = require("../services/ppr-service");
const { body, validationResult } = require("express-validator");
//Имя для таблицы будет формироваться здесь, а не на фронте!
class PprController {
  async createYearPpr(req, res, next) {
    const {
      prototypePlanName,
      year,
      id_subdivision,
      id_distance,
      id_direction,
      status,
    } = req.body;
    //ТУТ ПРОВЕРКА ВСЕХ аттрибутов
    // body("nameOfPprTable").isAlphanumeric();
    // body("prototypePlanName").isAlphanumeric();
    // body("year").isLength({ min: 4, max: 4 });
    // body("idSubdivision").isInt();
    // body("idDistance").isInt();
    // body("idDirection").isInt();
    // const checkStatus = pprService
    //   .getAvailableStatus()
    //   .find((s) => s === status);
    // if (!checkStatus) {
    //   return req.status(400).end();
    // }
    const nameOfPprTable = `ppr${year}${id_subdivision}${id_distance}${id_direction}`;
    const isPlanExist = await pprService.getPlanFromAllPlansByName(
      nameOfPprTable
    );
    if (isPlanExist) {
      return res.status(400).end("Такой план уже существует");
    }
    const newPlan = await pprService.createYearPlan(
      prototypePlanName,
      nameOfPprTable
    );
    const addPlanToAllPlan = await pprService.addNewPlanToAllPlans(
      nameOfPprTable,
      year,
      id_subdivision,
      id_distance,
      id_direction,
      status
    );
    return res.json({ data: addPlanToAllPlan });
  }
  async getYearPlan(req, res, next) {
    const { id } = req.params;
    //здесь валидацию прописать
    //body("id").isInt();
    const isPlanExist = await pprService.getPlanFromAllPlansById(id);
    if (!isPlanExist) {
      return res.status(400).end("Такого плана не существует");
    }
    const yearPlan = await pprService.getYearPlan(isPlanExist.name);
    return res.json({ data: yearPlan });
  }
  //Добавить фильтр по подразделению (параметр)
  async getAllPlans(req, res, next) {
    const data = await pprService.getAllPlans();
    return res.json({ data: data });
  }
  async updateYearPlan(req, res, next) {
    const {nameOfPprTable, data} = req.body;
    //тут проверка данных
    const ppr = await pprService.updateYearPlan(nameOfPprTable, data);
    return res.json({data: ppr});
  }
  async deleteYearPlan(req, res, next) {
    const {id} = req.params;
    const isPlanExist = await pprService.getPlanFromAllPlansById(id);
    if (!isPlanExist) {
      return res.status(400).end("Такого плана не существует");
    }
    const deletedPprName = await pprService.deletePprPlan(isPlanExist.name);
    const deletedTableId = await pprService.deletePlanFromAllPlans(id);
    return res.json({data:`deleted ppr id: ${id}, name: ${isPlanExist.name}`});
  }
  async getAnalysisForCompanyDivision() {}
}
module.exports = new PprController();

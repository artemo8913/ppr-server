const pprService = require("../services/ppr-service");
//Имя для таблицы будет формироваться здесь, а не на фронте!
class PprController {
  async createYearPpr(req, res, next) {
    const {
      nameOfPprTable,
      prototypePlanName,
      year,
      idSubdivision,
      idDistance,
      idDirection,
      status,
    } = req.body;
    //ТУТ ПРОВЕРКА ВСЕХ аттрибутов
    const isPlanExist = await pprService.getPlanFromAllPlans(nameOfPprTable);
    if (isPlanExist) {
      return res.status(400).end("Такой план уже существует");
    }
    const addPlanToAllPlan = await pprService.addNewPlanToAllPlans(
      nameOfPprTable,
      year,
      idSubdivision,
      idDistance,
      idDirection,
      status
    );
    const newPlan = await pprService.createNewYearPlan(
      prototypePlanName,
      nameOfPprTable
    );
    return res.json({ data: addPlanToAllPlan });
  }
  async getYearPpr(req, res, next) {}
  async updateYearPpr(req, res, next) {}
  async deleteYearPpr(req, res, next) {}
  async getAnalysisForCompanyDivision() {}
}
module.exports = new PprController();

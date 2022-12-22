const companyDivisionService = require("../services/company-division-service");

class WorkController {
  async createDivision(req, res, next) {
    const { divisionTableName, name, shortName } = req.body;
    if (
      !companyDivisionService
        .getTableNames()
        .find((name) => name === divisionTableName) ||
      !name ||
      !shortName
    ) {
      return res.status(400).end();
    }
    const data = await companyDivisionService.createDirection(
      divisionTableName,
      name,
      shortName
    );
    return res.json({ data: data });
  }
  async getDivisionData(req, res, next) {
    const { divisionTableName, id } = req.params;
    if (
      !companyDivisionService
        .getTableNames()
        .find((name) => name === divisionTableName) ||
      !id
    ) {
      return res.status(400).end('Wrong or empty params divisionTableName and id');
    }
    const data = await companyDivisionService.getDivisionData(
      divisionTableName,
      id
    );
    return res.json({ data: data });
  }
  async getAllDivisionsData(req, res, next) {
    const data = await companyDivisionService.getAllDivisionData();
    return res.json({ data: data });
  }
  async updateDivisionData(req, res, next) {
    const { divisionTableName, id, param, value } = req.body;
    if (
      !companyDivisionService
        .getTableNames()
        .find((name) => name === divisionTableName) ||
      !id ||
      !param ||
      !value
    ) {
      return res.status(400).end();
    }
    const data = await companyDivisionService.updateDivisionData(
      divisionTableName,
      id,
      param,
      value
    );
    return res.json({ data: data });
  }
  async deleteDivision(req, res, next) {
    const { divisionTableName, id } = req.params;
    const data = await companyDivisionService.deleteDivision(
      divisionTableName,
      id
    );
    return res.json({ data: data });
  }
}
module.exports = new WorkController();

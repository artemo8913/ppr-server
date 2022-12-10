const workService = require("../services/work-service");

class WorkController {
  async addWork(req, res, next) {}
  async getWorkData(req, res, next) {
    const id = req.body.id;
    if (!id) return res.status(400).end();
    const data = await workService.getWorkData(id);
    return res.json({ data: data });
  }
  async updateWorkData(req, res, next) {
    const { id, param, value } = req.body;
    if (!id || !param || !value) return res.status(400).end();
    const data = await workService.updateWork(id,param,value);
    return res.json({ data: data });
  }
  async deleteWork(req, res, next) {}
}
module.exports = new WorkController();

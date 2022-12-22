const workService = require("../services/work-service");

class WorkController {
  async addWork(req, res, next) {
    const data = await workService.addWork(req.body);
    return res.json({ data: data });
  }
  async getAllWorkData(req, res, next) {
    const data = await workService.getAllWorkData();
    return res.json({ data: data });
  }
  async getWorkData(req, res, next) {
    const id = req.params.id;
    if (!id) return res.status(400).end();
    const data = await workService.getWorkData(id);
    return res.json({ data: data });
  }
  async updateWorkData(req, res, next) {
    const { id, param, value } = req.body;
    if (!id || !param || !value) return res.status(400).end();
    const data = await workService.updateWork(id, param, value);
    return res.json({ data: data });
  }
  async deleteWork(req, res, next) {
    const id = req.params.id;
    if (!id) return res.status(400).end();
    const data = await workService.deleteWork(id);
    return res.status(200).end();
  }
}
module.exports = new WorkController();

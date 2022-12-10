const userService = require("../services/user-service");

class UserController {
  async registrate(req, res, next) {}
  async login(req, res, next) {}
  async logout(req, res, next) {}
  async refresh(req, res, next) {}
  async updateInformation(req, res, next) {}
  async getOneUser(req, res, next) {}
  async getManyUsers(req, res, next) {}
}
module.exports = new UserController();

const router = require("express").Router();
const userController = require("../controller/user-controller");

router.post("/registate", userController.registrate);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.put("/update", userController.updateInformation);
router.get("/one", userController.getOneUser);
router.get("/many", userController.getManyUsers);

module.exports = router;
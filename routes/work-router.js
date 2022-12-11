const router = require("express").Router();
const workConntroller = require("../controller/work-controller");

router.post("/", workConntroller.addWork);
router.get("/", workConntroller.getWorkData);
router.get("/all", workConntroller.getAllWorkData);
router.put("/", workConntroller.updateWorkData);
router.delete("/", workConntroller.deleteWork);

module.exports = router;
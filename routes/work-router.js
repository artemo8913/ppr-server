const router = require("express").Router();
const workConntroller = require("../controller/work-controller");

router.post("/", workConntroller.createWork);
router.get("/", workConntroller.getWorkData);
router.put("/", workConntroller.updateWorkData);
router.delete("/", workConntroller.deleteWork);

module.exports = router;
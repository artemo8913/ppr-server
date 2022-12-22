const router = require("express").Router();
const workConntroller = require("../controller/work-controller");

router.post("/", workConntroller.addWork);
router.get("/:id", workConntroller.getWorkData);
router.get("/", workConntroller.getAllWorkData);
router.put("/", workConntroller.updateWorkData);
router.delete("/:id", workConntroller.deleteWork);

module.exports = router;
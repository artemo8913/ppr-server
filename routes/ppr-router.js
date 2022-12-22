const router = require("express").Router();
const pprConntroller = require("../controller/ppr-controller");

router.post("/", pprConntroller.createYearPpr);
router.get("/:id", pprConntroller.getYearPlan);
router.get("/", pprConntroller.getAllPlans);
router.put("/", pprConntroller.updateYearPlan);
router.delete("/:id", pprConntroller.deleteYearPlan);
router.get("/analysis", pprConntroller.getAnalysisForCompanyDivision);

module.exports = router;
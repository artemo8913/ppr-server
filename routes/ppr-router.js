const router = require("express").Router();
const pprConntroller = require("../controller/ppr-controller");

router.post("/", pprConntroller.createYearPpr);
router.get("/", pprConntroller.getYearPlan);
router.get("/all", pprConntroller.getAllPlans);
router.put("/", pprConntroller.updateYearPlan);
router.delete("/", pprConntroller.deleteYearPlan);
router.get("/analysis", pprConntroller.getAnalysisForCompanyDivision);

module.exports = router;
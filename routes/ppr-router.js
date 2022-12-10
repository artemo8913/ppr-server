const router = require("express").Router();
const pprConntroller = require("../controller/ppr-controller");

router.post("/", pprConntroller.createYearPpr);
router.get("/", pprConntroller.getYearPpr);
router.put("/", pprConntroller.updateYearPpr);
router.delete("/", pprConntroller.deleteYearPpr);
router.get("/analysis", pprConntroller.getAnalysisForCompanyDivision);

module.exports = router;
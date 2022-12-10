const router = require("express").Router();
const companyDivisionConntroller = require("../controller/company-division-controller");

router.post("/", companyDivisionConntroller.createDivision);
router.get("/", companyDivisionConntroller.getDivisionData);
router.put("/", companyDivisionConntroller.updateDivisionData);
router.delete("/", companyDivisionConntroller.deleteDivision);

module.exports = router;
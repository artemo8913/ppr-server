const router = require("express").Router();
const companyDivisionConntroller = require("../controller/company-division-controller");

router.post("/", companyDivisionConntroller.createDivision);
router.get("/:divisionTableName/:id", companyDivisionConntroller.getDivisionData);
router.get("/", companyDivisionConntroller.getAllDivisionsData);
router.put("/", companyDivisionConntroller.updateDivisionData);
router.delete("/:divisionTableName/:id", companyDivisionConntroller.deleteDivision);

module.exports = router;
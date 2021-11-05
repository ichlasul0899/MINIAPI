const express = require("express");
const router = express.Router();

const CilenyiController = require("../controllers/cilenyiController")

router.get("/", CilenyiController.getData);
router.post("/", CilenyiController.addData);
router.delete("/", CilenyiController.deleteData);

module.exports = router;
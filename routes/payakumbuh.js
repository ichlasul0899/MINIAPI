const express = require("express");
const router = express.Router();

const PayakumbuhController = require("../controllers/payakumbuhController")

router.get("/", PayakumbuhController.getData);
router.post("/", PayakumbuhController.addData);
router.delete("/", PayakumbuhController.deleteData);

module.exports = router;
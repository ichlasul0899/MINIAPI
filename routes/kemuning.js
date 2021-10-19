const express = require("express");
const router = express.Router();

const KemuningController = require("../controllers/kemuningController")

router.get("/", KemuningController.getData);
router.post("/", KemuningController.addData);
router.delete("/", KemuningController.deleteData);

module.exports = router;
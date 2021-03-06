const express = require("express");
const router = express.Router();

const ApiController = require("../controllers/apiController");

// List Api Existing
router.get("/", ApiController.readApis);

// Buat Tabel / Collection
router.post("/table", ApiController.createTable);

// Buat Schema Tabel / Nama Kolom
router.post("/schema", ApiController.createSchemaTable);

// Buat Api Link
router.post("/", ApiController.createApi);

// Lihat Detail Api

// Tanbah data 

// Edit data

// Hapus data

// Hapus API 
// router.delete("")

module.exports = router;
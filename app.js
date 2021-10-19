require('dotenv').config();

const express = require('express');
const cors = require("cors");
const routes = require("./routes/");
const mongoose = require("mongoose");

const app = express()
const port = 3000
const uri = process.env.MONGODBCONNECT
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(uri);
}

app.use("/", routes);

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`)
})
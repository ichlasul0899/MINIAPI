require('dotenv').config()

const express = require('express')
const routes = require("./routes/");
const mongoose = require('mongoose')
const cors = require("cors");


const app = express()
const port = 3000

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const uri = process.env.MONGODBCONNECT
mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    family: 4 // Use IPv4, skip trying IPv6
  }
).catch(error => {
    console.log(error)
});

app.use("/", routes);

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`)
})
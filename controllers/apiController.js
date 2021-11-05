const mongoose = require('mongoose')

const fs = require('fs');
const {MiniApi} = require('../models/miniapi')
const { capitalize } = require('../utils/allFunction')


class ApiController {

    static async readApis(req,res,next){

        try{
            const Apis = await MiniApi.find()
            if(Apis){

                res.status(200).json({
                    msg: 'Tampilkan Seluruh Api',
                    data: Apis
                })
            }
        } catch(err){
            console.log(err)
            res.status(400).json({
                msg: "Error get api"
            })
        }
    }

    static async createTable(req,res,next){
        const {nama_tabel, jumlah_kolom} = req.body
        let msg = `Tabel ${nama_tabel} berhasil di buat`

        try{
            //Get the default connection
            let db = mongoose.connection

            if(db){
                console.log(db)
            }
    
            //Bind connection to error event (to get notification of connection errors)
            db.on('error', console.error.bind(console, 'MongoDB connection error:'));
            
            try{
                db.createCollection(`${nama_tabel}`)

            } catch(err){
                console.log('Create table error')
                res.status(400).json({
                    msg: "Database Create Collection Error",
                    nama_tabel,
                    jumlah_kolom
                })
                
            }

            res.status(201).json({
                msg,
                
            })

        } catch(err){
            res.status(400).json({
                msg: "Database Error"
            })
        }

    }

    static async createSchemaTable(req,res,next){

        //TODO: Buat File Model

        const {nama_tabel, data} = req.body
        const myPath = `models/${nama_tabel.toLowerCase()}.js`

        try {
            var stream = fs.createWriteStream(myPath);
            stream.once('open', function(fd) {
                stream.write(`const mongoose = require('mongoose');\nconst Schema = mongoose.Schema;\n\nconst ${nama_tabel.toLowerCase()}Schema = new Schema({${data.map(e => `\n\t${e.nama_kolom} : { \n\t\ttype: "${e.tipe}",  \n\t\tmaxLength: "${e.panjang}", \n\t\tdefault: "${e.default}", \n\t\trequired: "${e.isNull}", \n\t}`)}\n}, {\n\ttimestamp: true\n})\n\nlet ${capitalize(nama_tabel)} = mongoose.model("${capitalize(nama_tabel)}", ${nama_tabel.toLowerCase()}Schema);\n\nmodule.exports = { ${capitalize(nama_tabel)} };`);
                stream.end();
            });

            res.status(201).json({
                msg: 'Kolom berhasil dibuat',
                kolom
            })

        }catch(err){
            res.status(400).json({
                msg: "Error created Schema",
                body: req.body
            })
        }       
    }

    static async createApi(req,res,next){

        //TODO : 1. Create New Controller, 2. Create New Route, 3. Update file index routes

        const {nama_tabel, url_name} = req.body

        const msg = `Success Created Link Api : http://localhost:3000/${url_name}`
        const myPath = `controllers/${nama_tabel.toLowerCase()}Controller.js`
        const myRoutesPath = `routes/${nama_tabel.toLowerCase()}.js`
        const namaController = `${capitalize(nama_tabel)}Controller`


        try{
            // create new controller
            var stream = fs.createWriteStream(myPath);
            stream.once('open', function(fd) {
                stream.write(`const {${capitalize(nama_tabel)}} = require('../models/${nama_tabel}')\n\nclass ${capitalize(nama_tabel)}Controller {\n\tstatic async getData(req,res,next){\n\t\ttry{\n\t\t\tconst data = await ${capitalize(nama_tabel)}.find()\n\t\t\tif(data){\n\t\t\t\tres.status(200).json({\n\t\t\t\t\tmsg: "Success get Data",\n\t\t\t\t\tdata\n\t\t\t\t})\n\t\t\t}\n\t\t}catch(err){\n\t\t\tres.status(400).json({\n\t\t\t\tmsg: "Error get data"\n\t\t\t})\n\t\t\tconsole.log(err)\n\t\t}\n\t}\n\n\tstatic async addData(req,res,next){\n\t\ttry{\n\t\t\tconst add_data = await ${capitalize(nama_tabel)}.create(req.body)\n\t\t\tif(add_data){\n\t\t\t\tres.status(201).json({\n\t\t\t\t\tmsg: 'Success add data',\n\t\t\t\t\tinputanuser: req.body,\n\t\t\t\t\tadd_data\n\t\t\t\t})\n\t\t\t}\n\t\t}catch(err){\n\t\t\tres.status(400).json({\n\t\t\t\tmsg: 'Failed add data'\n\t\t\t})\n\t\t}\n\t}\n\n\tstatic async deleteData(req,res,next){\n\t\tconst {id} = req.body\n\n\t\ttry{\n\t\t\tconst delete_data = await ${capitalize(nama_tabel)}.findByIdAndDelete(id)\n\t\t\tif(delete_data){\n\t\t\t\tres.status(201).json({\n\t\t\t\t\tmsg: 'Success delete data'\n\t\t\t\t})\n\t\t\t}\n\t\t}catch(err){\n\t\t\tres.status(400).json({\n\t\t\t\tmsg: 'Error delete data'\n\t\t\t})\n\t\t}\n\t}\n}\n\nmodule.exports = ${capitalize(nama_tabel)}Controller;`)
                stream.end();
            });
    
    
            var stream2 = fs.createWriteStream(myRoutesPath);
            stream2.once('open', function(fd) {
                stream2.write(`const express = require("express");\nconst router = express.Router();\n\nconst ${namaController} = require("../controllers/${nama_tabel.toLowerCase()}Controller")\n\nrouter.get("/", ${namaController}.getData);\nrouter.post("/", ${namaController}.addData);\nrouter.delete("/", ${namaController}.deleteData);\n\nmodule.exports = router;`)
                stream2.end();
    
            });
    
            try{
                const routeIndex = fs.readFileSync('./routes/index.js', 'utf-8')
                const myArr = routeIndex.split("\n")
                const importNewRoute = `const ${nama_tabel.toLowerCase()}Routes = require('./${nama_tabel.toLowerCase()}')`
                const addNewRoute = `router.use('/${url_name.toLowerCase()}', ${nama_tabel.toLowerCase()}Routes)`
    
                // Append after myArr[0]
                myArr.splice(1,0,importNewRoute)
    
                // Append afterr myArr[-4]
                myArr.splice(-4, 0, addNewRoute)
    
                const newValue = myArr.join("\n")
    
                fs.writeFile('./routes/index.js', newValue, 'utf-8', function(err,data){
                    if(err) throw err;
                    console.log('Done! Update Routes')
                })

            } catch (err){
                console.error(err)
                next()
            }
    
    
            // add to Api Collection 
            const addToDb = await MiniApi.create({
                title: nama_tabel,
                url_link: `http://localhost:3000/${url_name}`
            })

            if (addToDb){
                console.log('add to db')
            } else {
                console.log('Failed add to db')
            }

            res.status(201).json({
                msg
            })

        } catch (err){
            res.status(400).json({
                message: "Error created api"
            })
        }
    }
}


module.exports = ApiController;
const {Payakumbuh} = require('../models/payakumbuh')
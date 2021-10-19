const {Kemuning} = require('../models/kemuning')

class KemuningController {
	static async getData(req,res,next){
		try{
			const data = await Kemuning.find()
			if(data){
				res.status(200).json({
					msg: "Success get Data",
					data
				})
			}
		}catch(err){
			res.status(400).json({
				msg: "Error get data"
			})
			console.log(err)
		}
	}

	static async addData(req,res,next){
		try{
			const add_data = await Kemuning.create(req.body)
			if(add_data){
				res.status(201).json({
					msg: 'Success add data',
					inputanuser: req.body,
					add_data
				})
			}
		}catch(err){
			res.status(400).json({
				msg: 'Failed add data'
			})
		}
	}

	static async deleteData(req,res,next){
		const {id} = req.body

		try{
			const delete_data = await Kemuning.findByIdAndDelete(id)
			if(delete_data){
				res.status(201).json({
					msg: 'Success delete data'
				})
			}
		}catch(err){
			res.status(400).json({
				msg: 'Error delete data'
			})
		}
	}
}

module.exports = KemuningController;
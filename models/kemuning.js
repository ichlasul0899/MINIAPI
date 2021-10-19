const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kemuningSchema = new Schema({
	Judul : { 
		type: "String",  
		maxLength: "32", 
		default: "Ini judul", 
		required: "False", 
	},
	Text : { 
		type: "String",  
		maxLength: "32", 
		default: "Ini text", 
		required: "False", 
	},
	Par : { 
		type: "String",  
		maxLength: "32", 
		default: "Ini text", 
		required: "False", 
	}
}, {
	timestamp: true
})

let Kemuning = mongoose.model("Kemuning", kemuningSchema);

module.exports = { Kemuning };
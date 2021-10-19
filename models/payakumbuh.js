const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const payakumbuhSchema = new Schema({
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

let Payakumbuh = mongoose.model("Payakumbuh", payakumbuhSchema);

module.exports = { Payakumbuh };
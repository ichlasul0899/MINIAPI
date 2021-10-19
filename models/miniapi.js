const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const miniapiSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    url_link: {
        type: String,
        required: true
    }
},{
    timestamps: true
})
let MiniApi = mongoose.model("MiniApi", miniapiSchema);

module.exports = { MiniApi };
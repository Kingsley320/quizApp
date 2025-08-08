const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
    brand: {type: String, required: true, enum: ["hp", "dell", "mac"]},
    serialNo: {type: String, required: true, unique: true},
    model: {type: String, required: true},
    ownership: {type: String, required: true, enum: ["personal", "company"]},
    colour: {type: String, required:true},
    status: {type:String, enum:["Not Checked In", "Checked In", "Checked Out"], default: "Checked In"},
})

module.exports = mongoose.model("Device", deviceSchema);
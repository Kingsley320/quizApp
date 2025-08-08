const Device = require("../models/Device");
// const handleRequest = require("../middleware/handleRequest.js");

exports.getAllDevices = async (req, res) => {
    try {
        const devices = await Device.find();
        if (devices){
            return devices;
            // res.status(200).json(devices, {message: "Request successful"})
        }
    } catch (error) {
        res.status(500).json({Message: error.message})
    }
}

exports.createDevice = async (req, res) => {
  handleRequest(req, res, async (req) => {
    const { brand, serialNo, model, ownership, colour, status} = req.body;
    const newDevice = await Device.create({ brand, serialNo, model, ownership, colour, status });
    return newDevice;
  })
};
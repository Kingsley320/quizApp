
const handleRequest = async (req, res, callback) => {
  try {
    const result = await callback(req);
    res.status(201).json({
      message: "Request successful",
      data: result,
    });
  } catch (err) {
    // Handle duplicate key error
    if (err.message.includes("duplicate key")) {
      return res.status(400).json({ message: "Info already exists" });
    }

    // Other errors
    res.status(400).json({ message: err.message || "An error occurred" });
  }
};

// export default handleRequest;
module.exports = handleRequest

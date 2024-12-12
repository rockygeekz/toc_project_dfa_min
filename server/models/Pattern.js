const mongoose = require("mongoose");

const PatternSchema = new mongoose.Schema({
    type: String, // e.g., "keyword", "operator", "number"
    values: [String], // List of patterns
});

module.exports = mongoose.model("Pattern", PatternSchema);

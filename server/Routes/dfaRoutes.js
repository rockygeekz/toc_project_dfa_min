const express = require("express");
const { processInput } = require("../controllers/dfaController");

const router = express.Router();

// Route to process the input code
router.post("/process", processInput);

module.exports = router;

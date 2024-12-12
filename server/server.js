const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dfaRoutes = require("./routes/dfaRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/dfa", dfaRoutes);
app.get("/ping",(req,res)=>{
  console.log("Pong");
  res.send("pong")
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

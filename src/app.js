const express = require("express");
const schoolRoutes = require("./routes/schools");

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "School Management API is running"
  });
});

app.use("/", schoolRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal server error"
  });
});

module.exports = app;

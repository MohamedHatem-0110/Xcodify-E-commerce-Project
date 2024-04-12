require("dotenv").config();
require("./models/user");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { loadRoutes } = require("./router");
const MainApp = express();

(async () => {
  await MainApp.use(express.json())
    .use(cors())
    .use(function (req, res, next) {
      console.log(`[REQUEST](${req.ip}) ${req.path}`);
      next();
    });
  await loadRoutes(MainApp);
  mongoose.connect(process.env.DATABASE_HOST);
})();

// Route to handle the request for the front-end URL
MainApp.get("/getFrontEndUrl", (req, res) => {
  const frontEndUrl = req.headers.referer; // Extract the front-end URL from the request headers
  res.json({ frontEndUrl });
});

mongoose.connection.once("open", () => {
  console.log("[DATABASE] Successfully connected!");
  MainApp.listen(process.env.EXPRESS_PORT, () =>
    console.log("[INFO] Loaded app successfully!")
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("[ERROR] Unhandled Rejection at:", promise, "reason:", reason);
  // process.exit(1);
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("[ERROR] Uncaught Exception:", error);
  // process.exit(1);
});

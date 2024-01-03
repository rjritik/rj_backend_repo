// Import required modules
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import { configDotenv } from "dotenv";

// Load environment variables from a .env file
configDotenv();

// Create an Express application
const app = express();

// Middleware setup
app.use(bodyParser.json()); // Parse JSON requests
app.unsubscribe(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded requests
app.use(morgan("dev")); // Logging middleware

// Basic route
app.get("/", (req, res) => {
  console.log(`Request found from ${req.url}`);
  res.send("Hello world !!");
});

// Error middleware for handling 404 errors
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// Global error handling middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server started at ${port}`);
});

// import statements
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";

// Load environment variables from a .env file
dotenv.config();

// Create an Express application
const app = express();

// Middleware setup
app.use(bodyParser.json()); // Parse JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded requests
app.use(morgan("dev")); // Logging middleware

// custom middlewares

// setting the origin
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
//for checking the request url logs

app.use((req, res, next) => {
  console.log(`Request URL received for: ${req.url}`);
  next();
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
      status: error.status || 500,
    },
  });
});

// Routes
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server started at ${port} 🚀💻`);
});

/* ===========>>>>>>>>>    IMPORTS HERE  <<<<<<<<<<<======================= */
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import redis from "redis";

// Load environment variables from a .env file
dotenv.config();

// Create an Express application
const app = express();

/* ===========>>>>>>>>>    REDIS SERVICE HERE  <<<<<<<<<<<======================= */
//Create Redis client
const redisConfig = {
  host: process.env.REDIS_HOST || "http://localhost/", // Redis server host
  port: process.env.REDIS_PORT || 6379, // Redis server port
};

const client = redis.createClient(redisConfig);

//check if there is any error in the connection with Redis Server
client.on("error", (err) => {
  console.error(`Error connecting to Redis:${err}`);
});

// // Set a key-value pair
// client.set("mkey", "Hello Ritik Redis Server Date Set !!", (err, reply) => {
//   if (err) {
//     console.log(`Error setting key: ${err}`);
//   } else {
//     console.log(`Set key: ${reply}`);

//     // Retrieve the value for the key
//     client.get("mkey", (err, reply) => {
//       if (err) {
//         console.error(`Error getting value: ${err}`);
//       } else {
//         console.log(`Value for mkey: ${reply}`);

//         // Close the Redis connection after both set and get operations
//         client.quit();
//       }
//     });
//   }
// });

/* ===========>>>>>>>>>    MIDDLEWARES HERE  <<<<<<<<<<<======================= */
// Middleware setup
app.use(bodyParser.json()); // Parse JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded requests
app.use(morgan("dev")); // Logging middleware

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

/* ===========>>>>>>>>>    SERVER STARTS HERE  <<<<<<<<<<<======================= */
// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server started at ${port} 🚀💻`);
});

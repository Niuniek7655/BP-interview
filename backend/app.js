import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";

// Initialize environment variables
config();

// Import database connection (for checking connection)
import sequelize from "./utils/database.js";

// Import routes
import messagesRouter from "./routes/messages.js";

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));
app.use(bodyParser.json());

// Routes
app.use("/messages", messagesRouter);

// Root route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Interview task" });
});

// Global Error Handling Middleware
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ success: false, message: message, data: data });
});

// DB Connection - only authenticate, migrations handle schema
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

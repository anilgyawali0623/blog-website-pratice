import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import mongoose from "mongoose";

dotenv.config();
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("database is connected");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();
app.use(express.json());
app.get("/", (req, res, next) => {
  res.send({
    name: "anil",
  });
});
app.listen(process.env.PORT, (req, res) => {
  console.log("this server is working");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// incase the server doesnot connect with the server do this middleware

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

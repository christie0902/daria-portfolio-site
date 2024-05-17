import express from "express";
import path from "path";
import dotenv from "dotenv";
import methodOverride from 'method-override';
import { resolve } from "path";
import mongoose from "mongoose";
// @ts-ignore
import artRoutes from "./routes/artRoutes";
import dataRoutes from "./routes/api/dataRoutes";

dotenv.config();
const app = express();

// connect to MongoDB
const PORT = process.env.PORT || 3002;
const dbURI = process.env.dbURI || "mongodb://localhost:27017/mydatabase";

mongoose
  .connect(dbURI, {
    dbName: "daria-website",
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

//register view engine
app.set("view engine", "ejs");
app.set("views", resolve(__dirname, "views"));
console.log(resolve(__dirname, "views"));

// Middleware
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

/* 
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../views'))); */

// Routes
app.get("/", (req, res) => {
  res.redirect("/arts");
});

app.use("/arts", artRoutes);
app.use("/api", dataRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: " Page not found" });
});

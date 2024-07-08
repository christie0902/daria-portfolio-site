import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import methodOverride from 'method-override';
import { resolve } from "path";
import mongoose from "mongoose";
// @ts-ignore
import artRoutes from "./routes/artRoutes";
import dataRoutes from "./routes/api/dataRoutes";
import messageRoutes from './routes/messageRoutes';
import authRoutes from './routes/authRoutes';
import session from 'express-session';
import flash from 'connect-flash';
import { ensureAuthenticated } from './middleware/auth';


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


// Flash message
app.use(session({
  secret: 'test_secret_key',
  resave: false,
  saveUninitialized: true,
}));

app.use(flash());

// Make flash messages available in templates
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

//register view engine
app.set("view engine", "ejs");
app.set("views", resolve(__dirname, "views"));
console.log(resolve(__dirname, "views"));


// Middleware
app.use(cors({
  origin: [
      "http://localhost:5173",
      "http://www.daria.levitsky.info",
      "http://daria.levitsky.info",
      "https://www.daria.levitsky.info",
      "https://daria.levitsky.info",
      "http://daria-server.levitsky.info",
      "http://www.daria-server.levitsky.info",
      "https://daria-server.levitsky.info",
      "https://www.daria-server.levitsky.info",
      "http://localhost:3100"
  ],
  credentials: true
}));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.static("public"));
// app.use(express.static(path.join((__dirname, 'public'))));
app.use(express.urlencoded({ extended: true }));

/* 
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../views'))); */

// Routes
app.get("/admin", (req, res) => {
  res.redirect("/admin/arts");
});
app.get("/", (req, res) => {
  res.redirect("/admin/arts");
});

app.use("/admin/arts", ensureAuthenticated, artRoutes);
app.use("/api", dataRoutes);
app.use("/messages", ensureAuthenticated, messageRoutes);
app.use(authRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: " Page not found" });
});

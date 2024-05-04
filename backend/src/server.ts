import express from 'express';
import path from 'path';
import dotenv from "dotenv";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../views')));

// Routes
app.get('/api', (req, res) => {
    res.send('Hello from Express API!');
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
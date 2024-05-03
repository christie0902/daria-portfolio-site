import express from 'express';
import path from 'path';

const app = express();

// Middleware
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build')));

// Routes
app.get('/api', (req, res) => {
    res.send('Hello from Express API!');
});

// Serve the React app for any other requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
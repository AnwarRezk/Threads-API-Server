const express = require('express');
const morgan = require('morgan');
const logger = require('./config/logger');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route to check if server is running
app.get('/', (req, res) => {
    res.send('Threads API Server is running');
});

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/post', postRoutes);

//404 Middleware handler
app.use((req, res, next) => {
    res.status(404).json({
        message: "Resource not found"
    });
});

// Global error handler
app.use((err, req, res, next) => {
    logger.error(`Global error handler caught an error: ${err.message}`);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
    logger.info(`🤖 ~ Server is running on port ${port}`);
});
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const bugRoutes = require('./routes/bugRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/bugs', bugRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// use morgan for logging requests
const morgan = require('morgan');
app.use(morgan('dev'));

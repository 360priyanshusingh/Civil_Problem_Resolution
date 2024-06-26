// Require dotenv to load environment variables from .env file
require('dotenv').config();

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const AdminModel = require('./models/AdminModel');
const AdminRouter = require('./routers/AdminRouter');
const UserModel = require('./models/UserModel');
const UserRouter = require('./routers/UserRouter');
const ProblemModel = require('./models/ProblemModel');
const FeedBackModel = require('./models/FeedBackModel');
const ContactModel = require('./models/ContactModel');

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cors());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Routers
app.use('/admin', AdminRouter);
app.use('/user', UserRouter);

// Serve React Frontend
app.use(express.static(path.resolve(__dirname, 'frontend', 'build')));
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`);
});

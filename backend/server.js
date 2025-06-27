const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes.js'));
app.use('/api/subjects', require('./routes/subjectRoutes.js'));
app.use('/api/topics', require('./routes/topicRoutes.js'));
app.use('/api/quicknotes', require('./routes/quickNotes.js'));


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const cors = require('cors');
const connectToDB = require('./DB/db');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })  );
connectToDB();

const userRoutes = require('./Routes/user.routes');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/users', userRoutes);

module.exports = app;
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const cors = require('cors');
const connectToDB = require('./DB/db');
const cookieParser = require('cookie-parser');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })  );
app.use(cookieParser());

connectToDB();

const userRoutes = require('./Routes/user.routes');
const captainRoutes = require('./Routes/captain.routes');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);


module.exports = app;
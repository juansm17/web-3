require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


// INIT SERVER:
const app = express();


// INIT MIDDLEWARE:
//cors middleware
app.use(cors());

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//serve build folder on static request
app.use(express.static('client/build'));

// log requests(for development)
app.use((req, res, next) => {
    console.log(`${req.method} request on ${req.url}`);
    next();
});

// DEFINE ROUTES:
app.use('/api/users', require('./routes/api/users'));
app.use('/api/tweets', require('./routes/api/tweets'));
app.use('/api/auth', require('./routes/api/auth'));


// LISTEN TO PORT
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
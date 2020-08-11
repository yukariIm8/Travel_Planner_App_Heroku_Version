let path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
let bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

// Setup empty JS object to act as endpoint for all routes
let projectData = {};
let allData = [];

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

app.get('/', function (req, res) {
    res.sendFile('/dist/index.html')
})

// Setup Server
const port = 3000;
const server = app.listen(port, listening);

function listening() {
    console.log(`Server is running on local host: ${port}`);
};

// POST route for geographic data
app.post('/addGeographic', (req, res) => {
    projectData = {
        deptDate: req.body.deptDate,
        countdown: req.body.countdown,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        city: req.body.city,
        country: req.body.country
    };
    res.send(projectData);
});


// POST route for weather data
app.post('/addWeather', postWeatherData);

function postWeatherData(req, res) {
    projectData.highTemp = req.body.highTemp;
    projectData.lowTemp = req.body.lowTemp;
    projectData.description = req.body.description;
    res.send(projectData);
};

// POST route for image data
app.post('/addImage', postImageData);

function postImageData(req, res) {
    projectData.image = req.body.image;
    allData.push(projectData);
    res.send(allData);
};


// GET route for all the data
app.get('/all', getAllData);

function getAllData(req, res) {
    res.send(allData);
};

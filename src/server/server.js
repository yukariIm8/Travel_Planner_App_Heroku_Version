let path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
let bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

// Setup empty JS object to act as endpoint for all routes
let projectData = [];

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
    let geoData = {
        deptDate: req.body.deptDate,
        countdown: req.body.countdown,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        city: req.body.city,
        country: req.body.country
    };
    projectData.push(geoData);
    res.send(projectData);

});


// POST route for weather data
app.post('/addWeather', postWeatherData);

function postWeatherData(req, res) {
    let weatherData = {
        highTemp: req.body.highTemp,
        lowTemp: req.body.lowTemp,
        description: req.body.description,
    };
    projectData.push(weatherData);
    res.send(projectData);
};

// POST route for image data
app.post('/addImage', postImageData);

function postImageData(req, res) {
    let imageData = {
        image: req.body.image
    };
    projectData.push(imageData);
    res.send(projectData);
};


// GET route for all the data
app.get('/all', getAllData);

function getAllData(req, res) {
    res.send(projectData);
};

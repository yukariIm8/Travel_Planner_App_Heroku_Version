const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();


/* Middleware*/
// Configure express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Cors for cross origin allowance
app.use(cors());


// Initialize the main project folder
app.use(express.static('dist'));
app.get('/', (req, res) => {
    res.sendFile('/dist/index.html')
})


// Setup Server
const port = 3000;
const listening = () => {
    console.log(`Server is running on local host: ${port}`);
};
app.listen(process.env.PORT || port, listening);


// Setup empty JS object to act as endpoint for all routes
let projectData = {};
const allData = [];


// POST route for geographic data
app.post('/addGeo', (req, res) => {
    projectData = {
        deptDate: req.body.deptDate,
        countdown: req.body.countdown,
        retnDate: req.body.retnDate,
        tripLength: req.body.tripLength,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        city: req.body.city,
        country: req.body.country
    };
    res.send(projectData);
});


// POST route for weather data
app.post('/addWeather', (req, res) => {
    projectData.highTemp = req.body.highTemp;
    projectData.lowTemp = req.body.lowTemp;
    projectData.description = req.body.description;
    res.send(projectData);
});


// POST route for image data
app.post('/addImage', (req, res) => {
    projectData.image = req.body.image;
    allData.push(projectData);
    res.send(allData);
});


// GET route for all the data
app.get('/all', (req, res) => {
    res.send(allData);
});


module.exports = app
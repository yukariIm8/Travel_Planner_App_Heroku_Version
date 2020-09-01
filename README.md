# Travel Planner
![Travel Planner](./client/media/app-design.JPG?raw=true "Travel Planner")

## Project Overview

In this project, I have built a web tool that allows users enter the desired trip location, departing date, and returning date, so that users will get the a predicted forecast, an image of the location, length of trip, and more. 

## What did I do?
I have implemented the followings.
- Setting up Webpack for development and production.
- Setting up Webpack Loaders and Plugins.
- Developing front end and back end (server) with JavaScript to handle the requests to external 3 APIs on form submission.
- Developing functionalities to calculate the trip length and how soon the trip is.
- Creating layouts and page design with Sass.
- Setting up Service workers.
- Writing Unit test for the function defined in the src/client/js directory using Jest Framework.
- Writing Unit test for the endpoint in the server using Supertest.

## Tech stack
- Programming Languages - JavaScript, SCSS, HTML
- Webserver - Node
- Web application framework for routing - Express
- Build tool - Webpack. 
- External script - Service Worker
- External API - [Geonames](http://www.geonames.org/) (for Geographic data)
- External API - [Weatherbit](https://www.weatherbit.io/) (for Weather Forecast data)
- External API - [Pixabay](https://pixabay.com/api/docs/) (for Image data)

## Getting started
### Step 1: Install Dependencies
- Fork and clone the master branch.
- `cd` into your new folder and run:
```bash
npm install
```

### Step 2: Signup for API keys
Signing up will get you API keys.
- [Geonames](https://www.geonames.org/login)
- [Weatherbit](https://www.weatherbit.io/)
- [Pixabay](https://pixabay.com/accounts/register/?source=main_nav).


### Step 3: Declare your API keys
- Declare your API keys in app.js.


### Step 4: Running the Development Server
- Complile and start the server.
```bash
npm run dev
```

### Step 5: Testing (Optional)
- Run test scripts to test the JavaScript funciton and the server (app.js, server.js)
```bash
npm run test
```

### Step 6: Running the Production Server
- Open a new terminal window.
- Compile the code.
```bash
npm run build
```
- Start the server.
```bash
npm start
```

### Step 7: Accessing to localhost
- Access `localhost:8080`, and try the app!
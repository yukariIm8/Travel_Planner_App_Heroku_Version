import { countdownDate } from './countdownDate'
import { countTripLength } from './countTripLength'
import { updateUI } from './updateUI'
import { showPageTop, goTop } from './pageTop'
import { getGeo, getWeather, getImage, postAPIdata } from './apiData'


const performAction = (e) => {
    let city = document.getElementById('city').value;
    if (!city) {
      alert('City name is required.');
    }
    let deptDate = document.getElementById('dept-date').value;
    let returnDate = document.getElementById('return-date').value;
    let tripLength = countTripLength(deptDate, returnDate);
    let countdown = countdownDate(deptDate);
    // GET the geographic data.
    getGeo(city)
    // POST some geographic data to the app
    .then((data) => {
        return postAPIdata('http://localhost:3000/addGeo', {
            deptDate: deptDate,
            countdown: countdown,
            retnDate: returnDate,
            tripLength: tripLength,
            latitude: data.geonames[0].lat,
            longitude: data.geonames[0].lng,
            city: city,
            country: data.geonames[0].countryName,
        });
    })
    // Retrieve parameters to GET the weather data.
    .then((res) => {
      const lat = res.latitude;
      const lng = res.longitude;
      return { lat, lng };
    })
    // GET the weather data.
    .then(({ lat, lng }) => {
      return getWeather(lat, lng);
    })
    // POST some weather data to the app
    .then((data) => {
        return postAPIdata('http://localhost:3000/addWeather', {
          highTemp: data.data[0].high_temp,
          lowTemp: data.data[0].low_temp,
          description: data.data[0].weather.description
        });
    })
    // GET the image data.
    .then(() => {
      return getImage(city);
    })
    // POST image data to the app
    .then((data) => {
      return postAPIdata('http://localhost:3000/addImage', {
          image: data.hits[0].webformatURL
      });
    })
    .then(()=>updateUI())
};


// Show page top button
showPageTop();


// Scroll to page top
goTop();


// Add event listner to the generate button.
document.getElementById('plan').addEventListener('click', performAction);


export { performAction }
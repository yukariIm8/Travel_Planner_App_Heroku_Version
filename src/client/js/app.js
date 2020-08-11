// Global Variables
const gAPIKey = 'miirakuy';
const wAPIKey = 'b959fc9988b04d5e943a76b9b5c48ead';
const pAPIKey = '17846308-40feb30b8bc830ff79b193e88';


// Calculate how soon the trip is.
const countdownDate = dept => {
  let deptDate = new Date(dept);
  let currDate = new Date();
  let diffTime = deptDate.getTime() - currDate.getTime();
  let countdown = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return countdown;
}

// Calculate 
const countTripLength = (dept, retn) => {
  let deptDate = new Date(dept);
  let retnDate = new Date(retn);
  let diffTime = retnDate.getTime() - deptDate.getTime();
  let countdown = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return countdown;
};


// Async GET request to the Geonames API.
const getGeographic = async (city) => {
    const url = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${gAPIKey}`;
    const request = await fetch(url);

    try {
        const data = await request.json();
        return data
    } catch (error) {
        console.log('error', error);
    }
};


// Async GET request to the Weatherbit API.
const getWeather = async (lat, lng) => {
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${wAPIKey}`;
  const request = await fetch(url);

  try {
      const data = await request.json();
      return data
  } catch (error) {
      console.log('error', error);
  }
};


// Async GET request to the Pixabay API.
const getImage = async (city) => {
  const url = `https://pixabay.com/api/?key=${pAPIKey}&q=${city}&image_type=photo`;
  const request = await fetch(url);

  try {
      const data = await request.json();
      return data
  } catch (error) {
      console.log('error', error);
  }
};


// Async POST request to add the API data.
const postAPIdata = async (url='', data={}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData
  } catch (error) {
  console.log('error', error);
  }
};


// Update UI
const updateUI = async () => {
  const res = await fetch('http://localhost:3000/all');

  try {
      let data = await res.json();
      console.log(data);
      const parent = document.getElementById('entry-holder');
      parent.setAttribute('class', 'entry');

      while(parent.firstChild){
        parent.removeChild(parent.firstChild);
      }

      const i = data.length - 1;
      const htmlSnippet =
      `<div class="box-image">
        <h2 class="countdown-text">${data[i].city} is <span class="countdown-emphasis">${data[i].countdown}</span> days away♡</h2>
        <img class="city-image" src=${data[i].image} alt="city-image">
      </div>
      <div class="box-info-layout">
        <div class="box-dest">
          <p class="sub-text">Trip to</p>
          <h2 class="main-text">${data[i].city}, ${data[i].country}</h2>
        </div>
        <div class="box-info-sub-layout">
          <div class="box-trip-info">
            <p class="sub-text">Departing</p>
            <h2 class="main-text">${data[i].deptDate}</h2>
            <p class="sub-text">Returning</p>
            <h2 class="main-text">${data[i].retnDate}</h2>
            <p class="sub-text">Trip length</p>
            <h2 class="main-text">${data[i].tripLength} days</h2>
          </div>
          <div class="box-weather">
            <p class="sub-text">Typical Weather for then</p>
            <h4 class="main-text">${data[i].description}</h4>
            <div class="box-temp">     
              <p class="main-text"><span class="sub-text">High: </span>${data[i].highTemp}°</p>
              <p class="main-text"><span class="sub-text">Low: </span>${data[i].lowTemp}°</p>
            </div>
          </div>
        </div>
      </div>
      `;

      parent.insertAdjacentHTML('beforeend', htmlSnippet);

  } catch(error) {
      console.log('error', error);
  }
};

// Add event listner to the generate button.
document.getElementById('plan').addEventListener('click', performAction);

function performAction(e) {
    let city = document.getElementById('city').value;
    if (!city) {
      alert('City name is required.');
    }
    let deptDate = document.getElementById('dept-date').value;
    let returnDate = document.getElementById('return-date').value;
    let tripLength = countTripLength(deptDate, returnDate);
    let countdown = countdownDate(deptDate);
    // GET the geographic data.
    getGeographic(city)
    // POST some geographic data to the app
    .then((data) => {
        return postAPIdata('http://localhost:3000/addGeographic', {
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
}

// Show the pagetop button when the user scrolls down 100px from the top of the document 
const pageTopButton = document.getElementById('page-top');

const showButton = () => {
  let y = window.scrollY;
  if (y > 100) {
    pageTopButton.className = 'top-button show';
  } else {
    pageTopButton.className = 'top-button hide';
  }
};

const showPageTop = () => {
  window.addEventListener('scroll', showButton);
};


// Scroll to page top if the user click the page top button
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 40);
  }
};

const goTop = () => {
  pageTopButton.onclick = function(e) {
  e.preventDefault();
  scrollToTop();
  }
};


// Show page top button
showPageTop();


// Scroll to page top
goTop();

export { performAction }
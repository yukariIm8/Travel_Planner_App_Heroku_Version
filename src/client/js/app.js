// Global Variables
const gAPIKey = 'miirakuy';
const wAPIKey = 'b959fc9988b04d5e943a76b9b5c48ead';
const pAPIKey = '17846308-40feb30b8bc830ff79b193e88';


// Calculate how soon the trip is.
const countdownDate = date => {
  let deptDate = new Date(date);
  let currDate = new Date();
  let diffTime = deptDate.getTime() - currDate.getTime();
  let countdown = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return countdown;
}


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
      `<div class="box-place-date">
        <h2 class="place">${data[i].city}</h2>
        <h3 class="date">${data.date}</h3>
      </div>
      <div class="box-temp-icon-desc">
        <p class="temp">${data.temperature}<span>°F</span></p>
        <div class="box-icon-desc">
          <img src=${data.icon} alt="weather-icon">
          <h4 class="description">${data.description}</h4>
        </div>
      </div>
      <div class="box-feeling-content">
        <h4 class="feeling">feeling</h4>
        <p class="content">${data.feelings}</p>
      </div>`;

      parent.insertAdjacentHTML('beforeend', htmlSnippet);

  } catch(error) {
      console.log('error', error);
  }
};

// Add event listner to the generate button.
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    let city = document.getElementById('city').value;
    if (!city) {
      alert('City name is required.');
    }
    let deptDate = document.getElementById('dept-date').value;
    let countdown = countdownDate(deptDate);
    // GET the geographic data.
    getGeographic(city)
    // POST some geographic data to the app
    .then((data) => {
        return postAPIdata('http://localhost:3000/addGeographic', {
            deptDate: deptDate,
            countdown: countdown,
            latitude: data.geonames[0].lat,
            longitude: data.geonames[0].lng,
            city: city,
            country: data.geonames[0].countryName,
        });
    })
    // Retrieve parameters to GET the weather data.
    .then((res) => {
      let i = res.length - 1;
      const lat = res[i].latitude;
      const lng = res[i].longitude;
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
    //POST some image data to the app
    .then((data) => {
      return postAPIdata('http://localhost:3000/addImage', {
        image: data.hits[0].webformatURL,
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
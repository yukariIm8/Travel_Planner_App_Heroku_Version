// Global Variables
const gAPIKey = 'miirakuy';
const wAPIKey = 'b959fc9988b04d5e943a76b9b5c48ead';
const pAPIKey = '17846308-40feb30b8bc830ff79b193e88';


// Async GET request to the Geonames API.
const getGeo = async (city) => {
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


export { getGeo, getWeather, getImage, postAPIdata }
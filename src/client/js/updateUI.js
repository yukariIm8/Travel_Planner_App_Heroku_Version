// Update UI
const updateUI = async () => {
  const res = await fetch('http://localhost:3000/all');

  try {
      const data = await res.json();
      console.log(data);
      const parent = document.getElementById('entry-holder');
      parent.setAttribute('class', 'entry');

      while(parent.firstChild){
        parent.removeChild(parent.firstChild);
      }

      const i = data.length - 1;
      const htmlSnippet =
      `<div class="box-image">
        <h2 id="countdown-text" class="main-text">${data[i].city} is <span class="countdown-emphasis">${data[i].countdown}</span> days away♡</h2>
        <img class="city-image" src=${data[i].image} alt="city-image">
      </div>
      <div class="box-info-layout">
        <h2 class="sub-text">Trip to</h2>
        <p class="main-text">${data[i].city}, ${data[i].country}</p>
        <div class="box-info-sub-layout">
          <div class="box-trip-info">
            <h2 class="sub-text">Departing</h2>
            <p class="main-text">${data[i].deptDate}</p>
            <h2 class="sub-text">Returning</h2>
            <p class="main-text">${data[i].retnDate}</p>
            <h2 class="sub-text">Trip length</h2>
            <p class="main-text">${data[i].tripLength} days</p>
          </div>
          <div class="box-weather-info">
            <h2 class="sub-text">Typical Weather for then</h2>
            <p class="main-text">${data[i].description}</p>
            <div class="box-temp">
              <p class="main-text"><span class="sub-text">High: </span>${data[i].highTemp}°</p>
              <p class="main-text"><span class="sub-text">Low: </span>${data[i].lowTemp}°</p>
            </div>
          </div>
        </div>
      </div>`;

      parent.insertAdjacentHTML('beforeend', htmlSnippet);

  } catch(error) {
      console.log('error', error);
  }
};


export { updateUI }

const menuToggle    = document.getElementById('menu-toggle');
const mainNavUl     = document.getElementById('main-nav').querySelector('ul');
const darkToggleBtn = document.getElementById('dark-mode-toggle');
const copyrightYear = document.getElementById('copyright-year');
const lastModified  = document.getElementById('last-modified');


copyrightYear.textContent = new Date().getFullYear();
lastModified.textContent  = document.lastModified;


menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded',
    menuToggle.classList.contains('open') ? 'true' : 'false'
  );
  mainNavUl.classList.toggle('open');
});


const savedTheme = localStorage.getItem('chamber-theme');
if (savedTheme === 'dark') document.body.classList.add('dark');

darkToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('chamber-theme', isDark ? 'dark' : 'light');
  darkToggleBtn.textContent = isDark ? '☀️' : '◐';
});

darkToggleBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '◐';


const WEATHER_API_KEY = 'YOUR_API_KEY_HERE';
const CITY_NAME       = 'Medford,OR,US';
const UNITS           = 'imperial';

const weatherIconMap = {
  '01d':'☀️','01n':'🌙','02d':'⛅','02n':'⛅',
  '03d':'☁️','03n':'☁️','04d':'☁️','04n':'☁️',
  '09d':'🌧️','09n':'🌧️','10d':'🌦️','10n':'🌦️',
  '11d':'⛈️','11n':'⛈️','13d':'❄️','13n':'❄️',
  '50d':'🌫️','50n':'🌫️',
};

function formatTime(unix) {
  return new Date(unix * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function getDayName(unix) {
  return new Date(unix * 1000).toLocaleDateString('en-US', { weekday: 'long' });
}

async function fetchWeather() {
  const currentBox  = document.getElementById('current-weather-body');
  const forecastBox = document.getElementById('forecast-body');
  const apiNotice   = document.getElementById('api-notice');

  if (WEATHER_API_KEY === 'YOUR_API_KEY_HERE') {
    if (apiNotice) apiNotice.classList.add('show');
    renderWeatherPlaceholder(currentBox, forecastBox);
    return;
  }

  try {
    const currentRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&units=${UNITS}&appid=${WEATHER_API_KEY}`
    );
    const current = await currentRes.json();
    const icon = weatherIconMap[current.weather[0].icon] || '🌡️';
    const unit = '°F';

    currentBox.innerHTML = `
      <div class="weather-main">
        <div class="weather-icon">${icon}</div>
        <div>
          <div class="weather-temp">${Math.round(current.main.temp)}${unit}</div>
          <div class="weather-desc">${current.weather[0].description}</div>
        </div>
      </div>
      <div class="weather-details">
        <span>High: ${Math.round(current.main.temp_max)}${unit}</span>
        <span>Low: ${Math.round(current.main.temp_min)}${unit}</span>
        <span>Humidity: ${current.main.humidity}%</span>
        <span>Sunrise: ${formatTime(current.sys.sunrise)}</span>
        <span>Sunset: ${formatTime(current.sys.sunset)}</span>
      </div>`;

    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${CITY_NAME}&units=${UNITS}&appid=${WEATHER_API_KEY}`
    );
    const forecastData = await forecastRes.json();
    const seen = new Set();
    const days = [];
    const today = new Date().getDate();

    for (const item of forecastData.list) {
      const d = new Date(item.dt * 1000);
      if (d.getDate() === today) continue;
      const key = d.toDateString();
      if (!seen.has(key)) { seen.add(key); days.push(item); }
      if (days.length === 3) break;
    }

    forecastBox.innerHTML = days.map(day => `
      <div class="forecast-day">
        <span class="forecast-label">${getDayName(day.dt)}</span>
        <span>${weatherIconMap[day.weather[0].icon] || '🌡️'}</span>
        <span class="forecast-temp">${Math.round(day.main.temp_max)}°F</span>
      </div>`).join('');

  } catch (err) {
    console.error('Weather error:', err);
  }
}

function renderWeatherPlaceholder(currentBox, forecastBox) {
  currentBox.innerHTML = `
    <div class="weather-main">
      <div class="weather-icon">⛅</div>
      <div>
        <div class="weather-temp">75°F</div>
        <div class="weather-desc">Partly Cloudy</div>
      </div>
    </div>
    <div class="weather-details">
      <span>High: 85°F</span><span>Low: 52°F</span>
      <span>Humidity: 34%</span><span>Sunrise: 7:30 AM</span>
      <span>Sunset: 9:59 PM</span>
    </div>`;

  forecastBox.innerHTML = `
    <div class="forecast-day"><span class="forecast-label">Today</span><span>☀️</span><span class="forecast-temp">90°F</span></div>
    <div class="forecast-day"><span class="forecast-label">Wednesday</span><span>⛅</span><span class="forecast-temp">89°F</span></div>
    <div class="forecast-day"><span class="forecast-label">Thursday</span><span>🌧️</span><span class="forecast-temp">68°F</span></div>`;
}


async function loadSpotlights() {
  const container = document.getElementById('spotlights-container');
  try {
    const res = await fetch('data/members.json');
    const all = await res.json();
    const eligible = all.filter(m => m.level >= 2);
    const shuffled = eligible.sort(() => Math.random() - 0.5).slice(0, 3);

    container.innerHTML = shuffled.map(m => `
      <div class="spotlight-card">
        <div class="spotlight-header">
          <h4>${m.name}</h4>
          <p>${m.description.split('.')[0]}.</p>
        </div>
        <div class="spotlight-body">
          <img class="spotlight-img" src="${m.image}" alt="${m.name}"
            onerror="this.src='images/placeholder.svg'; this.onerror=null;">
          <div class="spotlight-info">
            <span><strong>Phone:</strong> ${m.phone}</span>
            <span><strong>URL:</strong> <a href="${m.website}" target="_blank">${new URL(m.website).hostname}</a></span>
          </div>
        </div>
      </div>`).join('');
  } catch (err) {
    console.error('Spotlights error:', err);
  }
}


fetchWeather();
loadSpotlights();
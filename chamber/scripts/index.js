const apiKey = "YOUR_OPENWEATHER_API_KEY";
const city = "Lagos";
const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

const currentTemp = document.getElementById("current-temp");
const weatherDesc = document.getElementById("weather-desc");
const forecastDiv = document.getElementById("forecast");
const spotlightContainer = document.getElementById("spotlights");


async function getWeather() {
  const response = await fetch(weatherURL);
  const data = await response.json();

  currentTemp.textContent = `Current Temp: ${data.list[0].main.temp}°C`;
  weatherDesc.textContent = data.list[0].weather[0].description;

  forecastDiv.innerHTML = "";
  for (let i = 8; i <= 24; i += 8) {
    const day = document.createElement("p");
    day.textContent = `${data.list[i].dt_txt.split(" ")[0]}: ${data.list[i].main.temp}°C`;
    forecastDiv.appendChild(day);
  }
}


async function loadSpotlights() {
  const response = await fetch("data/members.json");
  const members = await response.json();

  const qualified = members.filter(
    m => m.level === 2 || m.level === 3
  );

  const shuffled = qualified.sort(() => 0.5 - Math.random()).slice(0, 3);

  spotlightContainer.innerHTML = "";
  shuffled.forEach(member => {
    const card = document.createElement("article");
    card.classList.add("member-card");

    card.innerHTML = `
      <img src="${member.image}" alt="${member.name} logo">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <p>Level: ${member.level === 3 ? "Gold" : "Silver"}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
    `;
    spotlightContainer.appendChild(card);
  });
}


document.getElementById("copyright-year").textContent =
  new Date().getFullYear();
document.getElementById("last-modified").textContent = document.lastModified;

getWeather();
loadSpotlights();
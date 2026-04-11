
let allPlaces = [];
let favorites = new Set();
let activeFilter = "all";
let activeSort = "name-asc";
let searchQuery = "";
let weatherType = "normal";



function fetchWeather(lat, lon, city) {

  document.getElementById("weatherSection").innerHTML = "Loading weather...";

  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
    .then(res => {
      if (!res.ok) throw new Error("Weather API failed");
      return res.json();
    })
    .then(data => {

      if (!data.current_weather) throw new Error("No weather data");

      let temp = data.current_weather.temperature;
      let code = data.current_weather.weathercode;

      if (code == 0) weatherType = "sunny";
      else if (code >= 51 && code <= 67) weatherType = "rain";
      else weatherType = "normal";

      renderWeather(temp, city);
      fetchPlaces(lat, lon);
    })
    .catch(err => {
      document.getElementById("weatherSection").innerHTML =
        `<p style="color:red;">⚠️ Failed to load weather</p>`;
      console.error(err);
    });
}



function fetchPlaces(lat, lon) {

  document.getElementById("placesSection").innerHTML =
    `<div class="loader"><div class="spinner"></div></div>`;

  fetch("https://overpass.kumi.systems/api/interpreter", {
    method: "POST",
    body: `
      [out:json];
      (
        node["tourism"="hotel"](around:5000,${lat},${lon});
        node["leisure"="park"](around:5000,${lat},${lon});
        node["amenity"="restaurant"](around:5000,${lat},${lon});
        node["amenity"="cafe"](around:5000,${lat},${lon});
      );
      out;
    `
  })
  .then(res => {
    if (!res.ok) throw new Error("Places API failed");
    return res.json();
  })
  .then(data => {

    if (!data.elements || data.elements.length === 0) {
      document.getElementById("placesSection").innerHTML =
        `<p>No places found 😕</p>`;
      return;
    }

    allPlaces = data.elements;
    renderPlaces(allPlaces);
  })
  .catch(err => {
    document.getElementById("placesSection").innerHTML =
      `<p style="color:red;">⚠️ Failed to load places</p>`;
    console.error(err);
  });
}



function renderWeather(temp, city) {

  document.getElementById("weatherSection").innerHTML =
    `<div class="weather-card">
      <h3>${city}</h3>
      <p>🌡 Temp: ${temp}°C</p>
    </div>`;
}



function renderPlaces(arr) {

  let filtered = arr


    .filter(p => {
      if (activeFilter === "all") return true;
      return (
        p.tags?.tourism === activeFilter ||
        p.tags?.leisure === activeFilter ||
        p.tags?.amenity === activeFilter
      );
    })


    .filter(p => {
      if (!searchQuery) return true;
      return p.tags?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    })


    .sort((a, b) => {
      let A = a.tags?.name || "";
      let B = b.tags?.name || "";

      if (activeSort === "name-asc") return A.localeCompare(B);
      if (activeSort === "name-desc") return B.localeCompare(A);
      return 0;
    });


  let html = `<div class="places-grid">`;

  filtered.forEach(p => {

    let name = p.tags?.name || "No Name";

    let type = "";
    if (p.tags?.tourism === "hotel") type = "Hotel";
    else if (p.tags?.leisure === "park") type = "Park";
    else if (p.tags?.amenity === "restaurant") type = "Restaurant";
    else if (p.tags?.amenity === "cafe") type = "Cafe";

    //WEATHER LOGIC
    if (weatherType === "sunny" && type !== "Restaurant") return;
    if (weatherType === "rain" && type !== "Cafe" && type !== "Hotel") return;

    let isFav = favorites.has(p.id);

    html += `
      <div class="place-card">
        <div class="place-name">${name}</div>
        <div>${type}</div>

        <button onclick="toggleFav(${p.id})">
          ${isFav ? "❤️ Saved" : "🤍 Save"}
        </button>
      </div>
    `;
  });

  html += `</div>`;

  document.getElementById("placesSection").innerHTML = html;
}



function toggleFav(id) {

  if (favorites.has(id)) favorites.delete(id);
  else favorites.add(id);

  renderPlaces(allPlaces);
}



function handleSearch(val) {
  searchQuery = val;
  renderPlaces(allPlaces);
}



function handleFilter(type) {
  activeFilter = type;
  renderPlaces(allPlaces);
}



function handleSort(val) {
  activeSort = val;
  renderPlaces(allPlaces);
}



function searchCity() {

  let city = document.getElementById("cityInput").value;

  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${city}`)
    .then(res => {
      if (!res.ok) throw new Error("City API failed");
      return res.json();
    })
    .then(data => {

      if (!data.length) {
        alert("City not found ❌");
        return;
      }

      let lat = data[0].lat;
      let lon = data[0].lon;

      fetchWeather(lat, lon, city);
    })
    .catch(err => {
      alert("Error searching city ❌");
      console.error(err);
    });
}



function toggleTheme() {
  document.body.classList.toggle("dark");
}



document.getElementById("searchBtn").addEventListener("click", searchCity);

const placesByCity = {
  hyderabad: [
    {
      name: "Charminar",
      img: "images/places/charminar.jpg",
      category: "Heritage"
    },
    {
      name: "Hitech City",
      img: "images/places/hitechcity.jpg",
      category: "Tech"
    },
    {
    name: "Tank Bund",
    img: "images/places/tankbund.jpg",
    category: "Lake"
    }
  ],
  vijayawada: [
    {
      name: "Prakasam Barrage",
      img: "images/places/prakasam.jpg",
      category: "Landmark"
    },
    {
      name: "Bhavani Island",
      img: "images/places/bhavani island.jpg",
      category: "Recreation"
    },
    {
      name: "Durga Temple",
      img: "images/places/kanaka durga temple.jpg",
      category: "Divine"
    }
  ],
  visakhapatnam: [
    {
      name: "RK Beach",
      img: "images/places/rkbeach.jpg",
      category: "Beach"
    },
    {
      name: "Kailasagiri",
      img: "images/places/kailasagiri.jpg",
      category: "Hill Park"
    },
    {
      name: "Submarine",
      img: "images/places/submarine.jpg",
      category: "History"
    }
  ]
};

function normalizeCity(city) {
  return city.toLowerCase().trim();
}

function renderPlaces(city) {
  const normalizedCity = normalizeCity(city);
  const container = document.getElementById("featured-places");
  if (!placesByCity[normalizedCity]) {
    container.innerHTML = "<p>No featured places found for this city.</p>";
    return;
  }

  container.innerHTML = ""; // clear previous
  placesByCity[normalizedCity].forEach(place => {
    const div = document.createElement("div");
    div.className = "product-cart";
    div.innerHTML = `
      <img src="${place.img}" alt="${place.name}" />
      <span>${place.category}</span>
      <h4>${place.name}</h4>
    `;
    container.appendChild(div);
  });
}

window.onload = function () {
  const locationBar = document.getElementById("location-bar");

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const apiKey = "0d4b29d358a844bc88a1a760ad45307b";

      fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          const components = data.results[0].components;
          const city = components.city || components.town || components.village || components.state;
          if (city) {
            locationBar.innerText = `📍 ${city}`;
            renderPlaces(city);
            const cityDropdown = document.getElementById("city-select");
            cityDropdown.value = normalizeCity(city);
          }
        })
        .catch(() => {
          locationBar.innerText = "📍 Unable to detect";
        });
    }, () => {
      locationBar.innerText = "📍 Permission denied";
    });
  } else {
    locationBar.innerText = "📍 Not supported";
  }

  // Dropdown change
  document.getElementById("city-select").addEventListener("change", function () {
    const selectedCity = this.value;
    if (selectedCity) {
      document.getElementById("location-bar").innerText = `📍 ${selectedCity}`;
      renderPlaces(selectedCity);
    }
  });
};

// Dummy data generator for air quality
const generateDummyData = () => {
    return {
        aqi: Math.floor(Math.random() * 300) + 1,  // Random AQI value between 1 and 300
        pm25: Math.floor(Math.random() * 200) + 1,  // Random PM2.5 level between 1 and 200 µg/m³
        temperature: (Math.random() * 35).toFixed(1),  // Random temperature between 0°C and 35°C
    };
};

// List of cities with their coordinates (latitude and longitude)
const cities = [
    { name: 'New York', lat: 40.7128, lon: -74.0060 },
    { name: 'Los Angeles', lat: 34.0522, lon: -118.2437 },
    { name: 'Chicago', lat: 41.8781, lon: -87.6298 },
    { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
    { name: 'London', lat: 51.5074, lon: -0.1278 },
    { name: 'Paris', lat: 48.8566, lon: 2.3522 },
];

const citySelector = document.getElementById('city-selector');

// Dynamically load cities into the dropdown
cities.forEach(city => {
    const option = document.createElement('option');
    option.value = city.name.toLowerCase().replace(/\s+/g, '-');
    option.textContent = city.name;
    citySelector.appendChild(option);
});

// Map initialization
const map = L.map('map').setView([51.5074, -0.1278], 5);  // Default to London

// Add OpenStreetMap tiles to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Update data for a selected city
const updateData = (city) => {
    const cityData = cities.find(c => c.name.toLowerCase().replace(/\s+/g, '-') === city);
    const dummyData = generateDummyData();

    // Update display with dummy data for now
    document.getElementById('aqi').textContent = dummyData.aqi;
    document.getElementById('pm25').textContent = `${dummyData.pm25} µg/m³`;
    document.getElementById('temperature').textContent = `${dummyData.temperature} °C`;

    // Center map on the city and add a marker
    map.setView([cityData.lat, cityData.lon], 10);
    L.marker([cityData.lat, cityData.lon]).addTo(map)
        .bindPopup(`<b>${cityData.name}</b><br>Latitude: ${cityData.lat}, Longitude: ${cityData.lon}`)
        .openPopup();
};

// Event listener for city selection
citySelector.addEventListener('change', (e) => {
    updateData(e.target.value);
});

// Load data for the default city (New York)
updateData('new-york');

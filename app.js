let map = L.map('map').setView([0, 0], 13);
let marker;
let watchId;

// OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Start tracking
function startTracking() {
  watchId = navigator.geolocation.watchPosition((pos) => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;

    if (!marker) {
      marker = L.marker([lat, lng]).addTo(map);
    } else {
      marker.setLatLng([lat, lng]);
    }

    map.setView([lat, lng], 15);

    console.log("Live Location:", lat, lng);
  });
}

// Stop tracking
function stopTracking() {
  navigator.geolocation.clearWatch(watchId);
}
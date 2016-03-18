// Setup map
var map = L.map('map').setView([33.00, -117.255], 14);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    detectRetina: true
}).addTo(map);


// Add markers to map
// Font-Awesome markers
L.marker([33.005, -117.270], {
    icon: L.ExtraMarkers.icon({
        icon: 'fa-spinner',
        shape: 'circle',
        markerColor: 'red',
        prefix: 'fa',
        extraClasses: 'fa-spin'
    })
}).addTo(map);
L.marker([33.005, -117.265], {
    icon: L.ExtraMarkers.icon({
        icon: 'fa-coffee',
        shape: 'square',
        markerColor: 'orange-dark',
        prefix: 'fa',
        iconColor: 'black'
    })
}).addTo(map);
L.marker([33.005, -117.260], {
    icon: L.ExtraMarkers.icon({
        icon: 'fa-cog',
        shape: 'star',
        prefix: 'fa',
        markerColor: 'orange',
        iconColor: '#6b1d5c'
    })
}).addTo(map);
L.marker([33.005, -117.255], {
    icon: L.ExtraMarkers.icon({
        icon: 'fa-spinner',
        shape: 'penta',
        markerColor: 'yellow',
        prefix: 'fa'
    })
}).addTo(map);

//Semantic UI
L.marker([33.005, -117.250], {
    icon: L.ExtraMarkers.icon({
        icon: 'add sign',
        shape: 'circle',
        markerColor: 'blue-dark',
        prefix: 'icon'
    })
}).addTo(map);
L.marker([33.005, -117.245], {
    icon: L.ExtraMarkers.icon({
        icon: ' archive',
        shape: 'square',
        markerColor: 'cyan',
        prefix: 'icon'
    })
}).addTo(map);
L.marker([33.005, -117.240], {
    icon: L.ExtraMarkers.icon({
        icon: 'loading',
        shape: 'penta',
        markerColor: 'purple',
        prefix: 'icon'
    })
}).addTo(map);

// Second Row
L.marker([32.995, -117.270], {
    icon: L.ExtraMarkers.icon({
        icon: 'plus sign',
        shape: 'circle',
        markerColor: 'violet',
        prefix: 'icon'
    })
}).addTo(map);

// Glyphicons
L.marker([32.995, -117.265], {
    icon: L.ExtraMarkers.icon({
        icon: 'glyphicon-cog',
        shape: 'square',
        prefix: 'glyphicon',
        markerColor: 'pink'
    })
}).addTo(map);
L.marker([32.995, -117.260], {
    icon: L.ExtraMarkers.icon({
        icon: 'glyphicon-bell',
        shape: 'star',
        prefix: 'glyphicon',
        markerColor: 'green-dark'
    })
}).addTo(map);
L.marker([32.995, -117.255], {
    icon: L.ExtraMarkers.icon({
        icon: 'fa-number',
        shape: 'penta',
        prefix: 'fa',
        markerColor: 'green',
        number: '1'
    })
}).addTo(map);
L.marker([32.995, -117.250], {
    icon: L.ExtraMarkers.icon({
        icon: 'glyphicon-cog',
        shape: 'circle',
        prefix: 'glyphicon',
        markerColor: 'green-light'
    })
}).addTo(map);

// No Icons
L.marker([32.995, -117.245], {
    icon: L.ExtraMarkers.icon({
        icon: '',
        shape: 'square',
        markerColor: 'black'
    })
}).addTo(map);
L.marker([32.995, -117.240], {
    icon: L.ExtraMarkers.icon({
        shape: 'star',
        markerColor: 'white'
    })
}).addTo(map);
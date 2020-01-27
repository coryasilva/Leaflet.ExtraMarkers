// Setup map
const shapes = ['circle', 'square', 'star', 'penta'];
const colors = ['red', 'orange-dark', 'orange', 'yellow', 'blue-dark', 'cyan', 'purple', 'violet', 'pink', 'green-dark', 'green', 'white', 'black'];
const space = 0.005;
const lat = 33.000;
const lng = -117.255;
const lats = shapes.slice().map((shape,i) => lat-(space * i));
const lngs = colors.slice().map((x,i) => lng+(space * i));
const rows = lats.map((y) => lngs.map(x => [y, x]));

// Define test cases
const tests = [{
  icon: 'fa-spinner',
  prefix: 'fa',
  extraClasses: 'fa-spin',
},{
  icon: 'fa-coffee',
  prefix: 'fa',
  iconColor: 'black',
  iconRotate: 270,
},{
  icon: 'fa-cog',
  prefix: 'fa',
  extraClasses: 'fa-5x',
  iconColor: '#6b1d5c',
},{
  icon: 'fa-spinner',
  prefix: 'fa',
},{
  icon: 'fa-spinner',
  prefix: 'fa',
  extraClasses: 'fa-spin',
  svg: true,
},{
  icon: 'add sign',
  prefix: 'icon',
  svg: true,
},{
  icon: ' archive',
  prefix: 'icon',
},{
  icon: 'sync',
  prefix: 'icon',
},{
  icon: 'plus sign',
  prefix: 'icon',
},{
  icon: 'glyphicon-cog',
  prefix: 'glyphicon',
},{
  icon: 'fa-igloo',
  prefix: 'fas',
},{
  icon: 'fa-number',
  number: '1',
},{
  icon: 'glyphicon-cog',
  prefix: 'glyphicon',
},{
  icon: 'fa-number',
  number: '42',
  svg: true,
}];

// Create map
const map = L.map('map').setView([lat - shapes.length / 2 * space, lng + colors.length / 2 * space], 14);

// Add test cases
rows.forEach((row, shapeIdx) => {
  row.forEach((col, colorIdx) => {
    L.marker(col, {
      icon: L.ExtraMarkers.icon(
        Object.assign(
          {},
          tests[(shapeIdx * row.length + colorIdx) % tests.length],
          {shape: shapes[shapeIdx], markerColor: colors[colorIdx]}
        )
      )
    }).addTo(map);
  })
});

// Add pop up to each marker 
map.eachLayer(function (layer) {
  if (layer._icon && layer._icon.className.includes('leaflet-marker-icon')) {
    var popUpTextArray = [];
    popUpTextArray.push('shape: \'' + layer.options.icon.options.shape + '\'');
    popUpTextArray.push('markerColor: \'' + layer.options.icon.options.markerColor + '\'');
    popUpTextArray.push('prefix: \'' + layer.options.icon.options.prefix + '\'');
    popUpTextArray.push('icon: \'' + layer.options.icon.options.icon + '\'');
    popUpTextArray.push('iconColor: \'' + layer.options.icon.options.iconColor + '\'');
    popUpTextArray.push('iconRotate: ' + layer.options.icon.options.iconRotate);
    popUpTextArray.push('extraClasses: \'' + layer.options.icon.options.extraClasses + '\'');
    popUpTextArray.push('number: \'' + layer.options.icon.options.number + '\'');
    popUpTextArray.push('svg: ' + layer.options.icon.options.svg);
    var popUpText = popUpTextArray.join('<br />');
    layer.bindPopup(popUpText);
  }
});
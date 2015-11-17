# Leaflet.extra-markers plugin v1.0.0
<a href="https://github.com/lvoogdt/Leaflet.awesome-markers">Big Thanks to lvoogdt of Leaflet.awesome-markers</a>

This plugin depends on either Bootstrap, Font-Awesome, or Semantic-UI for the rendering of the icons. See these urls above for more information.


##Icons
Version 1.0 of Leaflet.extra-markers is designed for:
- [Bootstrap 3 icons](http://twitter.github.com/bootstrap/)
  -  [Integration](http://getbootstrap.com/getting-started/) 
- [Font Awesome 4.0](http://fortawesome.github.com/Font-Awesome/)
  - [Integration](http://fortawesome.github.io/Font-Awesome/get-started/)
- [Semantic UI 0.9.8 icons](http://semantic-ui.com/)
- [Ion Icons 2.0.1](http://ionicons.com/)
- Leaflet 0.5-Latest

## Screenshots
![ExtraMarkers screenshot](https://raw.github.com/coryasilva/Leaflet.ExtraMarkers/master/screenshot.png "Screenshot of ExtraMarkers")

<a href="http://coryasilva.github.io/Leaflet.ExtraMarkers/" target="_blank">Demo</a>


##Using the plugin

1. First, follow the steps for including on of the icon fonts mentioned above
  - **Font-Awesome:** follow the [getting started guide](##Icons)
  - **Twitter bootstrap:** steps [here]
2. Next, copy the dist/images directory, awesome-markers.css, and awesome-markers.js to your project and include them:
````xml
<link rel="stylesheet" href="css/leaflet.extra-markers.css">
````
or
````less
@import 'bower_components/src/less/Leaflet.extra-markers.less
````
and
````xml
<script src="js/leaflet.extra-markers.js"></script>
````
3. Now use the plugin to create a marker like this:
````js
  // Creates a red marker with the coffee icon
  var redMarker = L.ExtraMarkers.icon({
    icon: 'fa-coffee',
    markerColor: 'red',
    shape: 'square',
    prefix: 'fa'
  });
      
  L.marker([51.941196,4.512291], {icon: redMarker,}).addTo(map);
````
---


### Properties

| Property        | Description                  | Default Value | Possible  values                                     |
| --------------- | ---------------------------- | ------------- | ---------------------------------------------------- |
| icon            | Name of the icon WITH prefix | 'fa-home'     | See glyphicons or font-awesome (must include prefix)  |
| prefix          | Select de icon library       | 'glyphicon'   | 'fa' for font-awesome or 'glyphicon' for bootstrap 3 |
| markerColor     | Color of the marker          | 'blue'        | 'red', 'orange-dark', 'orange', 'yellow', 'blue-dark', 'cyan', 'purple', 'violet', 'pink', 'green-dark', 'green', 'green-light', 'black', 'white' |
| shape           | Shape of the marker          | 'circle'      | 'circle', 'square', 'star', 'penta' |
| iconColor       | Color of the icon            | 'white'       | 'white', 'black' or css code (hex, rgba etc) |
| spin            | REMOVED                      | false         | true or false. Font-awesome required |
| extraClasses    | Additional classes in the created <i> tag | '' | 'fa-rotate90 myclass' eller other custom configuration |

## License
- Leaflet.ExtraMarkers and colored markers are licensed under the MIT License - http://opensource.org/licenses/mit-license.html.
- Font Awesome: http://fortawesome.github.io/Font-Awesome/license/
- Twitter Bootstrap: http://getbootstrap.com/

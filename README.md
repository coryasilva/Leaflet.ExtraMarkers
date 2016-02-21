# Leaflet.extra-markers plugin v1.0.0
<a href="https://github.com/lvoogdt/Leaflet.awesome-markers">Big Thanks to lvoogdt of Leaflet.awesome-markers</a>

This plugin depends on either Bootstrap, Font-Awesome, or Semantic-UI for the rendering of the icons. See these urls above for more information.


##Icons
Version 1.0 of Leaflet.extra-markers is designed for:
- [Bootstrap 3 icons](http://twitter.github.com/bootstrap/)
  -  [Getting Started Guide](http://getbootstrap.com/getting-started/)
- [Font Awesome 4.0](http://fortawesome.github.com/Font-Awesome/)
  - [Getting Started Guide](http://fortawesome.github.io/Font-Awesome/get-started/)
- [Semantic UI 0.9.8 icons](http://semantic-ui.com/)
- [Ion Icons 2.0.1](http://ionicons.com/)
- Leaflet 0.5-Latest

## Screenshots
![ExtraMarkers screenshot](https://raw.github.com/coryasilva/Leaflet.ExtraMarkers/master/screenshot.png "Screenshot of ExtraMarkers")

<a href="http://coryasilva.github.io/Leaflet.ExtraMarkers/" target="_blank">Demo</a>


##Using the plugin


##### 1. Requirements #####

Follow the [getting started guide](#icons) for the desired font library and make sure its included in your project.

##### 2. Installing Leaflet.extra-markers #####

Next, copy the `dist/img` directory, `/dist/css/leaflet.extra-markers.min.css`, and `/dist/js/leaflet.extra-markers.min.js` to your project and include them:

````xml
<link rel="stylesheet" href="css/leaflet.extra-markers.min.css">
````
or
````less
@import 'bower_components/src/assets/less/Leaflet.extra-markers.less
````
and
````xml
<script src="js/leaflet.extra-markers.min.js"></script>
````

##### 3. Creating a Marker #####

Now use the plugin to create a marker like this:
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
| innerHTML       | own HTML code                | ''            | can be used to use SVG or PNG files |
| prefix          | Select de icon library       | 'glyphicon'   | 'fa' for font-awesome or 'glyphicon' for bootstrap 3 |
| markerColor     | Color of the marker          | 'blue'        | 'red', 'orange-dark', 'orange', 'yellow', 'blue-dark', 'cyan', 'purple', 'violet', 'pink', 'green-dark', 'green', 'green-light', 'black', 'white' |
| shape           | Shape of the marker          | 'circle'      | 'circle', 'square', 'star', 'penta' |
| iconColor       | Color of the icon            | 'white'       | 'white', 'black' or css code (hex, rgba etc) |
| spin            | REMOVED                      | false         | true or false. Font-awesome required |
| extraClasses    | Additional classes in the created <i> tag | '' | 'fa-rotate90 myclass' eller other custom configuration |
| number          | Add a text number to the icon| ''             | any number, must use icon fa-number |

## License
- Leaflet.ExtraMarkers and colored markers are licensed under the MIT License - http://opensource.org/licenses/mit-license.html.
- Font Awesome: http://fortawesome.github.io/Font-Awesome/license/
- Twitter Bootstrap: http://getbootstrap.com/

/*!
 * Leaflet.extra-markers
 * Custom Markers for Leaflet JS based on Awesome Markers
 * Leaflet ExtraMarkers
 * https://github.com/coryasilva/Leaflet.ExtraMarkers/
 * @author coryasilva <https://github.com/coryasilva>
 * @version 1.0.5
 */
(function(window, document, undefined) {
    "use strict";
    L.ExtraMarkers = {};
    L.ExtraMarkers.version = "1.0.1";
    L.ExtraMarkers.Icon = L.Icon.extend({
        options: {
            iconSize: [ 35, 45 ],
            iconAnchor: [ 17, 42 ],
            popupAnchor: [ 1, -32 ],
            shadowAnchor: [ 10, 12 ],
            shadowSize: [ 36, 16 ],
            className: "extra-marker",
            prefix: "",
            extraClasses: "",
            shape: "circle",
            icon: "",
            innerHTML: "",
            markerColor: "red",
            iconColor: "#fff",
            number: ""
        },
        initialize: function(options) {
            options = L.Util.setOptions(this, options);
        },
        createIcon: function() {
            var div = document.createElement("div"), options = this.options;
            if (options.icon) {
                div.innerHTML = this._createInner();
            }
            if (options.innerHTML) {
                div.innerHTML = options.innerHTML;
            }
            if (options.bgPos) {
                div.style.backgroundPosition = -options.bgPos.x + "px " + -options.bgPos.y + "px";
            }
            this._setIconStyles(div, options.shape + "-" + options.markerColor);
            return div;
        },
        _createInner: function() {
            var iconColorStyle = "", iconNumber = "", options = this.options;
            if (options.iconColor) {
                iconColorStyle = "style='color: " + options.iconColor + "' ";
            }
            if (options.number) {
                iconNumber = "number='" + options.number + "' ";
            }
            return "<i " + iconNumber + iconColorStyle + "class='" + options.extraClasses + " " + options.prefix + " " + options.icon + "'></i>";
        },
        _setIconStyles: function(img, name) {
            var options = this.options, size = L.point(options[name === "shadow" ? "shadowSize" : "iconSize"]), anchor, leafletName;
            if (name === "shadow") {
                anchor = L.point(options.shadowAnchor || options.iconAnchor);
                leafletName = "shadow";
            } else {
                anchor = L.point(options.iconAnchor);
                leafletName = "icon";
            }
            if (!anchor && size) {
                anchor = size.divideBy(2, true);
            }
            img.className = "leaflet-marker-" + leafletName + " extra-marker-" + name + " " + options.className;
            if (anchor) {
                img.style.marginLeft = -anchor.x + "px";
                img.style.marginTop = -anchor.y + "px";
            }
            if (size) {
                img.style.width = size.x + "px";
                img.style.height = size.y + "px";
            }
        },
        createShadow: function() {
            var div = document.createElement("div");
            this._setIconStyles(div, "shadow");
            return div;
        }
    });
    L.ExtraMarkers.icon = function(options) {
        return new L.ExtraMarkers.Icon(options);
    };
})(window, document);
# Leaflet extra markers v2

- TODO: Impl `origin`

[![ExtraMarkers screenshot](assets/screenshot.png "Screenshot of ExtraMarkers")](demos/index.html)

A collection of fine SVG map markers that can easily be colored, resized, or overlayed with any DOM node including icon libraries, like Lucide, FontAwesome, or Material.

> ⚠️ **WARNING**<br>
> This plugin is compatible with Leaflet v2, for Leaflet v1 compatibility [view the v1 branch](https://github.com/coryasilva/Leaflet.ExtraMarkers/tree/v1)

## Table of contents
- [**Demo**](demos/index.html)
- [**Getting started**](#getting-started)
- [**API**](#api)
  - [**Icon**](#class-icon)
  - [**ExtraOptions**](#interface-extraoptions)
  - [**createElement**](#function-createelementparams-elementparams-htmlelement)
  - [**createSvgElement**](#function-createsvgelementparams-elementparams-svgelement)
- [**Design**](#design)
  - [**SVG**](#svg)
  - [**Shadows**](#shadows)
  - [**HTML**](#html)
- [**Migration guide**](#migration-guide)
- [**License**](#license)

## Getting started
### Install
- NodeJS
  ```sh
  npm i leaflet-extra-markers
  ```
- Browser
  ```html
  <script type="importmap">
  {
    "imports": {
      "leaflet": "https://unpkg.com/leaflet@2.0.0-alpha.1/dist/leaflet.js",
      "leaflet-extra-marker": "https://unpkg.com/leaflet-extra-markers@latest/index.js"
    }
  }
  </script>
  ```
### Usage

```js
import { Marker } from "leaflet";
import { Icon, PinCirclePanel } from "leaflet-extra-markers";

const marker = new Marker(map.getCenter(), {
  icon: new Icon({
    accentColor: "firebrick",
    color: "indianred",
    content: "42",
    contentColor: "white",
    scale: 1,
    svg: PinCirclePanel,
  }),
});
```

### Full example
For more examples view the [**Demo**](demos/index.html).

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@2.0.0-alpha.1/dist/leaflet.css"
    />
  </head>
  <body>
    <div id="map" style="width:100%;height:400px;">
    <script type="importmap">
    {
      "imports": {
        "leaflet": "https://unpkg.com/leaflet@2.0.0-alpha.1/dist/leaflet.js",
        "leaflet-extra-marker": "https://unpkg.com/leaflet-extra-markers@latest/index.js"
      }
    }
    </script>
    <script type="module">
      import { Map, Marker } from "leaflet";
      import { Icon, PinCirclePanel } from "leaflet-extra-markers";

      const map = new Map("map").setView([0, 0], 3);

      const marker = new Marker(map.getCenter(), {
        icon: new Icon({
          accentColor: "firebrick",
          color: "indianred",
          content: "42",
          contentColor: "white",
          scale: 1,
          svg: PinCirclePanel,
        }),
      }).addTo(map);
    </script>
  </body>
</html>
```

## API

### `class Icon`
The Icon class extends [Leaflet's Icon class](https://leafletjs.com/reference-2.0.0.html#icon).

```ts
import { Marker } from "leaflet";
import { Icon, PinCirclePanel } from "leaflet-extra-markers";

const marker = new Marker([32.82,-117.43], {
  icon: new Icon({
    accentColor: "firebrick",
    color: "indianred",
    content: "42",
    contentColor: "white",
    size: 25,
    svg: PinCirclePanel,
  }),
});
```

```ts
class Icon extends IconBase<ExtraOptions> {
  constructor(options: ExtraOptions);
  createIcon(): HTMLElement;
  createShadow(): HTMLElement;
}
```

### `interface ExtraOptions`
These are the options you can pass into the `new Icon()` contructor. Note that this interface extends [Leaflet's IconOption](https://leafletjs.com/reference-2.0.0.html#icon-option), while these base options are supported as escape hatches, they should not be used in most circumstances.

#### `svg: SvgNode | undefined`
The marker (`Marker.icon` in leaflet) svg node.

*Default*: `"#000"`

#### `accentColor: string | undefined`
The accent color is applied to the icon variant and also
the dot on the empty state.

*Default*: `"#fff"`

#### `color: string | undefined`
The marker color. Will be set on the `root.style.color property.
The SVG path for the base marker shape has a `fill` set to `currentColor` to inherit this color.

Note: This setting could be overwritten by `rootStyle.color`.
Note: If `svgFillImageSrc` is defined, this setting will still be set but effectively ignored.

*Default*: `"#000"`.

#### `content: Content | ((opts: ExtraOptions) => Content) | undefined`
The content node to append to the `contentWrapper`.
This will be ignored if `contentHtml is set.

*Default*:
```js
createElement(["div", {
  style: {
    display: "block",
    height: "0.8em",
    width: "0.8em",
    backgroundColor: accentColor,
    borderRadius: "100%",
  },
}]);
```

#### `contentHtml: string | undefined`
Dangerously sets innerHTML of the contentWrapper.
If set this will override the `content` property.
WARNING: Possible XSS vector; sanitize user inputs if using this.

Example: `<i class="fa fa-coffee" />`

#### `contentColor: string | undefined`
The content (wrapper) color. Will be set on the `contentWrapper.style.color property.

Note: This setting could be overwritten by `contentWrapperStyle.color`.

*Default*: `"#fff"`

#### `shadow: "cast" | "drop" | "ellipse" | "none" | undefined`
The shadow variant.

*Default*: `"cast"`

#### `scale: number | undefined`
The scale of the SVG marker; height will be scaled proportionately. The markers are designed on a base `30px` wide grid. Min: `0.1`

*Default*: `1`

#### `svgFillImageSrc: string | undefined`
The url of an image to use as a fill for the marker. Image will be clipped by marker base shape. Consider retina devices when sizing images.

#### `contentWrapperClass: string | undefined`
The CSS class names added to the `contentWrapper` element.

#### `contentWrapperStyle: CSSStyleDeclaration | undefined`
The styles to set on `contentWrapper` element.

*Default*: `{}`

#### `rootClass: string | undefined`
The CSS class names added to the `root` element.

#### `rootStyle: CSSStyleDeclaration | undefined`
The styles to set on `root` element.

*Default*: `{}`

#### `shadowClass: string | undefined`
The CSS class names added to the `shadow` element.

#### `shadowStyle: CSSStyleDeclaration | undefined`
The styles to set on `shadow` element.

*Default*: `{}`

#### `svgClass: string | undefined`
The CSS class names added to the `svg` element.

#### `svgStyle: CSSStyleDeclaration | undefined`
The styles to set on `svg` element.

*Default*: `{}`

### `function createElement(params: ElementParams): HTMLElement`
Creates HTML element recursively from a data structure. Efficently uses document fragements and support style objects and class arrays -- skipping falsy values.

```js
const svg = createElement([
  "i",
  {
    "data-foo": "bar"
    style: {
      filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.32))",
    },
    class: [
      "fa",
      isCafe && "fa-coffee",
    ],
  },
  [
    // Optionally pass in children with same structure.
  ]
])
```

### `function createSvgElement(params: ElementParams): SVGElement`
Creates SVG element recursively from a data structure. Efficently uses document fragements and support style objects and class arrays -- skipping falsy values.

```js
const svg = createSvgElement([
  "svg",
  {
    width: "30px",
    height: "30px",
    style: {
      filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.32))",
    },
    class: [
      "extra-marker-icon",
    ],
  },
  ["circle", { cx: "10", cy: "10", r: "5", fill: "currentColor" }],
])
```

## Design

Original marker design file (Figma) is located at `./assets/markers.fig`.

### SVG

The markers are divided into 4 **families**:
- `pin` - taller map markers; like a pushpin; origin at bottom center
- `tack` - short map markers; like a thumbtack; origin at bottom center
- `chip` - shorter map markers; like a poker chip; origin at bottom center
- `point` - simple point markers; origin at center center

Each icon **family** has many **shapes**:
- `circle`
- `diamond`
- `pentagon`
- `square`
- `star`
- `teardrop` (only for `pin` family)
- `triangle`

Each **shape** has many optional **variants**:
- `border-1` is a relative 1px border
- `border-2` is a relative 2px border
- `panel` is a relative 2px border th a solid fill on the marker tail/pointer.

The variants are designed to completely cover the base shape so you can have fun with [opacity](https://developer.mozilla.org/en-US/docs/Web/CSS/opacity), [filter](https://developer.mozilla.org/en-US/docs/Web/CSS/filter), or [mix-blend-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode).

The SVG Icons are designed on a base 30px wide grid. The height varies per icon family.

### Shadows

The SVG shadows are inlined as data URIs to increase performance. It is possible to a custom shadow by passing in a `shadowUrl` options.

The following script was used to efficently encode the shadow SVGs into data URIs.

```sh
npx mini-svg-data-uri ./assets/shadow-ellipse.svg
```

### HTML

Below is the HTML structure of the Marker Icon.
```html
<div> <!-- leaflet-marker-plane -->
  <div> <!-- `root` -->
    <!-- `svg` -->
    <div> <!-- `contentWrapper` -->
      <!-- `content` or `contentHtml` -->
    </div>
  </div>
</div>

<div> <!-- leaflet-marker-plane -->
  <img /> <!-- `shadow` -->
</div>
```

## Migration guide

### v1 to v2
Version 2 is a complete rewrite to support svg only icons with no image or css file dependencies.
1. Upgrade to Leaflet v2.
2. Remove referenced Image and CSS files as v2 only has JS dependencies.
3. Update `Icon` options/properties per the mapping below:
  - `extraClasses` --> `rootClass`.
  - `icon` --> `content` or `contentHtml`.
    - Consider using the `createElement` util here.
  - `iconColor` --> `contentColor`.
  - `iconRotate` - removed; instead add the appropriate class or style to the element passed into `content`.
  - `innerHtml` - removed.
  - `markerColor` --> `color`; note that named colors have been removed. The legacy color mapping is below;
  ```js
  const colors: {
    "red": "#a23337",
    "orange": "#ef9227",
    "orange-dark": "#d73e29",
    "yellow": "#f5bb39",
    "cyan": "#32a9dd",
    "blue": "#1b75bb",
    "blue-dark": "#276273",
    "purple": "#440444",
    "violet": "#90278d",
    "pink": "#c057a0",
    "green-light": "#70b044",
    "green": "#009549",
    "green-dark": "#006838",
    "white": "#ffffff",
    "black": "#231f20",
  };
  ```
  - `number` --> `content`.
  - `prefix` - removed. Instead add it to your HTML string for `contentHtml` or on the element if using `content`
  - `shape` - removed; instead import the desired marker. `import { PinCircleBorder } from "leaflet-extra-markers";`
  - `svg` --> not supported as boolean; now this takes an SvgNode type (import desired marker and pass by reference)
  - `svgBorderColor` - removed; this never worked but its intended effect can now be accomplished by setting `accentColor`.
  - `svgOpacity` - removed; this never worked but its intended effect can now be accomplished by setting `svgStyle.opacity`.

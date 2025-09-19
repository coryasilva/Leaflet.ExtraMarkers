# Leaflet extra markers v2

// TODO: createSvgElement api + example
// TODO: createElement api + example
// TODO: Marker variants demo
// TODO: Shadows demo
// TODO: Sizes demo
// TODO: Content + Icons demo
// TODO: 1000 markers demo
// TODO: React demo
// TODO: Update screenshot

![ExtraMarkers screenshot](https://raw.github.com/coryasilva/Leaflet.ExtraMarkers/master/screenshot.png "Screenshot of ExtraMarkers")

A collection of fine SVG map markers that can easily be colored, resized, or overlayed with any DOM node including icon libraries, like Lucide, FontAwesome, or Material.

## Table of contents
- [**Getting started**](#getting-started)
- [**Demos**](#demos)
- [**API**](#api)
  - [**Icon**](#icon)
  - [**ExtraOptions**](#extraoptions)
  - [**createSvgElement**](#createSvgElement)
  - [**createElement**](#createElement)
- [**Design**](#design)
  - [**SVG**](#svg)
  - [**Shadows**](#shadows)
  - [**HTML**](#html)
- [**Migration guide**](#migration-guide)
- [**License**](#license)

## Getting started

```sh
npm i leaflet-extra-markers
```

```js
import { Marker } from "leaflet";
import { Icon, PinCirclePanel } from "leaflet-extra-markers";

const marker = new Marker([32.82,-117.43], {
  icon: new Icon({
    accentColor: "firebrick",
    color: "indianred",
    content: "42"
    contentColor: "white",
    size: 25,
    svg: PinCirclePanel,
  }),
});
```

## Demos
<!-- FIXME: **<a href="http://coryasilva.github.io/Leaflet.ExtraMarkers/" target="_blank">Demo</a>** -->
- [**Marker variants**]()
- [**Shadows**]()
- [**Sizes**]()
- [**Content + Icons**]()
- [**1000 markers**]()
- [**React**]()

## API

### Icon
The Icon class extends [Leaflet's Icon class](https://leafletjs.com/reference-2.0.0.html#icon).

```ts
class Icon extends IconBase<ExtraOptions> {
  constructor(options: ExtraOptions);
  createIcon(): HTMLElement;
  createShadow(): HTMLElement;
}
```

### ExtraOptions
These are the options you can pass into the `new Icon()` contructor. Note that this class extend [Leaflet's Icon class](https://leafletjs.com/reference-2.0.0.html#icon), while these options are supported for escape hatches, they should not be used in most circumstances.
```ts
  /**
   * The icon/marker (`Marker.icon` in leaflet) svg node.
   * @default PinTeardropBorder
   */
  svg?: SvgNode;
  /**
   * The accent color is applied to the icon variant and also
   * the dot on the empty state.
   * @default "#fff"
   */
  accentColor?: string;
  /**
   * The icon/marker color. Will be set on the `root.style.color property.
   * The SVG icon `fill` is set to `currentColor` to inherit this color.
   * 
   * Note: This setting could be overwritten by `rootStyle.color`.
   * @default "#000"
   */
  color?: string;
  /**
   * The content node to append to the `contentWrapper`.
   * This will be ignored if `contentHtml is set.
   * @default <div style="...transparent dot styles" />
   */
  content?: Content | ((opts: IconOptions) => Content);
  /**
   * Dangerously sets innerHTML of the contentWrapper.
   * If set this will override the `content` property.
   * WARNING: Possible XSS vector; sanitize user inputs if using this.
   */
  contentHtml?: string;
  /**
   * The content (wrapper) color. Will be set on the `contentWrapper.style.color property.
   * Note: This setting could be overwritten by `contentWrapperStyle.color`.
   * @default "#fff"
   */
  contentColor?: string;
  /**
   * The shadow variant.
   * @default "cast"
   */
  shadow?: "cast" | "drop" | "ellipse" | "none";
  /**
   * The size (width) of the SVG marker/icon; height will
   * be scaled proportionately.
   * @default 30
   */
  size?: number;
    /**
   * The CSS class names added to the `contentWrapper` element.
   */
  contentWrapperClass?: string;
  /**
   * The styles to set on `contentWrapper` element.
   * @default {}
   */
  contentWrapperStyle?: CSSStyleDeclaration
  /**
   * The CSS class names added to the `root` element.
   */
  rootClass?: string;
  /**
   * The styles to set on `root` element.
   * @default {}
   */
  rootStyle?: CSSStyleDeclaration;
  /**
   * The CSS class names added to the `shadow` element.
   */
  shadowClass?: string;
  /**
   * The styles to set on `shadow` element.
   * @default {}
   */
  shadowStyle?: CSSStyleDeclaration;
  /**
   * The CSS class names added to the `svg` element.
   */
  svgClass?;
  /**
   * The styles to set on `svg` element.
   * @default {}
   */
  svgStyle?;
```


### createSvgElement
// TODO:

### createElement
// TODO: 

## Design

Original marker/icon design file (Figma) is located at `./assets/markers.fig`.

### SVG

The Marker Icons are divided into 4 **families**:
- `pin` - taller map markers; like a pushpin; origin at bottom center
- `tack` - short map marker; like a thumbtack; origin at bottom center
- `chip` - shorter map marker; like a poker chip; origin at bottom center
- `point` - simple point marker; origin at center center

Each icon **family** has many **shapes**:
- `circle`
- `diamond`
- `pentagon`
- `square`
- `star`
- `teardrop` (only for `pin` set)
- `triangle`

Each **shape** has many optional **variants**:
- `border-1` is a relative 1px border 
- `border-2` is a relative 2px border 
- `panel` is a relative 2px border th a solid fill on the arrow part.

The variants are designed to completely cover the base shape so you can have fun with [opacity](https://developer.mozilla.org/en-US/docs/Web/CSS/opacity), [filter](https://developer.mozilla.org/en-US/docs/Web/CSS/filter), or [mix-blend-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode).

The SVG Icons are designed on a base 30px wide grid. The height varies per icon **family**.

### Shadows

The SVG shadows are inlined as data uris to increase performance. It is possible to a custom shadow by passing in a `shadowUrl` options.

The following script was used to efficently encode the svgs uris.

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

### V1 to V2
Version 2 is a complete rewrite to support svg only icons with no image or css file dependencies.
- V2 requires Leaflet v2.
- Remove referenced CSS files
- Remove referenced image files
- Icon options/properties mapping
  - `extraClasses` --> `rootClass`.
  - `icon` --> `content` or `contentHtml`.
  - `iconColor` --> `contentColor`.
  - `iconRotate` - removed; instead add the appropriate class or style to the element passed into `content`.
  - `innerHtml` - removed.
  - `markerColor` --> `color`; note that named colors have been moved to a color palette.  `import { legacy } from "leaflet-extra-markers/colors/index.js"`
  - `number` --> `content`.
  - `prefix` - removed.
  - `shape` - removed; instead import the desired marker. `import { PinCircleBorder } from "leaflet-extra-markers";`
  - `svg` --> not supported as boolean.
  - `svgBorderColor` - removed.
  - `svgOpacity` - removed.

## License

Leaflet.ExtraMarkers and marker svgs are licensed under the MIT License - http://opensource.org/licenses/mit-license.html.


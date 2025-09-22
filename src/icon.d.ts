import { Icon as IconBase, IconOptions, Class } from "leaflet";
import { Content, SvgNode } from "./types.js";

export interface ExtraOverrides {
	/**
	The CSS class names added to the `contentWrapper` element.
	*/
	contentWrapperClass?: string;
	/**
	The styles to set on `contentWrapper` element.
	@default {}
	*/
	contentWrapperStyle?: CSSStyleDeclaration
	/**
	The CSS class names added to the `root` element.
	*/
	rootClass?: string;
	/**
	The styles to set on `root` element.
	@default {}
	*/
	rootStyle?: CSSStyleDeclaration;
	/**
	The CSS class names added to the `shadow` element.
	*/
	shadowClass?: string;
	/**
	The styles to set on `shadow` element.
	@default {}
	*/
	shadowStyle?: CSSStyleDeclaration;
	/**
	The CSS class names added to the `svg` element.
	*/
	svgClass?: string;
	/**
	The styles to set on `svg` element.
	@default {}
	*/
	svgStyle?: CSSStyleDeclaration;
}

export interface ExtraOptions extends ExtraOverrides, IconOptions {
	/**
	The marker (`Marker.icon` in leaflet) svg node.

	The markers are divided into 4 **families**:
	- `pin` - taller map markers; like a pushpin; origin at bottom center
	- `tack` - short map markers; like a thumbtack; origin at bottom center
	- `chip` - shorter map markers; like a poker chip; origin at bottom center
	- `point` - simple point markers; origin at center center

	Each marker **family** has many **shapes**:
	- `circle`
	- `diamond`
	- `pentagon`
	- `square`
	- `star`
	- `teardrop` (only for `pin` family)
	- `triangle`

	Each **shape** has many **variants**:
	- `border-1` is a relative 1px border
	- `border-2` is a relative 2px border
	- `panel` is a relative 2px border with a solid fill on the marker tail/pointer.
	*omit variant for just a plain shape.

	@default PinTeardropBorder
	*/
	svg?: SvgNode;
	/**
	The accent color is applied to the marker variant and also
	the dot on the empty state.
	@default "#fff"
	*/
	accentColor?: string;
	/**
	The marker color. Will be set on the `root.style.color property.
	The SVG path for the base marker shape has a `fill` set to
	`currentColor` to inherit this color.

	Note: This setting could be overwritten by `rootStyle.color`.

	@example
	// Diverging spectral colors with hue rotation
	"color-mix(in oklch shorter hue, #d53e4f 70%, #3288bd)"

	// Diverging spectral colors with more hue rotation
	"color-mix(in oklch longer hue, #d53e4f 70%, #3288bd)"

	// Single hue spectral colors
	"color-mix(in oklch shorter hue, red 70%, white)"

	// Single hue spectral colors with transparency
	"color-mix(in oklch shorter hue, #d53e4f 70%, transparent)"

	@default "#000"
	*/
	color?: string;
	/**
	The content node to append to the `contentWrapper`.
	This will be ignored if `contentHtml is set.
	@example
	42 // number
	"AB" // string
	"🚀" // have fun
	@example createSvgElement([
		"svg",
		{
			width: "30px",
			height: "30px",
		},
		["circle", { cx: "10", cy: "10", r: "5", fill: "currentColor" }],
	);
	@default createElement(["div", {
		style: {
			display: "block",
			height: "0.8em",
			width: "0.8em",
			backgroundColor: accentColor,
			borderRadius: "100%",
		},
	}]);
	*/
	content?: Content | ((opts: ExtraOptions) => Content);
	/**
	Dangerously sets innerHTML of the contentWrapper.
	If set this will override the `content` property.
	WARNING: Possible XSS vector; sanitize user inputs if using this.
	@example <i class="fa fa-coffee" />
	*/
	contentHtml?: string;
	/**
	The content (wrapper) color. Will be set on the `contentWrapper.style.color property.
	Note: This setting could be overwritten by `contentWrapperStyle.color`.
	@default "#fff"
	*/
	contentColor?: string;
	/**
	The shadow variant.
	@default "cast"
	*/
	shadow?: "cast" | "drop" | "ellipse" | "none";
	/**
	The size (width) of the SVG marker; height will
	be scaled proportionately.

	Note: The markers are designed on a base 30px wide grid.
	@default 30
	*/
	size?: number;
}

/**
@example
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
*/
export declare class Icon extends IconBase<ExtraOptions> {
	constructor(options: ExtraOptions);
	createIcon(): HTMLElement;
	/** TODO: submit PR for undefined return */
	createShadow(): HTMLElement;
}

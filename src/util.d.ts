import {
  Element,
  ElementAttributes,
  ElementChildren,
  ElementParams,
} from "./types.js";

/**
@example
const element = document.createElement("div");

// Set any attribute as key value pairs
setAttributes(element, {
	"data-name": "menu",
	"class": "w-full bg-red",
	"style": "margin-right: 0px;"
});

// Or set style using object or classes from array
setAttributes(element, {
	style: {
		marginRight: 0,
	},
	class: [
		isDisabled && "bg-gray",
		"w-full",
	],
});
*/
export function setAttributes(
  element: Element,
  attributes?: ElementAttributes,
): void;

/**
@example
const element = document.createElement("div");
const child = document.createElement("p");
appendChildren(element, [p]);
*/
export function appendChildren(
  element: Element,
  children: ElementChildren,
  creator: (params: ElementParams) => HTMLElement | SVGElement,
): void;

/**
Creates SVG element recursively from a data structure.
Efficently uses document fragements and support style
objects and class arrays -- skipping falsy values.

@example
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
]);
*/
export function createSvgElement(params: ElementParams): SVGElement;

/**
Creates HTML element recursively from a data structure.
Efficently uses document fragements and support style
objects and class arrays -- skipping falsy values.

@example
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
	[// optionally pass in children]
]);
*/
export function createElement(params: ElementParams): HTMLElement;

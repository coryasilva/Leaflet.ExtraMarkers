import {
  Element,
  ElementAttributes,
  ElementChildren,
  ElementParams,
} from "./types.js";

export function setAttributes(element: Element, attributes: ElementAttributes): void;
export function appendChildren(
    element: Element,
    children: ElementChildren,
    creator: (params: ElementParams) => HTMLElement | SVGElement
): void;
export function createSvgElement(params: ElementParams): SVGElement
export function createElement(params: ElementParams): HTMLElement
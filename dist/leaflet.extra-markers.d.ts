import * as L from "leaflet";

type HEX = `#${string}`;

declare module "leaflet" {
    export namespace ExtraMarkers {
        export interface IconOptions extends L.BaseIconOptions {
            /** Additional classes in the created <i> tag. */
            extraClasses?: string;
            /** Name of the icon with prefix. */
            icon?: string;
            /** Color of the icon. Default value 'white'. */
            iconColor?: string;
            /** Rotates the icon with css transformations. Default value 0. */
            iconRotate?: number;
            /** Custom HTML code. */
            innerHTML?: string;
            /** Color of the marker (css class). Default value 'blue'. */
            markerColor?: "red" | "orange-dark" | "orange" | "yellow" | "blue" | "blue-dark" | "cyan" | "purple"
            | "violet" | "pink" | "green-dark" | "green" | "green-light" | "black" | "white" | HEX;
            /** Instead of an icon, define a plain text. */
            number?: string;
            /** The icon library's base class. Default value 'glyphicon'. */
            prefix?: string;
            /** Shape of the marker (css class). Default value 'circle'. */
            shape?: "circle" | "square" | "star" | "penta";
            /** Use SVG version of marker. Default value false. */
            svg?: boolean;
            /** DEPRECATED No Effect. Default value '#fff'. */
            svgBorderColor?: string;
            /** DEPRECATED: No effect. Default value 1. */
            svgOpacity?: number;
        }

        export class Icon extends L.Icon {
            constructor(options: IconOptions)
        }

        export function icon(options: IconOptions): Icon;
    }
}


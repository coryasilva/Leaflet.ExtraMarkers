import * as L from "leaflet";

declare module "leaflet" {
    export namespace ExtraMarkers {
        export interface IconOptions extends L.BaseIconOptions {
            /** Additional classes in the created <i> tag. */
            extraClasses?: string;
            /** Name of the icon with prefix. */
            icon?: string;
            /** Color of the icon. Default value 'white'. */
            iconColor?: string;
            /** Custom HTML code. */
            innerHTML?: string;
            /** Color of the marker (css class). Default value 'blue'. */
            markerColor?: "red" | "orange-dark" | "orange" | "yellow" | "blue" | "blue-dark" | "cyan" | "purple"
            | "violet" | "pink" | "green-dark" | "green" | "green-light" | "black" | "white";
            /** Instead of an icon, define a plain text. */
            number?: string;
            /** The icon library's base class. Default value 'glyphicon'. */
            prefix?: string;
            /** Shape of the marker (css class). Default value 'circle'. */
            shape?: "circle" | "square" | "star" | "penta";
        }

        export class Icon extends L.Icon {
            constructor(options: IconOptions)
        }

        export function icon(options: IconOptions): Icon;
    }
}


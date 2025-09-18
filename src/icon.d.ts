import { Icon as IconBase, IconOptions, Class } from "leaflet";
import { Content, SvgNode } from "./types.js";

export interface ExtraOverrides {
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
}

export interface ExtraOptions extends ExtraOverrides, IconOptions {
  /**
   * The icon/marker (`Marker.icon` in leaflet) svg node.
   * 
   * The icons are divided into 4 **families**:
   * - `pin` - taller map markers; like a pushpin; origin at bottom center
   * - `tack` - short map marker; like a thumbtack; origin at bottom center
   * - `chip` - shorter map marker; like a poker chip; origin at bottom center
   * - `point` - simple point marker; origin at center center
   * 
   * Each icon **family** has many **shapes**:
   * - `circle`
   * - `diamond`
   * - `pentagon`
   * - `square`
   * - `star`
   * - `teardrop` (only for `pin` set)
   * - `triangle`
   * 
   * Each **shape** has many **variants**:
   * - `border-1` is a relative 1px border 
   * - `border-2` is a relative 1px border 
   * - `panel` is a relative 2px border with a solid fill on the arrow part.
   * *omit variant for just a plain shape.
   * 
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
  shadow?: "cast" | "ellipse" | "none";
  /**
   * The size (width) of the SVG marker/icon; height will
   * be scaled proportionately.
   * @default 30
   */
  size?: number;
}

/**
@example ```
import { Marker } from "leaflet";
import { Icon, PinCirclePanel } from "leaflet-extra-markers";

const marker = new Marker([32.82,-117.43], {
  icon: new Icon({
    accentColor: firebrick,
    color: indianred,
    content: "42"
    contentColor: white,
    size: 25,
    svg: PinCirclePanel,
  }),
});
```
 */
export declare class Icon extends IconBase<ExtraOptions> {
  constructor(options: ExtraOptions);
  createIcon(): HTMLElement;
  /** TODO: submit PR for undefined return */
  createShadow(): HTMLElement;
}

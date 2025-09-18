import { Icon as IconBase, Browser, Point } from "leaflet"
import { PinTeardropBorder } from "./markers/PinTeardropBorder.js"
import { createSvgElement, createElement } from "./util.js"

// TODO: Draw vector shadow
// TODO: Drop Shadows
// TODO: Consider adding preserveAspectRatio: "xMidYMax meet"
// TODO: React example
// TODO: Colors (finish)

const empty = ["div", {
  style: {
    svg: PinTeardropBorder,
    display: "block",
    height: "0.8em",
    width: "0.8em",
    opacity: "0.75",
    backgroundColor: "#000",
    borderRadius: "100%",
    mixBlendMode: "soft-light",
  }
}]

export class Icon extends IconBase {

  static {
    this.setDefaultOptions({
      accentColor: "#fff",
      color: "#000",
      contentColor: "#fff",
      contentStyle: {},
      rootStyle: {},
      shadow: "drop",
      shadowStyle: {},
      size: 30,
      svgStyle: {},
    });
  }

  constructor(options) {
    super(options)

    if (options.iconUrl || options.iconRetinaUrl) {
      console.warn("leaflet-extra-markers", "`iconUrl` and `iconRetinaUrl` are not supported.")
    }
  }

  initialize(options) {
    for (const [key, value] of Object.entries(options)) {
      if (typeof value !== "undefined") {
        this.options[key] = value;
      }
    }

    const opts = this.options
    const iconSize = this.#calcIconSize()
    this.iconSize = iconSize
    this.iconAnchor = Point.validate(opts.iconAnchor) ? new Point(opts.iconAnchor) : new Point([iconSize.x / 2, iconSize.y])
    this.shadowSize = Point.validate(opts.shadowSize) ? new Point(opts.iconAnchor) : new Point([iconSize.x, iconSize.y / 3])
    this.shadowAnchor = Point.validate(opts.shadowAnchor) ? new Point(opts.shadowAnchor) : new Point([iconSize.x / 2, iconSize.y])
    this.popupAnchor = Point.validate(opts.popupAnchor) ? new Point(opts.popupAnchor) : new Point([0, iconSize.y - iconSize.x + (iconSize.x / 2)])
    this.tooltipAnchor = Point.validate(opts.tooltipAnchor) ? new Point(tooltipAnchor) : new Point([0, iconSize.y - iconSize.x + (iconSize.x / 2)])
  }

  #calcIconSize() {
    const opts = this.options;
    const size = Math.max(Math.abs(opts.size), 1)
    const origIconWidth = opts.svg?.[1]?.width ?? size
    const origIconHeight = opts.svg?.[1]?.height ?? size
    const iconWidth = size
    const iconHeight = size * origIconHeight / origIconWidth

    const iconSize = opts.iconSize === "number" ? [opts.iconSize, opts.iconSize] : opts.iconSize

    if (Point.validate(iconSize)) {
      return new Point(iconSize)
    }

    return new Point([iconWidth, iconHeight])
  }

  createIcon() {
    const opts = this.options;

    const contentWrapper = createElement(["div", {
      "data-content": "",
      class: [
        "extra-marker-content",
        opts.contentClass,
      ],
      style: {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "35px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontSize: "14px",
        fontWeight: "700",
        lineHeight: "1",
        color: opts.contentColor,
        ...(opts.contentStyle ?? {})
      }
    }])

    if (opts.contentHtml) {
      contentWrapper.innerHTML = opts.contentHtml
    } else if (typeof opts.content === "function") {
      contentWrapper.append(opts.content(opts));
    } else {
      contentWrapper.append(opts.content ?? createElement(empty));
    }

    const [svgTag, svgAttrs, svgChildren] = opts.svg
    const svg = createSvgElement([
      svgTag,
      {
        ...svgAttrs,
        style: {
          filter: "drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.35))",
          ...(opts.svgStyle ?? {}),
        },
        class: [
          "extra-marker-icon",
          opts.svgClass,
        ],
      },
      svgChildren,
    ])

    const root = createElement([
      "div",
      {
        "data-extra-marker": "icon",
        "data-root": "",
        style: {
          color: opts.color,
          position: "absolute",
          width: `${this.iconSize.x}px`,
          height: `${this.iconSize.y}px`,
          marginLeft: `${-this.iconAnchor.x}px`,
          marginTop: `${-this.iconAnchor.y}px`,
          ...(opts.rootStyle ?? {})
        },
        class: [
          "extra-marker",
          opts.className,
          opts.rootClass,
        ],
      },
      [
        svg,
        contentWrapper,
      ]
    ]);

    return root;
  }

  createShadow() {
    const opts = this.options;

    if (opts.shadow === "none") return;

    const positionStyles = {
      width: `${this.shadowSize.x}px`,
      height: `${this.shadowSize.y}px`,
      marginLeft: `${-this.shadowAnchor.x}px`,
      marginTop: `${-this.shadowAnchor.y}px`,
    }

    if (opts.shadowUrl || opts.shadowRetinaUrl) {
      const url = Browser.retina && opts.shadowRetinaUrl || opts.shadowUrl
      const hasCrossOrigin = opts.crossOrigin || opts.crossOrigin === ""

      return createElement(["img", {
        src: url,
        crossOrigin: hasCrossOrigin && opts.crossOrigin === true ? "" : String(opts.crossOrigin),
        style: { ...positionStyles },
      }])
    }

    const shadowEllipse = ""; // TODO:
    const shadowCast = ""; // TODO:
    const svg = opts.shadow === "ellipse" ? shadowEllipse : shadowCast;
    
    return createElement(["img", {
      src: `data:image/svg+xml,${svg}`,
      style: { ...positionStyles },
      "data-extra-marker": "shadow",
      class: [
        "extra-marker-shadow",
        opts.className,
        opts.shadowClass,
      ],
      style: {
        position: "absolute",
        ...positionStyles,
        ...(opts.shadowStyle ?? {}),
      },
    }])
  }
}

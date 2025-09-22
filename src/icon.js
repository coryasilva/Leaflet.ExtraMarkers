import { Icon as IconBase, Browser, Point } from "leaflet"
import { PinTeardropBorder } from "./markers/PinTeardropBorder.js"
import { createSvgElement, createElement } from "./util.js"

const shadowCast = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='39' height='36' fill='currentColor' viewBox='0 0 39 36'%3e %3cg filter='url(%23a)'%3e %3cpath fill='url(%23b)' d='M25 4.34c7.3.76 11.47 6.93 9.54 12.27a9.99 9.99 0 0 1-3.9 4.77L15.92 31.8a1.2 1.2 0 0 1-.93.19c-.34-.07-.6-.27-.68-.5L12 16.97c-.39-2 .12-4.76 1.08-6.77C15.64 5.96 18.16 3.63 25 4.34Z'/%3e %3c/g%3e %3cdefs%3e %3clinearGradient id='b' x1='27' x2='14.75' y1='6' y2='32.33' gradientUnits='userSpaceOnUse'%3e %3cstop stop-opacity='0'/%3e %3cstop offset='1' stop-opacity='.5'/%3e %3c/linearGradient%3e %3cfilter id='a' width='31.14' height='35.78' x='7.87' y='.22' color-interpolation-filters='sRGB' filterUnits='userSpaceOnUse'%3e %3cfeFlood flood-opacity='0' result='BackgroundImageFix'/%3e %3cfeBlend in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3e %3cfeGaussianBlur result='effect1_foregroundBlur_53_1294' stdDeviation='2'/%3e %3c/filter%3e %3c/defs%3e %3c/svg%3e";
const shadowEllipse = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='6' fill='currentColor' viewBox='0 0 30 6'%3e %3cellipse cx='15' cy='3' fill='url(%23a)' rx='10' ry='3'/%3e %3cdefs%3e %3cradialGradient id='a' cx='0' cy='0' r='1' gradientTransform='matrix(0 3 -10 0 15 3)' gradientUnits='userSpaceOnUse'%3e %3cstop offset='.05' stop-opacity='.32'/%3e %3cstop offset='1' stop-opacity='0'/%3e %3c/radialGradient%3e %3c/defs%3e %3c/svg%3e";

export class Icon extends IconBase {

	static {
		this.setDefaultOptions({
			svg: PinTeardropBorder,
			accentColor: "#fff",
			color: "#000",
			contentColor: "#fff",
			contentStyle: {},
			rootStyle: {},
			shadow: "cast",
			shadowStyle: {},
			size: 30,
			svgStyle: {},
		});
	}

	constructor(options = {}) {
		super(options);

		if (options.iconUrl || options.iconRetinaUrl) {
			console.warn("leaflet-extra-markers", "`iconUrl` and `iconRetinaUrl` are not supported.");
		}
	}

	initialize(options) {
		for (const [key, value] of Object.entries(options)) {
			if (typeof value !== "undefined") {
				this.options[key] = value;
			}
		}

		const opts = this.options;
		opts.iconSize = this.calcIconSize();
		const { x, y } = opts.iconSize;
		opts.iconAnchor = Point.validate(options.iconAnchor) ? new Point(options.iconAnchor) : new Point([x / 2, y]);

		if (opts.shadow === "ellipse") {
			// 30w 6h
			opts.shadowSize = Point.validate(options.shadowSize) ? new Point(options.shadowSize) : new Point([x, x * 6 / 30]);
			opts.shadowAnchor = Point.validate(options.shadowAnchor) ? new Point(options.shadowAnchor) : new Point([x / 2, x * 6 / 30 / 2]);
		} else {
			// 39w 36h
			opts.shadowSize = Point.validate(options.shadowSize) ? new Point(options.shadowSize) : new Point([x * 39 / 30, x * 36 / 30]);
			opts.shadowAnchor = Point.validate(options.shadowAnchor) ? new Point(options.shadowAnchor) : new Point([x / 2, x / 30 * 32]);
		}

		opts.popupAnchor = Point.validate(options.popupAnchor) ? new Point(options.popupAnchor) : new Point([0, -y + x / 2]);
		opts.tooltipAnchor = Point.validate(options.tooltipAnchor) ? new Point(options.tooltipAnchor) : new Point([0, -y + x / 2]);
	}

	calcIconSize() {
		const opts = this.options;
		const size = Math.max(Math.abs(opts.size), 1);
		const origIconWidth = opts.svg?.[1]?.width ?? size;
		const origIconHeight = opts.svg?.[1]?.height ?? size;
		const iconWidth = size;
		const iconHeight = size * origIconHeight / origIconWidth;
		const iconSize = opts.iconSize === "number" ? [opts.iconSize, opts.iconSize] : opts.iconSize;

		if (Point.validate(iconSize)) {
			return new Point(iconSize);
		}

		return new Point([iconWidth, iconHeight]);
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
				height: `${opts.iconSize.x}px`,
				display: "inline-flex",
				alignItems: "center",
				justifyContent: "center",
				textAlign: "center",
				fontSize: `${opts.iconSize.x / 30}em`,
				fontWeight: "700",
				lineHeight: "1",
				color: opts.contentColor,
				...(opts.contentStyle ?? {}),
			},
		}]);

		if (opts.contentHtml) {
			contentWrapper.innerHTML = opts.contentHtml;
		} else if (typeof opts.content === "function") {
			contentWrapper.append(opts.content(opts));
		} else {
			contentWrapper.append(opts.content ?? createElement(["div", {
				style: {
					display: "block",
					height: "0.8em",
					width: "0.8em",
					backgroundColor: opts.accentColor,
					borderRadius: "100%",
				},
			}]));
		}

		const [svgTag, svgAttrs, svgChildren] = opts.svg;
		const svg = createSvgElement([
			svgTag,
			{
				...svgAttrs,
				width: `${opts.iconSize.x}px`,
				height: `${opts.iconSize.y}px`,
				style: {
					filter: opts.shadow === "drop" ? "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.32))" : "",
					...(opts.svgStyle ?? {}),
				},
				class: [
					"extra-marker-icon",
					opts.svgClass,
				],
			},
			svgChildren,
		]);

		if (svgChildren.length > 1) {
			svg.lastChild.style.fill = opts.accentColor;
		}

		const root = createElement([
			"div",
			{
				"data-extra-marker": "icon",
				"data-root": "",
				style: {
					color: opts.color,
					position: "absolute",
					width: `${opts.iconSize.x}px`,
					height: `${opts.iconSize.y}px`,
					marginLeft: `${-opts.iconAnchor.x}px`,
					marginTop: `${-opts.iconAnchor.y}px`,
					fontSize: "12px",
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
			],
		]);

		return root;
	}

	createShadow() {
		const opts = this.options;

		if (opts.shadow === "none" | opts.shadow === "drop") return;

		const positionStyles = {
			width: `${opts.shadowSize.x}px`,
			height: `${opts.shadowSize.y}px`,
			marginLeft: `${-opts.shadowAnchor.x}px`,
			marginTop: `${-opts.shadowAnchor.y}px`,
		};

		if (opts.shadowUrl || opts.shadowRetinaUrl) {
			const url = Browser.retina && opts.shadowRetinaUrl || opts.shadowUrl;
			const hasCrossOrigin = opts.crossOrigin || opts.crossOrigin === "";

			return createElement(["img", {
				src: url,
				crossOrigin: hasCrossOrigin && opts.crossOrigin === true ? "" : String(opts.crossOrigin),
				style: { ...positionStyles },
			}]);
		}

		const src = opts.shadow === "ellipse" ? shadowEllipse : shadowCast;

		return createElement(["img", {
			src,
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
		}]);
	}
}

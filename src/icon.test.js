import "global-jsdom/register";
import test from "ava";
import {
  ChipCircle,
  createElement,
  Icon,
  PinDiamond,
  PinStar,
  PointSquare,
  PointTriangle,
  TackPentagon,
} from "./index.js";

test("createIcon default (PinTeardropBorder)", (t) => {
  const icon = new Icon().createIcon();
  const svg = icon.querySelector("svg");
  const contentWrapper = icon.querySelector(".extra-marker-content");

  t.is(icon.className, "extra-marker", "root has base class");
  t.is(svg.getAttribute("class"), "extra-marker-icon", "svg has base class");
  t.is(
    contentWrapper.className,
    "extra-marker-content",
    "content container has base class",
  );
});

test("createIcon origin", (t) => {
  const icon = new Icon({ svg: PointTriangle, origin: "center" }).createIcon();;
  t.is(icon.style.width, "30px", "width");
  t.is(icon.style.height, "30px", "height");
  t.is(icon.style["margin-top"], "-15px", "margin top");
  t.is(icon.style["margin-left"], "-15px", "margin left");
});

test("createIcon sizes", (t) => {
  const iconPin = new Icon({ svg: PinStar }).createIcon();
  t.is(iconPin.style.width, "30px", "width");
  t.is(iconPin.style.height, "41px", "height");
  t.is(iconPin.style["margin-top"], "-41px", "margin top");
  t.is(iconPin.style["margin-left"], "-15px", "margin left");

  const iconTack = new Icon({ svg: TackPentagon }).createIcon();
  t.is(iconTack.style.width, "30px", "width");
  t.is(iconTack.style.height, "35px", "height");
  t.is(iconTack.style["margin-top"], "-35px", "margin top");
  t.is(iconTack.style["margin-left"], "-15px", "margin left");

  const iconChip = new Icon({ svg: ChipCircle }).createIcon();
  t.is(iconChip.style.width, "30px", "width");
  t.is(iconChip.style.height, "33px", "height");
  t.is(iconChip.style["margin-top"], "-33px", "margin top");
  t.is(iconChip.style["margin-left"], "-15px", "margin left");

  const iconPoint = new Icon({ svg: PointSquare }).createIcon();
  t.is(iconPoint.style.width, "30px", "width");
  t.is(iconPoint.style.height, "30px", "height");
  t.is(iconPoint.style["margin-top"], "-30px", "margin top");
  t.is(iconPoint.style["margin-left"], "-15px", "margin left");
});

test("createIcon scale", (t) => {
  const icon = new Icon({ svg: PinDiamond, scale: 2 }).createIcon();
  const contentWrapper = icon.querySelector(".extra-marker-content");

  // @ts-expect-error
  t.is(contentWrapper.style.fontSize, "2em", "content font size");
  t.is(icon.style.width, "60px", "width");
  t.is(icon.style.height, "82px", "height");
  t.is(icon.style["margin-top"], "-82px", "margin top");
  t.is(icon.style["margin-left"], "-30px", "margin left");
});

test("createIcon content", (t) => {
  const iconEmpty = new Icon().createIcon();
  t.is(iconEmpty.querySelector(".extra-marker-content").firstChild.nodeName, "DIV", "has empty dot")
  t.is(iconEmpty.querySelector(".extra-marker-content").childElementCount, 1, "has only empty dot")

  const iconNumber = new Icon({ content: 1 }).createIcon();
  t.is(iconNumber.querySelector(".extra-marker-content").textContent, "1", "has number content")

  const iconString = new Icon({ content: "AA" }).createIcon();
  t.is(iconString.querySelector(".extra-marker-content").textContent, "AA", "has string content")

  const iconElement = new Icon({ content: createElement(["i"]) }).createIcon();
  t.is(iconElement.querySelector(".extra-marker-content").firstChild.nodeName, "I", "has element content")
  t.is(iconElement.querySelector(".extra-marker-content").childElementCount, 1, "has only element content")

  const iconHtml = new Icon({ content: "ignore", contentHtml: "<i></i>"}).createIcon();
  t.is(iconHtml.querySelector(".extra-marker-content").firstChild.nodeName, "I", "has html content")
  t.is(iconHtml.querySelector(".extra-marker-content").childElementCount, 1, "has only html content")

  const icon = new Icon({
    content: (opts) => createElement(["pre", {}, [JSON.stringify(opts)]]),
  })
  const iconFn = icon.createIcon();
  t.is(iconFn.querySelector(".extra-marker-content").firstChild.nodeName, "PRE", "has html content")
  t.is(iconFn.querySelector(".extra-marker-content").childElementCount, 1, "has only html content")
  t.is(iconFn.querySelector(".extra-marker-content").textContent, JSON.stringify(icon.options), "has fn arg content")
});

test("createIcon colors", (t) => {
  const icon = new Icon({
    color: "red",
    contentColor: "blue",
    accentColor: "green",
  }).createIcon();
  const svg = icon.querySelector("svg");
  const path = icon.querySelector("path:last-child");
  const contentWrapper = icon.querySelector(".extra-marker-content");

  t.is(icon.style.color, "red", "root style.color");
  t.is(svg.getAttribute("fill"), "currentColor", "svg style.color");
  t.is(path.getAttribute("fill"), "green", "svg style.color");
  //@ts-expect-error
  t.is(contentWrapper.style.color, "blue", "content wrapper style.color");
});

test("createIcon svgImageFill", (t) => {
  const icon = new Icon({
    svgFillImageSrc: "https://domain.local/image.png",
  }).createIcon();
  const svg = icon.querySelector("svg");
  const pattern = svg.querySelector("pattern");
  const path = svg.querySelector("path");
  const contentWrapper = icon.querySelector(".extra-marker-content");

  t.is(path.getAttribute("fill"), `url(#${pattern.getAttribute("id")})`, "fill references pattern id")
  t.is(contentWrapper.childElementCount, 0, "no empty dot when svgImageFill")
});

test("createIcon overrides", (t) => {
  const icon = new Icon({
    color: "red",
    contentColor: "blue",
    accentColor: "green",
    contentWrapperClass: "mock-content-wrapper-class",
    contentWrapperStyle: { color: "pink" },
    rootClass: "mock-root-class",
    rootStyle: { color: "magenta" },
    svgClass: "mock-svg-class",
    svgStyle: { fill: "orchid" },
  }).createIcon();
  const svg = icon.querySelector("svg");
  const contentWrapper = icon.querySelector(".extra-marker-content");

  t.is(icon.className, "extra-marker mock-root-class", "root class");
  t.is(icon.style.color, "magenta", "root style.color");
  t.is(svg.getAttribute("class"), "extra-marker-icon mock-svg-class", "svg class");
  t.is(svg.style.fill, "orchid", "svg style.color");
  t.is(contentWrapper.className, "extra-marker-content mock-content-wrapper-class", "content wrapper class");
  //@ts-expect-error
  t.is(contentWrapper.style.color, "pink", "content wrapper style.color");
});

test("createShadow default (cast)", (t) => {
  const shadow = new Icon().createShadow();
  const src = shadow.getAttribute("src");

  t.is(shadow.className, "extra-marker-shadow", "has base class");
  t.is(shadow.style.width, "39px", "width");
  t.is(shadow.style.height, "36px", "height");
  t.is(shadow.style["margin-top"], "-32px", "margin top");
  t.is(shadow.style["margin-left"], "-15px", "margin left");
  t.true(src.startsWith("data:image/svg+xml,"), "has svg data uri");
});

test("createShadow ellipse", (t) => {
  const shadow = new Icon({ shadow: "ellipse" }).createShadow();
  const src = shadow.getAttribute("src");

  t.is(shadow.style.width, "30px", "width");
  t.is(shadow.style.height, "6px", "height");
  t.is(shadow.style["margin-top"], "-3px", "margin top");
  t.is(shadow.style["margin-left"], "-15px", "margin left");
  t.true(src.startsWith("data:image/svg+xml,"), "has svg data uri");
});

test("createShadow none", (t) => {
  const shadow = new Icon({ shadow: "none" }).createShadow();

  t.assert(typeof shadow === "undefined");
});

test("createShadow drop", (t) => {
  const instance = new Icon({ shadow: "drop" });
  const shadow = instance.createShadow();
  const icon = instance.createIcon();
  const svg = icon.querySelector("svg");

  t.assert(typeof shadow === "undefined", "drop shadow on svg marker instead");
  t.assert(svg.style.filter.startsWith("drop-shadow("), "drop shadow filter");
});

test("createShadow custom", (t) => {
  const shadow = new Icon({
    shadowUrl: "https://domain.local/shadow.png",
    shadowAnchor: [4, 2],
    shadowSize: [8, 4],
  }).createShadow();
  const src = shadow.getAttribute("src");

  t.is(shadow.style.width, "8px", "width");
  t.is(shadow.style.height, "4px", "height");
  t.is(shadow.style["margin-top"], "-2px", "margin top");
  t.is(shadow.style["margin-left"], "-4px", "margin left");
  t.true(src === "https://domain.local/shadow.png", "custom shadowUrl");
});

test("createShadow class + style", (t) => {
  const shadow = new Icon({
    shadowClass: "mock-shadow-class",
    shadowStyle: {
      marginLeft: "0px",
    },
  }).createShadow();

  t.is(shadow.style["margin-left"], "0px", "override/set style");
  t.is(
    shadow.className,
    "extra-marker-shadow mock-shadow-class",
    "add custom class",
  );
});

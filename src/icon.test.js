import "global-jsdom/register";
import test from "ava";
import {
  ChipCircle,
  Icon,
  PinStar,
  PointSquare,
  TackPentagon,
} from "./index.js";

test("createIcon default (PinTeardropBorder)", (t) => {
  const icon = new Icon();
  const iconEl = icon.createIcon();
  const svg = iconEl.querySelector("svg");
  const contentContainer = iconEl.querySelector(".extra-marker-content");

  t.is(iconEl.className, "extra-marker", "root has base class");
  t.is(svg.getAttribute("class"), "extra-marker-icon", "svg has base class");
  t.is(
    contentContainer.className,
    "extra-marker-content",
    "content container has base class",
  );
});

test("createIcon (sizes)", (t) => {
  const iconPin = new Icon({ svg: PinStar });
  const iconPinEl = iconPin.createIcon();
  t.is(iconPinEl.style.width, "30px", "width");
  t.is(iconPinEl.style.height, "41px", "height");
  t.is(iconPinEl.style["margin-top"], "-41px", "margin top");
  t.is(iconPinEl.style["margin-left"], "-15px", "margin left");

  const iconTack = new Icon({ svg: TackPentagon });
  const iconTackEl = iconTack.createIcon();
  t.is(iconTackEl.style.width, "30px", "width");
  t.is(iconTackEl.style.height, "35px", "height");
  t.is(iconTackEl.style["margin-top"], "-35px", "margin top");
  t.is(iconTackEl.style["margin-left"], "-15px", "margin left");

  const iconChip = new Icon({ svg: ChipCircle });
  const iconChipEl = iconChip.createIcon();
  t.is(iconChipEl.style.width, "30px", "width");
  t.is(iconChipEl.style.height, "33px", "height");
  t.is(iconChipEl.style["margin-top"], "-33px", "margin top");
  t.is(iconChipEl.style["margin-left"], "-15px", "margin left");

  const iconPoint = new Icon({ svg: PointSquare });
  const iconPointEl = iconPoint.createIcon();
  t.is(iconPointEl.style.width, "30px", "width");
  t.is(iconPointEl.style.height, "30px", "height");
  t.is(iconPointEl.style["margin-top"], "-30px", "margin top");
  t.is(iconPointEl.style["margin-left"], "-15px", "margin left");
});

// test("createIcon content", (t) => {
//   const icon = new Icon();
//   const iconEl = icon.createIcon();
// contentHtml
// });

// test("createIcon colors", (t) => {
//   const icon = new Icon();
//   const iconEl = icon.createIcon();
// });

// test("createIcon overrides", (t) => {
//   const icon = new Icon();
//   const iconEl = icon.createIcon();
// });

test("createShadow default (cast)", (t) => {
  const icon = new Icon();
  const shadow = icon.createShadow();
  const src = shadow.getAttribute("src");

  t.is(shadow.className, "extra-marker-shadow", "has base class");
  t.is(shadow.style.width, "39px", "width");
  t.is(shadow.style.height, "36px", "height");
  t.is(shadow.style["margin-top"], "-32px", "margin top");
  t.is(shadow.style["margin-left"], "-15px", "margin left");
  t.true(src.startsWith("data:image/svg+xml,"), "has svg data uri");
});

test("createShadow ellipse", (t) => {
  const icon = new Icon({ shadow: "ellipse" });
  const shadow = icon.createShadow();
  const src = shadow.getAttribute("src");

  t.is(shadow.style.width, "30px", "width");
  t.is(shadow.style.height, "6px", "height");
  t.is(shadow.style["margin-top"], "-3px", "margin top");
  t.is(shadow.style["margin-left"], "-15px", "margin left");
  t.true(src.startsWith("data:image/svg+xml,"), "has svg data uri");
});

test("createShadow none", (t) => {
  const icon = new Icon({ shadow: "none" });
  const shadow = icon.createShadow();
  t.assert(typeof shadow === "undefined");
});

test("createShadow drop", (t) => {
  const icon = new Icon({ shadow: "drop" });
  const shadow = icon.createShadow();
  const iconEl = icon.createIcon();
  const svg = iconEl.querySelector("svg");
  t.assert(typeof shadow === "undefined", "drop shadow on svg marker instead");
  t.assert(svg.style.filter.startsWith("drop-shadow("), "drop shadow filter");
});

test("createShadow custom", (t) => {
  const icon = new Icon({
    shadowUrl: "https://domain.local/shadow.png",
    shadowAnchor: [4, 2],
    shadowSize: [8, 4],
  });

  const shadow = icon.createShadow();
  const src = shadow.getAttribute("src");

  t.is(shadow.style.width, "8px", "width");
  t.is(shadow.style.height, "4px", "height");
  t.is(shadow.style["margin-top"], "-2px", "margin top");
  t.is(shadow.style["margin-left"], "-4px", "margin left");
  t.true(src === "https://domain.local/shadow.png", "custom shadowUrl");
});

test("createShadow class + style", (t) => {
  const icon = new Icon({
    shadowClass: "mock-shadow-class",
    shadowStyle: {
      marginLeft: "0px",
    },
  });

  const shadow = icon.createShadow();

  t.is(shadow.style["margin-left"], "0px", "override/set style");
  t.is(
    shadow.className,
    "extra-marker-shadow mock-shadow-class",
    "add custom class",
  );
});

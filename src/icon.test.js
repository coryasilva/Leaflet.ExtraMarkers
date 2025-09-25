import "global-jsdom/register";
import test from "ava";
import { Icon } from "./icon.js";

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
  t.assert(typeof shadow === "undefined", "drop shadow should be filter on svg marker instead");
});

test("createShadow custom", (t) => {
  const icon = new Icon({
    shadowUrl: "https://domain.local/shadow.png",
    shadowAnchor: [4, 2],
    shadowSize: [8, 4]
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
  t.is(shadow.className, "extra-marker-shadow mock-shadow-class", "add custom class");
});

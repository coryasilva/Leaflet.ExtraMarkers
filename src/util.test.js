import "global-jsdom/register";
import test from "ava";
import {
  createElement,
  createSvgElement,
} from "./util.js";

test("createElement", (t) => {
  const el = createElement([
    "ul", {
      style: { color: "#000", background: undefined },
      class: [false, undefined, null, 1, "a"],
      "data-blah": undefined,
      "data-foo": "bar",
    }, [
    ["li", {}, ["item1"]],
    ["li", {}, ["item2"]],
    ["li", {}, ["item3"]],
  ]]);

  t.is(el.className, "1 a", "class");
  t.is(el.getAttribute("style"), "color: rgb(0, 0, 0);", "style");
  t.deepEqual(Object.assign({}, el.dataset), {foo: "bar"}, "dataset");
  t.is(el.textContent, "item1item2item3", "children text");
  t.is(el.children.length, 3, "children length");
});


test("createSvgElement", (t) => {
  const el = createSvgElement([
    "svg", {
      style: { fill: "#000", background: undefined },
      class: [false, undefined, null, 1, "a"],
      "data-blah": undefined,
      "data-foo": "bar",
    }, [
    ["path", { d: "mock1" }, []],
    ["path", { d: "mock2" }, []],
    ["path", { d: "mock3" }, []],
  ]]);

  t.is(el.getAttribute("class"), "1 a", "class");
  t.is(el.getAttribute("style"), "fill: #000;", "style");
  t.deepEqual(Object.assign({}, el.dataset), {foo: "bar"}, "dataset");
  t.is(el.children.length, 3, "children length");
});

#!/use/bin/env node
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { parseSync } from "svgson";

const IN_DIR = path.resolve(process.cwd(), "./svgs");
const OUT_DIR = path.resolve(process.cwd(), "./src/markers");

const base64Svg = (svgString) =>
  Buffer.from(svgString.replaceAll("\n", "")).toString("base64");

const toPascalCase = (str) =>
  str.replace(
    /(\w)([a-z0-9]*)(_|-|\s*)/g,
    (_g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase(),
  );

async function parseMarkers(fileNames, dir) {
  const markerPromises = fileNames.map(async (fileName) => {
    const name = toPascalCase(path.basename(fileName, ".svg"));
    const fileNameKebab = name.split(/(?=[A-Z])/).map(s => s.toLowerCase()).join("-");
    const raw = await fsp.readFile(path.join(dir, fileName), "utf-8");
    const contents = parseSync(raw);
    return { name, contents, raw, fileNameKebab };
  });

  const markerContents = await Promise.all(markerPromises);

  return markerContents.reduce((markers, { name, contents, raw, fileNameKebab }) => {
    markers[name] = { ...contents, raw, fileNameKebab };
    return markers;
  }, {});
}

/**
 * @param {Record<string, INode>} markerMap
 */
async function generateMarkers(markerMap, dir) {
  const markers = Object.keys(markerMap);

  const writeMarkerPromises = markers.map(async (name) => {
    const { fileNameKebab } = markerMap[name];
    const codePath = path.join(dir, `${fileNameKebab}.js`);
    const typeDefPath = path.join(dir, `${fileNameKebab}.d.ts`);
    const marker = markerMap[name];

    const transformNode = ({ name, attributes, children }) => {
      if (children?.length) {
        return [name, attributes, children.map(transformNode)];
      }
      return [name, attributes];
    };

    const markerNode = transformNode(marker);

    const code = `
/**
 * @name ${name}
 * @preview ![img](data:image/svg+xml;base64,${base64Svg(marker.raw)})
 * @type {Array}
 */
export const ${name} = ${JSON.stringify(markerNode)};
    `;

    await fsp.writeFile(codePath, code, "utf-8");

    const typeDef = `
import type { SvgNode } from "../types.js";

export declare const ${name}: SvgNode;
`;
    await fsp.writeFile(typeDefPath, typeDef, "utf-8");
  });

  const result = await Promise.all(writeMarkerPromises);
  console.log("Successfully generated markers.", markers.length);

  return result;
}

async function generateBarrelFile(fileName, markerMap) {
  const filePath = path.join(OUT_DIR, fileName);
  const markerFiles = Object.keys(markerMap).sort();

  // Empty file
  fsp.writeFile(filePath, "", "utf-8");

  const markerPromises = markerFiles.map(async (markerName) => {
    const { fileNameKebab } = markerMap[markerName];
    const importStatement = `export { ${markerName} } from "./${fileNameKebab}.js";\n`;
    return fsp.appendFile(filePath, importStatement, "utf-8");
  });

  await Promise.all(markerPromises);

  await fsp.appendFile(filePath, "\n", "utf-8");

  console.log("Successfully generated barrel file.", filePath);
}

async function build() {
  // Read svg files
  const files = await fsp.readdir(IN_DIR);
  const svgFiles = files.filter((file) => path.extname(file) === ".svg");

  // Parse files into map
  const markerMap = await parseMarkers(svgFiles, IN_DIR);

  // Ensure out dir exists
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR);

  // Generate the output files
  await generateMarkers(markerMap, OUT_DIR);

  // Generate the barrel file
  await generateBarrelFile("index.d.ts", markerMap, OUT_DIR);
  await generateBarrelFile("index.js", markerMap, OUT_DIR);
}

await build();

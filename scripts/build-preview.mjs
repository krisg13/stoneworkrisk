// Regenerates preview.html from the built site so the standalone preview
// never drifts from src/pages/index.astro.
// Usage: npm run build && npm run preview:html
import { readFileSync, writeFileSync, existsSync } from "node:fs";

if (!existsSync("dist/index.html")) {
  console.error("dist/index.html not found — run `npm run build` first.");
  process.exit(1);
}

const banner =
  "<!-- GENERATED FILE — do not edit by hand.\n" +
  "     Regenerate with:  npm run build && npm run preview:html\n" +
  "     Source of truth:  src/pages/index.astro -->\n";

// Point root-absolute asset refs at public/ so the file opens straight from disk.
const html = readFileSync("dist/index.html", "utf8").replace(
  /(href|src)="\/(?!\/)/g,
  '$1="./public/'
);

writeFileSync("preview.html", banner + html);
console.log("preview.html regenerated from dist/index.html");

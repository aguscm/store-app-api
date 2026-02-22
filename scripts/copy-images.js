const fs = require("fs");
const path = require("path");

const sourceDir = path.join(__dirname, "..", "src", "modules", "products", "data", "images");
const targetDir = path.join(__dirname, "..", "built", "modules", "products", "data", "images");

if (!fs.existsSync(sourceDir)) {
  console.warn(`[postbuild] Source folder not found: ${sourceDir}`);
  process.exit(0);
}

fs.mkdirSync(path.dirname(targetDir), { recursive: true });
fs.cpSync(sourceDir, targetDir, { recursive: true, force: true });

console.log(`[postbuild] Images copied to: ${targetDir}`);
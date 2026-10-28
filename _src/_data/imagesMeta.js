// 2026-10-28 ebb: for parsing images in the img/ directory:
const fs = require("fs");
const path = require("path");

module.exports = function () {
  const imgRoot = path.join(__dirname, "..", "img");
  const isImage = /\.(jpe?g|png|gif|webp|svg)$/i;
  const topics = {};

  for (const dir of fs.readdirSync(imgRoot, { withFileTypes: true })) {
    if (!dir.isDirectory() || dir.name.startsWith(".")) continue;
    const files = fs
      .readdirSync(path.join(imgRoot, dir.name))
      .filter((f) => isImage.test(f));
    if (files.length) {
      topics[dir.name] = files.map((file) => ({
        filename: path.parse(file).name,
        filepath: `img/${dir.name}/${file}`,
      }));
    }
  }
  return topics;
};

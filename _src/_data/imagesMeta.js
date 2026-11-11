// 2026-10-28 ebb: for parsing images in the img/ directory.
// 2026-11-11 ebb: Updated: clearer code and comments for how we retrieve topics and laters
const fs = require("fs");
const path = require("path");

module.exports = function () {
  const imgRoot = path.join(__dirname, "..", "img");
  const isImage = /\.(jpe?g|png|gif|webp|svg)$/i;
  const topics = {};

  const folders = fs
    .readdirSync(imgRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .map((entry) => entry.name)
    .sort();

  for (const topic of folders) {
    const files = fs
      .readdirSync(path.join(imgRoot, topic))
      .filter((file) => isImage.test(file))
      .sort();

    if (files.length) {
      topics[topic] = files.map((file) => ({
        label: path.parse(file).name.replace(/[-_]+/g, " "),
        // ebb; Above our filename "puffin-habitat.jpg" becomes "puffin habitat"
        filepath: `img/${topic}/${file}`,
        // ebb: relative filepath with no leading slash, so it works on GitHub Pages.
      }));
    }
  }
  return topics;
};

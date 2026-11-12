// update-images.js
// Run with:  node update-images.js
//
// Looks down inside _src/img/ (one folder per topic) and updates _src/_data/gallery.json.
//  - New images and folders are ADDED to the JSON.
//  - Images you deleted are REMOVED from the JSON.
//  - Everything else is left exactly as you edited it (captions, alt text, order).
// So you can run it again and again without losing your work.

const fs = require("fs");
const path = require("path");

const imgRoot = path.join(__dirname, "_src", "img");
const jsonFile = path.join(__dirname, "_src", "_data", "gallery.json");
const isImage = /\.(jpe?g|png|gif|webp|svg)$/i;

// 1. What is in the img folders right now?
const onDisk = {};
for (const entry of fs.readdirSync(imgRoot, { withFileTypes: true })) {
  if (!entry.isDirectory() || entry.name.startsWith(".")) continue;
  const files = fs
    .readdirSync(path.join(imgRoot, entry.name))
    .filter((file) => isImage.test(file))
    .sort();
  if (files.length) onDisk[entry.name] = files;
}

// 2. What does gallery.json already say? (If it has a typo, stop without changing it.)
let old = {};
if (fs.existsSync(jsonFile)) {
  try {
    old = JSON.parse(fs.readFileSync(jsonFile, "utf8"));
  } catch (error) {
    console.error(`Could not read gallery.json: ${error.message}`);
    console.error(
      "Nothing was changed. Fix the typo in the JSON and run this again.",
    );
    process.exit(1);
  }
}

// 3. Merge: keep your entries that still have a file, add entries for new files.
const gallery = {};
const added = [];
const removed = [];
const topics = [
  ...new Set([...Object.keys(old), ...Object.keys(onDisk).sort()]),
];

for (const topic of topics) {
  const files = onDisk[topic] || [];
  const oldEntries = old[topic] || [];
  const kept = oldEntries.filter((entry) => files.includes(entry.file));
  oldEntries
    .filter((entry) => !files.includes(entry.file))
    .forEach((entry) => removed.push(`${topic}/${entry.file}`));

  const known = kept.map((entry) => entry.file);
  const fresh = files
    .filter((file) => !known.includes(file))
    .map((file) => {
      added.push(`${topic}/${file}`);
      return {
        file,
        // "puffin-habitat.jpg" becomes "puffin habitat"
        caption: path.parse(file).name.replace(/[-_]+/g, " "),
        alt: "",
      };
    });

  if (kept.length + fresh.length) gallery[topic] = [...kept, ...fresh];
}

// 4. Save it and report.
fs.mkdirSync(path.dirname(jsonFile), { recursive: true });
fs.writeFileSync(jsonFile, JSON.stringify(gallery, null, 2) + "\n");

const all = Object.values(gallery).flat();
console.log(
  `gallery.json: ${all.length} images in ${Object.keys(gallery).length} topics.`,
);
if (added.length) console.log(`Added ${added.length}: ${added.join(", ")}`);
if (removed.length)
  console.log(`Removed ${removed.length}: ${removed.join(", ")}`);
const needAlt = all.filter((entry) => !entry.alt).length;
if (needAlt)
  console.log(
    `${needAlt} image(s) still need alt text. Open gallery.json and fill in "alt".`,
  );

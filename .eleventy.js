const esbuild = require("esbuild");
// 2026-10-27 ebb: I'm using esbuild to handle my three.js integration with 11ty.
// This is building the staticized version of three.js for my published site,
// and plays nicely with 11ty.

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("_src/_includes/");
  eleventyConfig.addPassthroughCopy("./_src/css/");
  // eleventyConfig.addPassthroughCopy("./_src/main.js");
  // ebb: Replaced the "passthrough" of main.js with this esbuild step for three.js:
  eleventyConfig.on("eleventy.before", async () => {
    await esbuild.build({
      entryPoints: ["_src/main.js"],
      bundle: true,
      minify: true,
      format: "esm",
      outdir: "_site/assets",
      sourcemap: true,
    });
  });
  eleventyConfig.addPassthroughCopy("./_src/img/");
  eleventyConfig.addPassthroughCopy("./_src/threed-images/");
  // eleventyConfig.addNunjucksFilter(
  //   "getTopicKeys",
  //   require("./_src/parsekeys.js").getTopicKeys,
  // );
  eleventyConfig.addPassthroughCopy({
    "node_modules/@11ty/is-land/is-land.js": "js/is-land.js",
  });

  // ebb: Re-run the build when Three's main.js changes during --serve
  eleventyConfig.addWatchTarget("./_src/main.js");

  return {
    dir: {
      input: "_src",
      output: "_site",
    },
  };
};

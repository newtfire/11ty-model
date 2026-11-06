---
title: Island Architecture Orientation
layout: base.njk
permalink: islandarch.html
templateEngineOverride: md
---
<!-- ebb: I needed to add the "templateEngineOverride: md" in the fences
because this page explains some liquid tags quoted in markdown, and without this override, Liquid fills the tag in before the markdown is parsed, so the backticks would display empty! So this should stop 11ty from filling in the tags we want you to see.
 -->

*An orientation for the part of this course where we build our site in 11ty and add interactivity with `<is-land>` and petite-vue.*

## Two ways to build a website

There are, broadly, two ways people build sites today that have interactive parts.

**Approach 1: the whole site is an app.** You write the entire page in JavaScript — every heading, every image, every paragraph of body text — as a tree of components. When someone visits, the browser downloads a bundle of JavaScript, runs it, and that JavaScript *builds* the page from scratch, entirely in the browser. State (the data that can change — a counter, a form value, what's currently selected) lives in that JavaScript and the page re-draws itself whenever it changes. This is how frameworks like React, Vue, or Svelte are most commonly used — you may have seen this called a "single-page app," or "SPA."

**Approach 2: the site is a website, and a few parts of it wake up.** Most of a page (body text, images, navigation, a gallery) never changes after it's loaded, so there is no reason to route it through JavaScript at all. It's rendered ahead of time as plain HTML. (That's what 11ty does — it builds full HTML pages from your templates and markdown, before anyone visits.) Only the *specific pieces* that actually need to remember something and react to input (like a filter control, a live form, or a Three.js scene) are wrapped in a small reserved "pocket" of JavaScript that "wakes up" independently. Those pockets are called **islands**. Everything *outside* an island is just HTML, the way the web has worked since the 1990s: no JavaScript is required to read the rest of the site, so that content is served without depending on the JS portions at all!

That's the whole idea. We are learning **approach 2** with island architecture in this unit!

## Why the distinction matters, not just technically

These two approaches definitely differ in performance: islands are typically faster and lighter, so you're not shipping a big JavaScript application just to display a paragraph of text. But these approaches *also* reflect two different assumptions about what a **page** is.

Approach 1 treats a page as an *application*: something assembled at runtime, out of interchangeable, remixable parts. That's a good design strategy, and it's why React-style thinking dominates a lot of professional software: apps like Gmail or Figma really are best understood as programs, not documents. <span class="smaller">For those curious: Figma's user interface is built with React, and Gmail has its own Google-based JavaScript framework: we can say that they are "React-style" without calling them React.</span>

Approach 2 treats a page as a *document* that occasionally has small, deliberate pockets of behavior added to it. That's closer to how the web itself was originally imagined, and it fits a design portfolio, a gallery, or a project site, where most of what you're making is content meant to be read, viewed, and navigated, and only a few interactions need to be **stateful** (which means those interactions can be stored in memory). You're not defaulting into "everything is an app"; you're choosing, piece by piece, where interactivity actually earns its keep.

Neither approach is "correct" because they're suited to different things. Knowing about both means *you get to choose deliberately* rather than by default, which is really what we're trying to teach you beyond adapting our starter code syntax and file structure.

## How an island actually works

Two small tools do the work: the island structure and the JavaScript that's referenced inside it.

**`<is-land>`** decides *when* a region of the page wakes up. It doesn't know or care what JavaScript runs inside it. It's just a container with a timer.

```html
<is-land on:visible>

  <div id="counter" v-scope="{ count: 0 }">
    <p>Count: <span v-text="count"></span></p>
    <button @click="count++">Add one</button>
  </div>

  <template data-island>
    <script type="module">
      import { createApp } from './js/petite-vue.js'
      createApp().mount('#counter')
    </script>
  </template>

</is-land>
```

Nothing inside `<template data-island>` runs until the loading condition fires. Here are some properties you can set for an is-land:

* `on:visible` : Nothing happens until a user scrolls this into view.
* `on:idle` : Wait until the browser isn't busy with anything more urgent.
* `on:interaction` : Wait until the user clicks or taps something.
* `on:media` : Wait for a screen-size or device condition to be true.

**petite-vue** is what actually runs once an island wakes up. It's a very small library (only about 6 KB), and it lets us add state and reactivity directly onto existing HTML without a build step or a compiler. **`v-scope` marks the region controlled by petite-vue.** Inside that region:

- `{{ count }}` displays a value, and updates automatically whenever it changes
- `@click="count++"` runs code in response to an event
- the values in `v-scope="{ ... }"` are the *state* — the data this piece of the page remembers

This is the same underlying idea as "state" in any interactive framework: it's a value the page remembers and reacts to, just written directly onto the HTML file (in this is-land) instead of being generated by JavaScript.

## Set up islands on your site!
Let's begin with two new installations.

### 1. Install is-land and petite-vue

At your shell on your 11ty repository, install is-land and petite-vue together with a single npm command:

```
npm install @11ty/is-land petite-vue
```

`is-land` decides *when* an island wakes up. `petite-vue` makes it react to clicks and typing. Both are added to your `package.json` automatically.

### 2. Copy the scripts into your built site with addPassthroughCopy

In `.eleventy.js`, next to your other `addPassthroughCopy` lines, add:

```js
eleventyConfig.addPassthroughCopy({
  "node_modules/@11ty/is-land/is-land.js": "js/is-land.js",
  "node_modules/petite-vue/dist/petite-vue.es.js": "js/petite-vue.js"
});
```

This copies each file out of `node_modules` into `_site/js/`, where a browser can load it.

### 3. Load `is-land` on your pages

If you want these to run with pages that use your base.njk layout, we need to add the
is-land's javascript to them.

Open `_includes/base.njk` and add this line inside `<head>`:

```html
<script type="module" src="js/is-land.js"></script>
```

When your pages reach for `base.njk`, those pages now know what `<is-land>` means.
(If you skip this step, your islands will never work!)

## Exercise 0: Make your first island (a counter)

The markup goes in the page like normal HTML. Only the script waits inside the `<template data-island>`.

```html
<is-land on:visible>

  <div id="counter" v-scope="{ count: 0 }">
    <p>Count: <span v-text="count"></span></p>
    <button @click="count++">Add one</button>
  </div>

  <template data-island>
    <script type="module">
      import { createApp } from './js/petite-vue.js'
      createApp().mount('#counter')
    </script>
  </template>

</is-land>
```

* The `id` in `mount('#counter')` has to match the `id` on the element with `v-scope`.
* Use `v-text="count"` instead of `{{ count }}`. 11ty’s template languages (Liquid in your markdown files and Nunjucks in your .njk files) will also read double curly braces and will try to fill them in before the browser sees them.

### Troubleshooting

| What you see | Check |
|---|---|
| `404` for `is-land.js` or `petite-vue.js` in the browser console | Did you save `.eleventy.js`? Restart the server. |
| The page loads but the button does nothing | Is the `<script>` line in `base.njk`? Does the `mount('#...')` id match? |
| Blank or `undefined` text where a value should be | Use `v-text`, not double curly braces. |
| Works on localhost, broken on GitHub Pages | Look for a leading slash (`/js/...`) in your paths and remove it. See the path rules below. |
| Console says it can't resolve `js/petite-vue.js` | An `import` path must start with `./`. Use `./js/petite-vue.js`. |

Open your browser's developer tools (the Console and Network tabs) first. They usually tell you which file the browser couldn't find.

#### Wait...which path style should I use?

All of your file paths are *relative*: they point to a folder next to the page you're writing in. There are three rules.

- **In HTML attributes** (`<script src>`, `<link href>`, `<img src>`), write `js/file.js`. Writing `./js/file.js` also works and means exactly the same thing. We use the shorter form in this course.
- **In a JavaScript `import`**, you *must* start with `./`, as in `import { createApp } from './js/petite-vue.js'`. Without it, the browser reads `js/petite-vue.js` as the name of a package and refuses to load it.
- **Never start a path with `/`** on a GitHub Pages project site. Your site lives at `username.github.io/repo-name/`, and a leading slash points to `username.github.io/`, outside your site.

Both relative forms count from the page you're on. If a page ever lives inside a subfolder, you'll need `../` to climb back up (`../js/file.js`).


## Reusable pieces in petite-vue

If you want the same interactive behavior in more than one place on a page, you can wrap it in a plain JavaScript function that returns an object of data and behavior:

```html
<is-land on:visible>

  <div id="counters">
    <div v-scope="Counter({ initialCount: 5 })">
      <p>Count: <span v-text="count"></span></p>
      <button @click="increment">+</button>
    </div>
    <div v-scope="Counter({ initialCount: 20 })">
      <p>Count: <span v-text="count"></span></p>
      <button @click="increment">+</button>
    </div>
  </div>

  <template data-island>
    <script type="module">
      import { createApp } from './js/petite-vue.js'

      function Counter(props) {
        return {
          count: props.initialCount,
          increment() { this.count++ }
        }
      }

      createApp({ Counter }).mount('#counters')
    </script>
  </template>

</is-land>
```

So here, the Counter function is just written once. Inside the island you hand to `createApp({ Counter })`, you can use it as many times as you like, and each use keeps its own independent state. To use Counter in a different island, that new island’s script has to hand it to createApp too. The Counter function is petite-vue's version of a "component": much tinier than a full JS framework component but the same core modular idea of **packaging up behavior you can re-use**.


One related point: Separate islands don’t share *state* (or memory) even when they share the function. Two counters never affect each other unless you add some shared memory store between them (something we'll explore later on).

## Using Three.js in your 11ty site (without Vite)

In the last unit you built your Three.js scene with Vite. For this unit, 11ty is the one tool that builds your site. Vite is a development server *and* a bundler, and running it next to 11ty's own server would make two tools fight over the same job. So we keep only the part we need from Vite, the **bundler**, and use a small standalone one called **esbuild**.

### What a bundler does, and why we need one

Your Three.js code starts with a line like this:

```js
import * as THREE from 'three'
```

A browser can't resolve `'three'`. A path with no `./` in front is read as the name of a *package*, and the browser has no `node_modules` folder to look in. (This is the same rule that makes `import … from 'js/file.js'` fail.) A bundler follows your `import` lines, gathers the code they point to, and writes **one file** that the browser can load, with Three.js already inside it.

### Setup Three.js in 11ty using esbuild

**1. Install two packages on your 11ty repo.**

```
npm install three
npm install --save-dev esbuild
```
(These will be added to your package.json)

**2. Keep your scene code in one entry file.**

Save it at `_src/threeScene.js` so it sits alongside your markdown files. If your scene code from the Vite unit only used `import` lines like the one above, it needs no changes.

**3. Add the build step to `.eleventy.js`.**

Put the `require` line at the very top of the file.


```js
const esbuild = require("esbuild");
```

Then set the next block inside `module.exports = function (eleventyConfig) { … }`.

```js
// Bundle Three.js before every 11ty build
eleventyConfig.on("eleventy.before", async () => {
  await esbuild.build({
    entryPoints: ["_src/threeScene.js"],
    bundle: true,
    minify: true,
    format: "esm",
    outdir: "_site/js",
    sourcemap: true,
  });
});

// Re-run the build when the scene file changes during npm run start
eleventyConfig.addWatchTarget("./_src/threeScene.js");
```

| Setting | What it does |
|---|---|
| `entryPoints` | The file to start from. esbuild follows every `import` out of it. |
| `bundle: true` | Combine everything into a single file. |
| `minify: true` | Shrink the file! This is very important because Three.js is large and you want to lighten its load for your visitors! |
| `format: "esm"` | Write a modern module, which `<script type="module">` expects. |
| `outdir` | Where the finished file lands: `_site/js/threeScene.js`. |
| `sourcemap: true` | Lets your browser's dev tools show your original code in error messages. |

**4. Put the scene in an island on your page.**

Use the path to the *built* file in `_site/js`. Your page doesn't use your source file.

```html
<is-land on:visible>
  <template data-island>
    <div id="scene-container"></div>
    <script type="module" src="js/threeScene.js"></script>
  </template>
</is-land>
```

**5. Keep textures and models in a folder that 11ty copies.**

In `.eleventy.js`:

```js
eleventyConfig.addPassthroughCopy("./_src/threed-images/");
```

Then refer to them with a relative path in your scene code, such as `threed-images/texture.jpg`.

**6. Build and publish as usual.** `npm run start` bundles your scene each time it builds, and your deploy step publishes the built `_site` folder. Your `node_modules` folder never goes online.

### Things Vite did that esbuild here does not

**Important**: If your three.js scene used *any* of these, you need to make some small changes:

- `import.meta.env` is a Vite feature. Replace it with a plain value.
- Importing an image or model as a module (`import tex from './tex.jpg'`) won't work. Load it by path instead, as in step 5.
- Vite's `public/` folder doesn't exist here. Use `_src/threed-images/` or another passthrough folder.

The watch target only covers the one file you list. If you split your scene into several files, add a line for each, or watch the folder that holds them.

### Troubleshooting 11ty / Three.js issues

| What you see | Check |
|---|---|
| Build error: `Could not resolve "three"` | Run `npm install three` in your project folder. |
| `404` for `threeScene.js` in the browser console | Is the entry file at `_src/threeScene.js`? Does the page say `src="js/threeScene.js"`? |
| You edited the scene but the page shows the old one | Save the file. Check that the watch target names the file you edited. Restart the server. |
| Works on localhost, broken on GitHub Pages | Remove any leading slash from your paths. See the path rules above. |


## Exercise 1: Turn your Three.js sketch into an island

Since you already have a working Three.js scene from the last unit, building an island for it won't require learning any new syntax. This is now purely about *timing* and incorporating your three.js model into your site, and you're learning how to integrate a three.js scene into 11ty using an is-land.

### Make a home for your pages / Did you make a nav bar yet?
First a little housekeeping for your 11ty site:

* Create a markdown page to host your three.js scene alongside some other content. Set it up with fences and a layout, (probably your base.njk)
* You should definitely make yourself a nice navigation menu.
     * If you haven't done so already, in _src, make a layouts/ folder to nest inside your _includes folder:
```
_src
  └── _includes
        └── layouts
```
     * Inside layouts, you can create .html files that can store your nav bar and a footer, a sidebar, whatever else you want to be able to tuck into base.njk.
     * Modify your base.njk to include your navbar (if you haven't already), and remember to keep updating that nav bar as you develop your site. Take a look at the files in my model 11ty site as a guide:
          * <https://github.com/newtfire/11ty-model/tree/main/_src/_includes>

### Setting up your new page to host your Three.js scene
Take your existing scene-setup code and wrap it in an is-land like so, adjusting to your directory structure where this will build in your 11ty site:


```html
<is-land on:visible>
  <template data-island>
    <div id="scene-container"></div>
    <script type="module" src="js/threeScene.js"></script>
  </template>
</is-land>
```


Previously on your original Three.js project repo: your scene initialized the instant the page loaded, whether or not anyone had scrolled to it.

Now (when you get this running in an is-land in your 11ty site): Three.js only initializes when it's actually in the viewport. Nothing about your Three.js code really changes except this part: *when* it runs on a page in your 11ty site. This is a simple way to get a sense of what an "island" means before adding more petite-vue syntax on top of it.

## Next Steps
Looking ahead, the next island we'll make introduces `v-scope` and real state:
You'll set up a value that changes, and a page that reacts to it, in a completely separate island from your static content.

## My Demo Island Counters
If all is well, these counters will be working!

<is-land on:visible>

<section class="counterFlex">
  <div class="counter" id="counter1" v-scope="{ count: 5 }">
    <p>Count: <span v-text="count"></span></p>
    <button class="add" @click="count+=3">Add three!</button>
  </div>

  <div class="counter" id="counter2" v-scope="{ count: 13 }">
    <p>Count: <span v-text="count"></span></p>
    <button class="subtract" @click="count-=3">Subtract three!</button>
  </div>
</section>

  <template data-island>
    <script type="module">
      import { createApp } from './js/petite-vue.js'
      createApp().mount('#counter1')
      createApp().mount('#counter2')
    </script>
  </template>

</is-land>

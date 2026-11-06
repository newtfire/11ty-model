---
title: Island Architecture Orientation
layout: base.njk
permalink: islandarch.html
templateEngineOverride: md
---
<!-- ebb: I needed to add the "templateEngineOverride: md" in the fences
because this page explains some liquid tags quoted in markdown, and eleventy overrides
the backticks and won't display the quoted tagging. So this should stop eleventy from doing that.
 -->

# Islands: A Different Way to Design an Interactive Site

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

## Reusable pieces in petite-vue

If you want the same interactive behavior in more than one place on a page, you can wrap it in a plain JavaScript function that returns an object of data and behavior:

```js
function Counter(props) {
  return {
    count: props.initialCount,
    increment() {
      this.count++
    }
  }
}
```

```html
<div v-scope="Counter({ initialCount: 5 })">
  <p>{{ count }}</p>
  <button @click="increment">+</button>
</div>
```

You can reuse `Counter(...)` as many times on the page as you like, and each instance keeps its own independent state. This is petite-vue's version of a "component": much tinier than a full JS framework component but the same core modular idea of **packaging up behavior you can re-use**.

### Install is-land from petite-vue

At your shell on your 11ty repository, install is-land with npm:

```
npm install @11ty/is-land petite-vue
```

`is-land` decides *when* an island wakes up. `petite-vue` makes it react to clicks and typing. Both are added to your `package.json` automatically.

### Copy the scripts into your built site with addPassthroughCopy

In `.eleventy.js`, next to your other `addPassthroughCopy` lines, add:

```js
eleventyConfig.addPassthroughCopy({
  "node_modules/@11ty/is-land/is-land.js": "js/is-land.js",
  "node_modules/petite-vue/dist/petite-vue.es.js": "js/petite-vue.js"
});
```

This copies each file out of `node_modules` into `_site/js/`, where a browser can load it.

### Load `is-land` on your pages

If you want these to run with pages that use your base.njk layout, we need to add the
is-lands javascript to them.

Open `_includes/base.njk` and add this line inside `<head>`:

```html
<script type="module" src="js/is-land.js"></script>
```

When your pages reach for `base.njk`, those pages now know what `<is-land>` means.
(If you skip this step and your islands will never work!)

### Make your first island: A Counter!

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

- The `id` in `mount('#counter')` has to match the `id` on the element with `v-scope`.
- Use `v-text="count"` instead of `{{ count }}`. Nunjucks also reads double curly braces and will try to fill them in before the browser sees them.


## First exercise: turn your Three.js sketch into an island

Since you already have a working Three.js scene from the last unit, the very first island you build won't require learning any new syntax! This is now purely about *timing* and incorporating your three.js model into your site.

Create a markdown page to host your three.js scene alongside some other content!
Take your existing scene-setup code, completely unchanged, and wrap it in an is-land like so, adjusting to your directory structure where this will build in your 11ty site:


```html
<is-land on:visible>
  <template data-island>
    <div id="scene-container"></div>
    <script type="module" src="js/my-three-scene.js"></script>
  </template>
</is-land>
```


Previously on your original Three.js project repo: your scene initialized the instant the page loaded, whether or not anyone had scrolled to it.

Now (when you get this running in an is-land in your 11ty site): Three.js only initializes when it's actually in the viewport. Nothing about your Three.js code really changes except this part: *when* it runs on a page in your 11ty site. This is a simple way to get a sense of what an "island" means before adding more petite-vue syntax on top of it.

Once that's comfortable, the next island introduces `v-scope` and real state: a value that changes, on a page that reacts to it, in a completely separate island from your static content.

### Troubleshooting

| What you see | Check |
|---|---|
| `404` for `is-land.js` or `petite-vue.es.js` in the browser console | Did you save `.eleventy.js`? Restart the server. |
| The page loads but the button does nothing | Is the `<script>` line in `base.njk`? Does the `mount('#...')` id match? |
| Blank or `undefined` text where a value should be | Use `v-text`, not double curly braces. |
| Works on localhost, broken on GitHub Pages | Look for a leading slash (`/js/...`) in your paths and remove it. See the path rules below. |
| Console says it can't resolve `js/petite-vue.es.js` | An `import` path must start with `./`. Use `./js/petite-vue.es.js`. |

Open your browser's developer tools (the Console and Network tabs) first. They usually tell you which file the browser couldn't find.

#### Wait...which path style should I use?

All of your file paths are *relative*: they point to a folder next to the page you're writing in. There are three rules.

- **In HTML attributes** (`<script src>`, `<link href>`, `<img src>`), write `js/file.js`. Writing `./js/file.js` also works and means exactly the same thing. We use the shorter form in this course.
- **In a JavaScript `import`**, you *must* start with `./`, as in `import { createApp } from './js/petite-vue.es.js'`. Without it, the browser reads `js/petite-vue.es.js` as the name of a package and refuses to load it.
- **Never start a path with `/`** on a GitHub Pages project site. Your site lives at `username.github.io/repo-name/`, and a leading slash points to `username.github.io/`, outside your site.

Both relative forms count from the page you're on. If a page ever lives inside a subfolder, you'll need `../` to climb back up (`../js/file.js`).

### My Demo Island Counters
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


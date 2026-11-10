---
title: "Make a filterable gallery: is-lands with state"
layout: base.njk
permalink: gallery-tutorial.html
---
*With this exercise, you'll build an island with real **state**: a value your page remembers and reacts to. You build it from a gallery of your own images.*

## What you are building

A gallery with a row of buttons above it. Click **Sketches** and only your sketches show. Click **All** and everything comes back. The page never reloads.

## The idea: the page is already there

Every image in the gallery is ordinary HTML that 11ty builds ahead of time. The island doesn't create the pictures. It only remembers one thing, which topic is **active**, and shows or hides sections to match.

- The **state** is one value: `active`. It starts as `'all'`.
- Each **button** changes `active` when you click it.
- Each **section** of images uses `v-show` to decide whether it should be visible, based on `active`.

## Step 1: Sort your images into topic folders

Choose three topics and at least two images for each. Put them in folders inside the `img` folder you already copy into your site:

```
_src
  img
    sketches
    photos
    type
```

Use your own topics and names. Keep the folder names short and lowercase, with no spaces.

## Step 2: Add the gallery to a page

Make a new markdown page (with front matter and your `base.njk` layout). Paste this in, then change the topics, file names, and alt text to match your images:

```html
<is-land on:visible>

<div id="gallery" v-scope="{ active: 'all' }">
  <div class="filters">
    <button @click="active = 'all'" :class="{ on: active === 'all' }" :aria-pressed="String(active === 'all')">All</button>
    <button @click="active = 'sketches'" :class="{ on: active === 'sketches' }" :aria-pressed="String(active === 'sketches')">Sketches</button>
    <button @click="active = 'photos'" :class="{ on: active === 'photos' }" :aria-pressed="String(active === 'photos')">Photos</button>
    <button @click="active = 'type'" :class="{ on: active === 'type' }" :aria-pressed="String(active === 'type')">Type</button>
  </div>
  <section class="topic" v-show="active === 'all' || active === 'sketches'">
    <h3>Sketches</h3>
    <img src="img/sketches/first.jpg" alt="Describe this image">
    <img src="img/sketches/second.jpg" alt="Describe this image">
  </section>
  <section class="topic" v-show="active === 'all' || active === 'photos'">
    <h3>Photos</h3>
    <img src="img/photos/first.jpg" alt="Describe this image">
    <img src="img/photos/second.jpg" alt="Describe this image">
  </section>
  <section class="topic" v-show="active === 'all' || active === 'type'">
    <h3>Type</h3>
    <img src="img/type/first.jpg" alt="Describe this image">
    <img src="img/type/second.jpg" alt="Describe this image">
  </section>
</div>

  <template data-island>
    <script type="module">
      import { createApp } from './js/petite-vue.js'
      createApp().mount('#gallery')
    </script>
  </template>

</is-land>
```

Three things have to match exactly:

- The topic word in each button (`active = 'photos'`) and in its section (`active === 'photos'`).
- The `id` on the gallery (`gallery`) and the id in `mount('#gallery')`.
- The folder and file names in each `src`.

**Markdown rule:** leave no blank lines inside the `<div id="gallery">`. A blank line makes Markdown start treating the next indented lines as a code block.

## Step 3: Style the buttons

Add this to your stylesheet (or adjust to taste). The `on` class marks the active button:

```css
.filters button.on {
  font-weight: bold;
  text-decoration: underline;
}
.topic img {
  max-width: 14rem;
  margin: 0.5rem;
}
```

Do **not** give your sections a CSS rule like `display: none`. `v-show` hides a section by adding its own inline style, and a rule in your stylesheet can win over it. If your buttons work but no images appear, look for a `display: none` rule that matches your sections.

## Step 4: Test it

Run `npm run start`. Click each button. Then publish and click through the same buttons on your live GitHub Pages page. Check these:

- [ ] **All** shows every topic, and each other button shows only its own.
- [ ] The active button looks different from the others.
- [ ] Every image has alt text that describes it.
- [ ] It works on the live Pages site, not just localhost.

## Try next (optional)

- **Start with nothing showing.** Change `active: 'all'` to `active: 'none'`. What does the page look like until someone clicks?
- **Say what's showing.** Add `<p>Showing: <span v-text="active"></span></p>` inside the `div`.
- **Use it for your guide.** The same pattern can show one Tech Issue Guide section at a time. Each section's heading would be a button.

## Troubleshooting

| What you see | Check |
|---|---|
| Buttons appear but nothing happens when you click | Is `js/is-land.js` loaded in `base.njk`? Does `mount('#gallery')` match the `id`? Look in the Console for red. |
| Buttons work but no images appear | A `display: none` rule in your CSS matches your sections. Remove it. |
| One button shows nothing | The topic word in the button and its section don't match exactly (check spelling and capitals). |
| Images are broken (alt text shows instead) | The `src` path doesn't match your folder and file names. Don't start a `src` with `/`. |
| The gallery shows as a block of code | A blank line or an indented tag inside the gallery `div` made Markdown treat it as code. |

## Submit

The link to your live GitHub Pages page with the working gallery, with at least three topics and two images in each.

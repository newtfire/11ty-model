---
title: "Make a filterable gallery: is-lands with state"
layout: base.njk
permalink: gallery-tutorial.html
templateEngineOverride: md
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
    <button @click="active = 'all'" :class="{ on: active === 'all' }" :aria-pressed="active === 'all'">All</button>
    <button @click="active = 'sketches'" :class="{ on: active === 'sketches' }" :aria-pressed="active === 'sketches'">Sketches</button>
    <button @click="active = 'photos'" :class="{ on: active === 'photos' }" :aria-pressed="active === 'photos'">Photos</button>
    <button @click="active = 'type'" :class="{ on: active === 'type' }" :aria-pressed="active === 'type'">Type</button>
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

**What is `:aria-pressed`?**

First, here's some information about [ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA). ARIA is a set of roles and attributes that tell assistive technology, such as screen readers, things about a page's controls that plain HTML can't say on its own, *especially* on pages built with JavaScript. (Images get their description from `alt` text. ARIA is for the *state and behavior* of controls, such as "this button is pressed.") It is also a little risky to use if we do it wrong: bad ARIA that malfunctions is worse than no ARIA at all! The first rule of ARIA is to use a plain HTML element when one already does the job. Here we do: a real `<button>`. We add one ARIA attribute for the thing a button can't say by itself. Done right, it can be very supportive.

In our code: the `on` class only changes how the active button *looks*. A person using a screen reader can't see that. [`aria-pressed`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-pressed) is an attribute that tells assistive technology whether a toggle button is currently pressed (`true`) or not (`false`). The colon in `:aria-pressed="active === 'photos'"` means "work this value out from `active`," so it flips between `true` and `false` as `active` changes. Notice that each button's label never changes when it is pressed. The label names the button, and `aria-pressed` reports its state. You can leave the attribute out and the gallery will still work, but it is one short attribute that makes your buttons usable for more people.

**Who is this for?** Not everyone uses a website by looking at it and clicking. Here are three examples:

- **Screen reader users** (many are blind or have low vision) hear the page read aloud and move around with the keyboard, jumping from button to button or heading to heading. For them, `aria-pressed` is the difference between hearing "Photos, button" and hearing something like "Photos, toggle button, pressed."
- **Voice control users** can see the screen and say "click Photos." That works from the button's visible label, so keep labels plain, and let the visible text be the button's name.
- **Keyboard-only users** can't use a mouse. A real `<button>` works with Tab, Enter, and Space without any extra code, which is another reason to start with plain HTML.

Your gallery already does two more things well for accessibility. Sections hidden by `v-show` are hidden from screen readers too, so a topic you have filtered out stays silent. And the topic headings let screen reader users jump straight to a topic.

**Try it.** Turn on your computer's screen reader for a minute: VoiceOver on a Mac (press Cmd+F5) or Narrator on Windows (press the Windows key + Ctrl + Enter). Press Tab to move through the gallery buttons and listen. Use the same shortcut to turn it off. What you hear varies a little between screen readers and browsers.

**Markdown rule:** Leave no blank lines inside the `<div id="gallery">`. A blank line ends the HTML block, and Markdown goes back to treating what follows as ordinary Markdown text. Sometimes you won't notice (a stray `<p>` appears). But a line that starts with `<button @click=...>` gets shown on your page as literal text, and your buttons disappear.


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

- **Say what's showing.** Add `<p aria-live="polite">Showing: <span v-text="active"></span></p>` inside the `div`. A sighted visitor sees the images change. `aria-live="polite"` asks a screen reader to announce this line whenever it changes, so a visitor who can't see the images still learns what the button did. If you can, try it with a screen reader on.

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

## Next level: let a script keep your gallery up to date

In Steps 1 to 4 you typed every button, every section, and every `<img>` yourself. That works, but each new image meant editing the HTML and keeping three things in sync. Here is a tool to make building your site easier from now on, and you can reuse it for your own project.

It does two jobs:

1. A **script** looks at your `img` folders and keeps a list of your images up to date in a file called `gallery.json`.
2. A **layout** builds the whole gallery from that list.

And the list is a file you can **edit**. It is the place where you write a **caption** and **alt text** for every image.

Your day-to-day workflow becomes:

1. Put new images in a topic folder.
2. Run the script. It adds the new images to your list and leaves everything else alone.
3. Open `gallery.json` and write a caption and alt text for the new images.
4. 11ty builds the page.

**The island does not change.** It still holds one value, `active`, and it still shows and hides sections. The only difference is who writes the buttons and sections: you, or 11ty while it builds your site.

### How the pieces fit

| Piece | Where it lives | Its job |
|---|---|---|
| `update-images.js` (a **script** you run) | your project folder, next to `package.json` | Looks inside `img` and updates `gallery.json`. |
| `gallery.json` (a **data file** you edit) | `_src/_data/` | The list of your images, with a caption and alt text for each. |
| `gallery-layout.njk` (a **layout**) | `_src/_includes/` | Loops over the list and writes one button and one section for every topic. The island script lives here too. |
| `gallery-auto.md` (a **page**) | `_src/` | An ordinary markdown page. It names the layout and holds your introduction text. |

Any `.json` file in `_src/_data` becomes a variable that every template can use, named after the file. So `gallery.json` gives you a variable called `gallery`.

### Step A: Keep your topic folders

You already made these in Step 1:

```
_src
  img
    sketches
    photos
    type
```

Each **folder** will become a topic, and each topic will become a button. Images must sit directly inside a topic folder. Images inside a folder inside a topic folder are not read.

### Step B: Add the script

In your project folder (the one with `package.json` and `_src` in it), make a new file named `update-images.js` and paste this in:

```
your-project
  _src
  package.json
  update-images.js
```

```js
// update-images.js
// Run with:  node update-images.js
//
// Looks inside _src/img/ (one folder per topic) and updates _src/_data/gallery.json.
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
    console.error("Nothing was changed. Fix the typo in the JSON and run this again.");
    process.exit(1);
  }
}

// 3. Merge: keep your entries that still have a file, add entries for new files.
const gallery = {};
const added = [];
const removed = [];
const topics = [...new Set([...Object.keys(old), ...Object.keys(onDisk).sort()])];

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
console.log(`gallery.json: ${all.length} images in ${Object.keys(gallery).length} topics.`);
if (added.length) console.log(`Added ${added.length}: ${added.join(", ")}`);
if (removed.length) console.log(`Removed ${removed.length}: ${removed.join(", ")}`);
const needAlt = all.filter((entry) => !entry.alt).length;
if (needAlt) console.log(`${needAlt} image(s) still need alt text. Open gallery.json and fill in "alt".`);
```

You do not need to change anything in this file, and you do not have to understand every line to use it. Here is what it does, in order:

1. Looks in `_src/img` and makes a list of the topic folders and the image files inside them.
2. Reads `gallery.json` if it already exists. (If you made a typo in it, the script stops and does not touch the file.)
3. **Merges** the two. An image already in `gallery.json` keeps everything you wrote. An image that is new gets a starting caption made from its file name and an empty `alt`. An image you deleted from the folder is taken out of the list.
4. Saves the file and tells you what changed.

There is no magic in it. It is a short program that compares a list of files with a list in a file, and it only ever touches `gallery.json`. Reading through it is good practice, and a nice challenge is to work out where each of the four steps above happens.

### Step C: Run it

In your terminal, in your project folder, run:

```
node update-images.js
```

It makes `_src/_data/gallery.json` and tells you what it did, something like this:

```
gallery.json: 6 images in 3 topics.
Added 6: photos/first.jpg, photos/second.jpg, sketches/first.jpg, ...
6 image(s) still need alt text. Open gallery.json and fill in "alt".
```

Open `gallery.json`. It looks like this:

```json
{
  "photos": [
    {
      "file": "first.jpg",
      "caption": "first",
      "alt": ""
    }
  ]
}
```

This list is now **yours**. The script will keep it in step with your folders, but it will never overwrite what you write in it.

**Tip:** if you would like to type `npm run images` instead, add one line to the `scripts` part of your `package.json`, with a comma after the line above it:

```
"images": "node update-images.js",
```

### Step D: Write your captions and alt text

Edit `gallery.json`. For every image, replace the starting caption with a real one if you like, and write the `alt` text.

- The **caption** is for everyone. It shows under the image.
- The **alt text** is for people who cannot see the image, such as someone using a screen reader. It is read aloud in place of the picture. Describe what matters about the image in a sentence, and skip "image of" and "picture of."

For example, `"alt": "A pencil sketch of a heron standing in shallow water"` is helpful, and `"alt": "sketch1"` is not.

If you leave `alt` empty, the page uses the caption as a safety net. That is better than nothing, but it is not a real description, so aim to fill in every one. The script reminds you how many are left each time you run it.

You can also **reorder** images: cut and paste an entry higher or lower in its topic's list, and the gallery follows your order.

JSON is strict. Use double quotes, put a comma between entries, and do **not** put a comma after the last entry in a list or after the last property in an entry.

### Step E: Add a gallery layout

A **layout** is a template that wraps around a page's content. You already use one, `base.njk`. Now make a second one just for galleries. In `_src/_includes`, make a new file named `gallery-layout.njk` and paste this in:

```html
---
layout: base.njk
---
{{ content | safe }}

<is-land on:visible>
  <div id="gallery" v-scope="{ active: 'all' }">
    <div class="filters">
      <button @click="active = 'all'" :class="{ on: active === 'all' }" :aria-pressed="active === 'all'">All</button>
      {% for topic, images in gallery %}
      <button @click="active = '{{ topic }}'" :class="{ on: active === '{{ topic }}' }" :aria-pressed="active === '{{ topic }}'">{{ topic }}</button>
      {% endfor %}
    </div>
    <p aria-live="polite">Showing: <span v-text="active"></span></p>
    {% for topic, images in gallery %}
    <section class="topic" v-show="active === 'all' || active === '{{ topic }}'">
      <h3>{{ topic }}</h3>
      <div class="row">
        {% for image in images %}
        <figure>
          <img src="img/{{ topic }}/{{ image.file }}" alt="{{ image.alt or image.caption }}">
          <figcaption>{{ image.caption }}</figcaption>
        </figure>
        {% endfor %}
      </div>
    </section>
    {% endfor %}
  </div>

  <template data-island>
    <script type="module">
      import { createApp } from './js/petite-vue.js'
      createApp().mount('#gallery')
    </script>
  </template>
</is-land>
```

Compare it with the gallery from Step 2. The island is identical: the same `v-scope`, the same `@click`, the same `v-show`, the same `mount('#gallery')`. Here is what is new:

- **The first three lines** say "wrap this layout inside `base.njk`." That way your gallery layout keeps your navigation, your `<head>`, and your `is-land.js` script, and you do not have to copy any of them.
- **`{{ content | safe }}`** is the spot where the text of your page (Step F) will land.
- - **`<p aria-live="polite">`** is the "Showing:" line. It tells a screen reader to announce which topic is showing whenever you press a button, so visitors who can't see the images swap still know what happened. (You will find this idea in the "Try next" list in Step 4.)
- **`{% for topic, images in gallery %}`** means "repeat everything down to the matching `{% endfor %}` once for every topic in `gallery.json`." Inside the repeat, `topic` is the topic's name and `images` is its list of images.
- **`{{ topic }}`** means "print the topic's name here." That is how `active = '{{ topic }}'` turns into `active = 'photos'`.
- The inner **`{% for image in images %}`** repeats the `<figure>` once per image. `{{ image.alt or image.caption }}` means "use the alt text, or the caption if the alt text is empty."

Those curly-brace tags are not for the browser. **11ty fills them in while it builds your site.**

**Why `.njk`?** The `for topic, images in ...` loop is written in Nunjucks, the template language for `.njk` files. A markdown or `.html` page uses a different language (Liquid) that cannot read this loop, which is why the loop goes in a layout and not in your page.

### Step F: Add the page

Now the page itself is simple. In `_src`, make a new markdown file named `gallery-auto.md` and paste this in:

```
---
title: Gallery (automatic)
layout: gallery-layout.njk
permalink: gallery-auto.html
---
Please press a button to choose a topical set of images.
```

Write whatever introduction you like below the front matter. It becomes the `{{ content | safe }}` in your layout, so you get to write your page text in markdown while the layout does the gallery work.

### Step G: Style the new pieces

Add this to your stylesheet. Your `.filters button.on` rule from Step 3 keeps working:

```css
.topic .row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.topic figure {
  margin: 0;
  max-width: 14rem;
}
.topic figure img {
  width: 100%;
  margin: 0;
}
```

The reminder from Step 3 still applies: do not add `display: none` to `.topic`.

### Step H: Test it

Run `npm run start` and open `gallery-auto.html`. Keep that running, and open a **second terminal** for the script. Then try these:

- [ ] **All** shows every topic, and each other button shows only its own.
- [ ] Open `_site/gallery-auto.html` in your editor. You will find ordinary buttons and sections with no `{% %}` anywhere, just like the page you typed by hand in Step 2. 11ty already did the loops.
- [ ] Drop a new image into a topic folder and run `node update-images.js` in the second terminal. The new image appears on the page.
- [ ] Write an `alt` for it in `gallery.json` and save. Check `_site/gallery-auto.html`: the `alt` in the `<img>` now holds your description.
- [ ] Make a brand new topic folder with two images in it and run the script. A new button appears.
- [ ] It works on the live Pages site, not just localhost. (Remember to commit `gallery.json` along with your images.)

### Try next (optional)

- **Count the images.** Change the button text from `{{ topic }}` to `{{ topic }} ({{ images.length }})`. (Only the text between the tags, not the `@click`.)
- **Check your own work.** View the page with the images turned off, or read the `alt` attributes in `_site/gallery-auto.html`. Does each one tell you what the image shows?
- **Keep using it.** For your own project, copy `update-images.js` and `gallery-layout.njk` into your site and change the folder names to match your topics.

### Troubleshooting (this section)

| What you see | Check |
|---|---|
| `Cannot find module ... update-images.js` | Your terminal is not in the project folder, or the file name is different. Use `ls` to check that `update-images.js` is listed, and `cd` to your project folder if it is not. |
| `ENOENT` error mentioning `_src/img` | The script has to sit in your project folder next to `_src`, not inside `_src`. Also check that `_src/img` exists. |
| `Could not read gallery.json` and a position in the file | A typo in the JSON. Look near the line and column it names for a missing comma, an extra comma after the last entry, or single quotes. The script did not change your file. |
| Buttons appear but there are no images, or no buttons except **All** | `gallery.json` is missing or empty. Run `node update-images.js` and check that your topic folders are inside `_src/img` and hold image files. |
| A new image does not show up | Did you run the script after adding it? Is the image directly inside a topic folder? |
| An image you deleted shows as broken | Run the script. It removes entries whose file is gone. |
| An image is broken (alt text shows instead) | The `file` in `gallery.json` has to match the real file name exactly, capital letters included. GitHub Pages is stricter about capitals than your computer is. |
| Terminal error: `illegal tag: {% for topic, images in gallery %}` | The loop is in a markdown or `.html` page. The loop belongs in the layout, `_src/_includes/gallery-layout.njk`. Your page should have only front matter and text. |
| The page has your text but no buttons or images | Does the front matter in `gallery-auto.md` say `layout: gallery-layout.njk`? Is the layout in `_src/_includes`? |
| The page has no navigation, or the buttons do nothing | The first lines of `gallery-layout.njk` should say `layout: base.njk`, so that `js/is-land.js` and your nav get loaded. Check that `mount('#gallery')` matches the `id`. |
| You changed `alt` but the page still shows the old one | Did you save `gallery.json`? Is `npm run start` still running? Look at the `alt` in `_site/gallery-auto.html`. |

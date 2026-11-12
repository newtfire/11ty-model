---
title: "Showing the Last-Built and Last-Committed Dates in an 11ty Footer"
layout: base.njk
permalink: footer-dates.html
templateEngineOverride: md
---

**What you'll build:** a footer that displays two dates:

1. **Page last updated**: the date of the last git commit that touched *this page's* source file
2. **Site last built**: the date and time of the most recent Eleventy build

You'll also see why a first attempt at this goes wrong, which teaches something important about *when* code runs.

---

## 1. The bug: code that runs in the wrong place

A natural first try is an `is-land` (petite-vue / Eleventy Island) that writes the date into the footer:

```html
<is-land on:visible>
  <span id="footer-datetime"></span>
  <template data-island>
    <script type="module">
      const el = document.getElementById("footer-datetime");
      const now = new Date();
      el.textContent = new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium", timeStyle: "short"
      }).format(now);
      el.setAttribute("datetime", now.toISOString());
    </script>
  </template>
</is-land>
```

**Try it:** load the page, wait a minute, reload. The time changes every visit.

**Why?** `new Date()` runs **in the visitor's browser**, at the moment they load the page. It tells you "now," not "when the site was built." (Compare: a static site generator runs *once*, on your machine or in CI, and the output is frozen HTML.)

> **Key idea:** To show a build-time fact, capture it **at build time** and write it into the HTML. Browser JavaScript can then *display* it, but can't *discover* it.

---

## 2. Site last built: a global data file

Eleventy runs any JavaScript file in your `_data` folder once per build and exposes the result to all templates.

> **Where does `_data` go?** It is relative to your **input directory**, not your project root. If your config uses `dir: { input: "_src" }`, put the file at `_src/_data/build.js`. A file in the wrong place is silently ignored.

**`_src/_data/build.js`**

```js
module.exports = {
  timestamp: new Date().toISOString()
};
```

Now `{{ build.timestamp }}` is available in any template. (Your project is CommonJS if `.eleventy.js` uses `require(...)`. If your `package.json` has `"type": "module"`, use `export default { timestamp: new Date().toISOString() };` instead.)

---

## 3. Page last updated: git, via computed data

Each page has its own source file (`page.inputPath`). We can ask git when that file was last committed.

**Try it in the terminal first.** This is the exact command our code will run:

```
git log -1 --format=%cI -- _src/gallery.md
```

You should see an ISO date like `2026-11-11T18:13:35-05:00`. (`%cI` = committer date in strict ISO 8601, meaning when the commit was *made*, not when it was pushed.)

Now wrap it in a data file. `eleventyComputed` is special: its functions run *once per page* and receive that page's data.

**`_src/_data/eleventyComputed.js`**

```js
const { execFileSync } = require("node:child_process");

module.exports = {
  gitLastCommit: (data) => {
    const file = data.page?.inputPath;
    if (!file) return null;
    try {
      const out = execFileSync(
        "git",
        ["log", "-1", "--format=%cI", "--", file],
        { encoding: "utf8" }
      ).trim();
      if (!out) console.warn(`[gitLastCommit] no commits found for ${file}`);
      return out || null;
    } catch (e) {
      console.warn(`[gitLastCommit] git failed for ${file}: ${e.message}`);
      return null;
    }
  }
};
```

Notes:

- The date is for the **page being built**, not the footer file. Committing `footer.html` doesn't change a page's date; committing that page's own source does.
- The `console.warn` lines are there so failures aren't silent. Watch your terminal when you build.

---

## 4. The footer template

```html
<strong>Page last updated:</strong>
{% if gitLastCommit %}
  <time class="fmt-date" datetime="{{ gitLastCommit }}">{{ gitLastCommit }}</time>
{% else %}
  <em>not yet committed</em>
{% endif %}
&middot;
<strong>Site last built:</strong>
<time class="fmt-date" datetime="{{ build.timestamp }}">{{ build.timestamp }}</time>

<is-land on:visible>
  <template data-island>
    <script type="module">
      const fmt = new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short"
      });
      document.querySelectorAll("time.fmt-date").forEach((el) => {
        el.textContent = fmt.format(new Date(el.getAttribute("datetime")));
      });
    </script>
  </template>
</is-land>
```

What each part does:

- **`<time datetime="...">`** is the semantic HTML element for dates. The `datetime` attribute holds the machine-readable value.
- **The build writes the ISO strings** into the HTML. Without JavaScript, readers see the raw ISO text. The page still works.
- **The island only formats.** It reads each `datetime` attribute and rewrites the visible text in the *viewer's* locale. It adds no data of its own. This is **progressive enhancement**.

---

## 5. Troubleshooting

| Symptom | Likely cause |
|---|---|
| "not yet committed" on every page | `eleventyComputed.js` isn't being loaded. Check it's in `<input dir>/_data/`. Add `console.log("loaded")` at the top to confirm. |
| "Site last built" is blank | Same issue with `build.js`. |
| Build crashes with `require is not defined` / `Unexpected token export` | CommonJS vs. ES module mismatch. Match your `package.json` `"type"`. |
| A new page shows "not yet committed" | The file has no commits yet. Commit it and rebuild. |
| Every page shows the same date on GitHub Actions | CI does a shallow clone. Add `fetch-depth: 0` to `actions/checkout`. |
| An edited-but-uncommitted page shows its *previous* commit date | Expected. Git only knows about commits. |

**Debugging habit:** when something is silently ignored, make it loud (`console.log`) and test the underlying command by hand (`git log ...`) before blaming the framework.

---

## Check your understanding

1. Why does `new Date()` in an island show the wrong "build date"?
2. Which file does `gitLastCommit` look at: the footer layout or the page being built?
3. If you edit a layout file and commit, which dates change?
4. Why keep the island at all, if the build already wrote the dates into the HTML?

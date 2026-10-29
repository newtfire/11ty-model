---
title: Markdown + HTML
permalink: markdown-to-html.html
---

# Markdown + HTML demo

Save this file as `_src/markdown-demo.md`, run `npm run start`, and visit `/markdown-demo.html`. Compare this page with the file's source.

## 1. Markdown in thirty seconds

Plain text becomes paragraphs. A blank line starts a new one.

**Bold**, *italic*, and `code` are marked with punctuation. A [link](https://www.11ty.dev/) puts the words in square brackets and the address in parentheses.

- A list is lines that start with a dash.
- Order doesn't matter here.

1. A numbered list uses numbers.
2. The browser does the counting.

### Headings use hash marks

One `#` is the page title, `##` is a section, and `###` is a subsection. In your guide, section files start at `###`.

## 2. Markdown gets turned into HTML

Everything above is shorthand. 11ty converts it to HTML before the page is built. Open your browser's inspector on a **bold** word and you'll see a `<strong>` tag.

## 3. HTML works inside Markdown too

Inline HTML sits in a sentence and Markdown keeps working around it. Here is a short quotation, <q>with *italic* text inside it</q>, and the italics still work.

A block-level HTML element is different. The first one below leaves Markdown *off* inside it. The second leaves a blank line and turns it back on.

### Block with no blank lines (Markdown stays off)

<figure>
<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='90'%3E%3Crect width='240' height='90' fill='%23cfd8e3'/%3E%3C/svg%3E" alt="A plain blue-gray rectangle standing in for a real image">
<figcaption>Photo by *Jane Doe*, [source](https://example.com). The asterisks and link show up as raw text.</figcaption>
</figure>

### Block with blank lines (Markdown works again)

<figure>

<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='90'%3E%3Crect width='240' height='90' fill='%23cfd8e3'/%3E%3C/svg%3E" alt="A plain blue-gray rectangle standing in for a real image">

<figcaption>

Photo by *Jane Doe*, [source](https://example.com). Now the italics and the link both work.

</figcaption>

</figure>

### The safest habit

Once you open a block-level HTML tag, write plain HTML inside it: `<em>` instead of `*`, and `<a href="...">` instead of `[text](...)`. It's a few more characters, and it works the same way every time.

### One more gotcha

Four spaces of indentation turn a line into a code block. Don't indent your HTML tags.

    <figure>
    This shows up as code, not as a figure.
    </figure>

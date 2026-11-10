---
title: "Shout-Out Citations! Recommend the Best Sources in your Guide"
layout: base.njk
permalink: shout-outs.html
---

Your Tech Issue Resource Guide points readers to sources worth their time. A **shout-out** is how you do it: a sentence or two, in your own voice, that recommends one specific source and tells a reader why it's worth opening. It's not really a summary, and it isn't just a source citation, but it points to a resource, emphasizes it, and credits it to lead people there.

You've developed your Zotero resources by now and read them so you're ready to recommend a few in your guide. For this assignment, experiment with your style for guiding people to important and perhaps esoteric (little-known) web resources that you highly recommend to learn more about something.

This should not be a simple source citation like you'd write in a course paper. To get yourself in the frame of mind for making linked references, develop at least one section of your resource guide in detail and send people for further information to ____. Prepare a "shout-out" to two or three resources that you especially recommend and reasons why you recommend them.

This should be more than a simple hyperlink over text. At least, the text you choose should help to make the resource and its key information recognizable and memorable. Should you provide a small visual preview of the resource, perhaps on hover? Or let your language handle the guidance of your readers to these other resources that you recommend?


## What to do

**1. Pick your sources.** Choose readings from your Zotero library, the ones you tagged with `#`. Your Tag Explorer shows which tags and readings your research keeps coming back to.

**2. Write the shout-outs into your guide.** Open your section files in `_src/sections/` and work them into the writing, inside your own sentences. For this assignment:

- Write **at least 6 shout-outs** across your guide.
- Put **at least one in every section**.
- Recommend **at least 4 different readings**.

**3. Make the link text memorable.** The words a reader clicks should say something, not just repeat a title. Use a plain HTML link:

```html
<a href="https://example.com/article">the clearest plain-language explainer I found</a>
```

Markdown links work for this assignment too. The HTML form saves you a step later, because in Exercise 4 you'll add one extra attribute to each shout-out link so a preview card can attach to it.

**4. Build and check.** Run `npm run start`. Click every link and make sure it goes where you meant. Then publish and check the live site.

## What a good shout-out looks like

A shout-out does three things: it points to **one** source, it gives **one concrete reason**, and it sounds like you.

> If you only read one thing about how feeds decide what you see, start with <a href="https://example.com/explainer">this plain-language explainer</a>. It's the first piece that made me notice how little of my own feed I actually chose.

A weak one is just a description:

> This article is about recommendation feeds.

Questions to ask yourself: Who is this for? What will they know after reading it that they didn't before? What surprised you? You can be informal, but a reader should be able to tell why *you* chose it.

## Checklist

- [ ] At least 6 shout-outs in your guide, with at least one in every section
- [ ] At least 4 different readings from your Zotero library
- [ ] Each link text says something about the source, not just its title
- [ ] Each shout-out gives a concrete reason a reader should open it
- [ ] Every link works, locally and on GitHub Pages

## What to submit

The link to your live guide on GitHub Pages and the link to your repo. If you used HTML links, say so in the Canvas comment.

## What's coming next

In the next exercise, you'll work on hovering over or tabbing to a shout-out link will show a preview card with details about that reading, so you pull in details from Zotero's XML export. So write the shout-outs you'd want a reader to find.

## How I'll look at them

| Look-for | What it means |
|---|---|
| Specific | Each shout-out points to one source and gives a concrete reason. |
| Voice | It sounds like you, not like an abstract. |
| Range | The sources are varied and come from your research, not just from the first search results. |
| Working | Every link goes where it should, and the guide builds. |

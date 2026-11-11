---
title: "Shout-Out Citations! Recommend the Best Sources in your Guide"
layout: base.njk
permalink: shout-outs.html
---

One important function of your Tech Issue Resource Guide is to point your readers to sources worth their time. For our interactive web media we don't want to do that the same we would in a printed paper. We want something less formal than source citation and more like a **shout-out**: Not really a summary, not like a source citation in a paper, but more of an effective pointer with an explanation, a sentence or two in your own voice, to recommend a specific resource, credit its developers, and tell readers why it's worth opening.

Now that you've developed a good collection of Zotero resources and you've been exploring them, you should be ready to recommend some of them in a "shout-out" of your own style in your Tech Issue guide. For this assignment, experiment with your style for guiding people to important and perhaps esoteric (little-known) web resources that you highly recommend to learn more about something!

Again, this should not be a simple source citation like you'd write in a course paper. To get yourself in the frame of mind for wanting call attention to a really good resource, develop at least one section of your resource guide in detail and send people for further information to ____. Prepare a "shout-out" to some resources you strongly encourage checking out, and reasons why you recommend them.

Your shout-outs should be more than a simple hyperlink over text. At least, the text you choose should help to make the resource and its key information *recognizable and memorable*. Perhaps you can provide something interesting on hover, associate the source with providing essential resources.


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

> **Essential reading**: Looking to start a projection mapping project yourself? You need to study up on projectors, and findmyprojector.com has some of [the best guidance to projectors](https://findmyprojector.com/projectors) that we've seen.

A weak one is just a description:

> [Here is a source](https://findmyprojector.com/projectors) on projectors used in projection mapping.

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

In the next exercise, we'll try adding some JS islands so when readers hover over or tab into a shout-out area, they'll see a preview card with details about that resource, pulling in details from Zotero. For some resources on the public web, of course, you can "shout out" more directly. For now, choose the shout-outs you'd most want your readers to find. There will be other ways to tie in to your Zotero investigation, including the visualizations we prepared in October.

## How I'll look at them

| Look-for | What it means |
|---|---|
| Specific | Each shout-out points to one source and gives a concrete reason. |
| Voice | It sounds like you, not like an abstract. |
| Range | The sources are varied and come from your research, not just from the first search results. |
| Working | Every link goes where it should, and the guide builds. |

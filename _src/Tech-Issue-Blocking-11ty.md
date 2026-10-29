---
title: Blocking Tech Issue Guide 11ty
param: TechGuide
layout: base.njk
permalink: techIssueBlocking.html
---

# Tech Issue Resource Guide: Blocking It Out in Your 11ty Site

**Due:** Thursday 11/5 by 3:05pm
**Milestone:** Section writing development

Let's start blocking and developing your Tech Issue Resource Guide on your new 11ty website. To this point you've been organizing and tagging source materials in Zotero, and you've experimented with JS for visualizing relationships in your sources. Now it's time to start writing up the guide and blocking it out on your site.

Think of your guide as a way to demonstrate your evaluation of a current issue and your advice to peers on how to navigate it. Your guide should have sections that explore different perspectives on an issue, and should point to resources for learning more and (possibly) for skilling up in an area. For this week, block out a new page on your 11ty site that introduces your issue and sets down sections with good headings.

The examples that we find most quickly of websites/webpages that organize resources around technological issues come from organizations, communities, or businesses, but the layout and organization of information is something to think about carefully. **What's a good strategy for orienting beginners quickly and guiding them to helpful resources?**

Start sketching out the content directed to people who don't know much about this issue but need to learn about it quickly. Locate, organize, and add some topical images that help draw attention, help show something meaningful,  guide the eye, make the reader think.

## Building your guide in pieces (web templating)

In 11ty, each **section** of your guide can be its own small markdown file, and one template page gathers all of them into a single guide. That means organizing your guide is a matter of creating, renaming, and reordering files. The content stays in plain markdown, and the page layout stays in one place.

```
_src/
  sections/
    sections.json              ← given: tells 11ty these files are guide sections
    01-why-this-issue-matters.md
    02-where-to-start.md
    ...your sections...
  guide.njk                    ← given: gathers the sections into one page
  img/                         ← your images
```

## Design work: What to do / How to begin

**1. Choose your sections.** Open your Zotero TEI export in the Tag Explorer. Your most-used `#` tags show what your research keeps coming back to, so use them to choose 4–6 candidate sections. You're free to pick headings that aren't tags, but your tags are a good place to start. Think about order too: What does a beginner need to see first?

**2. Add our starter blocking files.**
    *  From [this 11ty model site's repo](https://github.com/newtfire/11ty-model), copy our `sections-template/` and `guide.njk` into your `_src` folder.
    * **IMPORTANT! Rename** `sections-template/` to `sections`. (Rename this rather than just copying it to prevent problems later w/ duplicate sections.)
    * Then open `.eleventy.js` and add this line next to your other `addPassthroughCopy` lines, so 11ty copies your images into the site:

```js
eleventyConfig.addPassthroughCopy("./_src/img/");
```

**3. Write your section files.** Make one file per section. Copy one of the examples, rename it (keep the number prefix so your files stay in order), and edit the top part, called the **front matter**:

```markdown
---
title: Accessible Design
order: 2
image: img/pour.png
image_alt: Diagram of the four POUR principles
---
Your writing goes here, in markdown.
```

- `order` controls where the section appears in the guide.
- Accessibility matters! Every image needs `image_alt` text that describes it to someone who can't see it. Provide for photo / image source credits as well: we'll need a structure for captions. (Remember `<figure>` and `<figcaption>`.)
     - HTML elements like `<figure>` and `<figcaption>` can definitely be used within a markdown file, since markdown is parsed into HTML. But once you set an HTML element in a document, you have to keep using HTML elements inside that element.
- Inside a section file, start any headings at `###`. The page template already supplies each section's `##` heading.
- Each section should include at least one link to a resource, with a sentence about why it's worth a reader's time. (We'll work this start into a special design assignment on resource <q>shout-outs</q>.)
- `image_credit` is the caption under your image. Credit the source artists or technologies!

**4. Build and check.** Run `npm run start` and open the local link. Visit `/guide.html`. If a change doesn't show up, check that you saved the file, then restart the server.

**5. Publish.** Run `npm run deploy` to put your site on GitHub Pages, and confirm your guide loads at its public link.

## Checklist for this assignment

- [ ] 4–6 section files in `_src/sections/`, each with a title and order
- [ ] An opening section that explains the issue to a beginner
- [ ] At least one image with alt text
- [ ] At least one linked resource in each section
- [ ] The guide builds and loads at `/guide.html`, locally and on GitHub Pages

## What's coming next

In class on Thurs. 11/5 we will add a small **island** of interactivity to this same page, so that readers can choose which section to look at. You don't need to prepare anything for that unless you want to try it out on your own: we will explore 11ty’s is-land structures. Just have your sections building.

## Students' guides from last year

* Ashlynn Allgeier's [Digital Burnout in Creative Fields](https://ashlynnallgeier.github.io/Portfolio/projects/tech_issue.html)
* Evan Larson's [Virtual Production guide](https://evlar64.github.io/evSite/techIssue.html)
* Rashe Mishra's [Data Privacy: Designing with Integrity](https://rashemish.github.io/DIGIT400/)
* Temi Sakote's [Emotional Design in Digital Products](https://temiii857.github.io/Emotional-Design/)

## Real web guides to study

* [This surprisingly rich history and explanation of flashlights](https://tekled.co.uk/blogs/blog/what-flashlight)
* All Tech is Human: ["50 Resources on Content Moderation and Mis/Disinformation for Aspiring Trust & Safety Professionals"](https://alltechishuman.org/all-tech-is-human-blog/trust-amp-safety-resources-content-moderation-and-misdisinformation) (may not be the best for formatting and finding information, but note the range and explanation)
* [Manipulated Media Detection](https://partnershiponai.org/manipulated-media-detection-requires-more-than-tools-community-insights-on-whats-needed/) web essay

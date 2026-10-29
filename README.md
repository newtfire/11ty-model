# 11ty-model
a model for developing an 11ty site

11ty lets you build a site with customized templates that you organize to design your own site layouts.
It lets you develop pages and include content with with your own layout designs.
Here are instructions and resources for setting up a static 11ty site on GitHub, adapted from Savannah Ricks's "behind the scenes" instructions on her [Crochet Craze](https://crochetproject.github.io/CrochetCraze/) project site.

## Resources
* [11y.dev documentation](https://www.11ty.dev/)
* [11ty.rocks Video tutorial](https://www.youtube.com/watch?v=p81J7G1qFAM&list=PLRsQ6aSNe0GDFHNteM1VUSQrTJvIKoMas&index=3) (slightly different from our instructions below for naming directories, but perfectly okay to follow!)

## Requirements and installation
1. You need to have installed Node.JS and npm on your computer. (check with `node -v` and `npm -v`)
1. Set up a new GitHub repository on GitHub and clone it to a good location on your computer
1. In your shell, navigate to your repo. Initiate node on your repo with this command: `npm init -y`
     * Your repo will now have a `package.json` file.
1. Install 11ty by entering: `npm install @11ty/eleventy`
     * After this installs, enter an `ls` command to see the new files: You should now have a `package-lock.json` file and a folder names `node_modules`.

1. Make a new project for your repo in Webstorm, or open your code editor of choice. Open `package.json` and add the following commands into the “script” (carefully following its JSON structure):

    * `"start": "eleventy --serve",`
    * `"build": "eleventy"`

You'll be frequently using these commands in your terminal to develop and build your site.

1. You need a good `.gitignore` file, and 11ty does not supply one of these for you. Let's create it now (or save the [.gitignore](.gitignore) in this repo to your root directory).
Save a file named `.gitignore` in your root directory. (This is a "dot file":  it must have this exact name, starting with the `.`) This is a simple text file. Insert these lines into the file:

```
# OS generated files #
######################
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
# Eleventy and Node stuff #
/node_modules
.idea/
```

1. Now, we need a JS file to manage how 11ty works with your repo. Create another "dot file" that you name `.eleventy.js` and save this, too, in your repo's root directory.

Insert this JavaScript code as the contents of this file:

```
module.exports = function (eleventyConfig){
    return{
        dir: {
            input: "_src",
            output: "_site"
        },
      };
};

```
This code instructs 11ty on how to handle its site build process. We are saying that it should copy the contents of an `_src folder` (which you will create in a minute), and transfer them to a folder it controls, named `_site`. (You'll always keep your files that you're editing in `_src`, but the build process will copy them over to the publishing directory, `_site`.)


1. Now, let's create and set up the directory where you will be developing your site contents, layout templates, and and resources to include.

     1. In the root directory of your repo, create a folder directory called `_src`.
     1. **Inside the folder `_src`**, create a folder called `_includes`.
     1. **Inside the folder `_includes`**, create a file called `base.njk`  (This is a Nunjucks file, and  its name can be anything, but "base" is standard).

1. Open up your new `base.njk` file and add some basic HTML to this. You can work with / adapt these contents:

```
<!doctype html>
<html lang="en">
<head>
     <meta charset="UTF-8">
     <meta name="viewport"
           content="width=device-width,
           user-scalable=no,
           initial-scale=1.0,
           maximum-scale=1.0,
           minimum-scale=1.0">
     <meta http-equiv="X-UA-Compatible"
           content="ie=edge">
     <title></title>
</head>
<body>

    {{ content | safe }}

</body>
</html>
```
    * `{{ content | safe }}` is where Nunjuks will pull in the rest of the content here. If there is basic HTML in the content you're working with, Nunjucks knows that it's "safe" to work with.

1. Now, go inside `_src` and create a file named `index.md` . (We'll start the site with a a basic markdown file.)

1. At the top of the `index.md` file, insert this block of code:

```
---
title: Home
layout: base.njk
---
```

The --- are called “fences” and we'll be using them a lot on your files to store information like this. The content inside the fences are basically variables that store the title of the page and the layout file that will control it.

    * The title can be anything you like.
    * Everything within this `index.md` file is considered the "content" that is being pulled in through the Nunjucks in base.njk that you created.
    * Go ahead and write some markdown in the body of the file, after the fences, so your page has some content.

1. Inside `_src`, create a folder called `CSS` to store a css file you will be using throughout your site within this folder.

    * Add some CSS code for styling the contents of your index page (remember how markdown will convert to HTML elements). It doesn't have to be perfect, but just enough to help show us whether the CSS and index files are configuring correctly later when we build the site.

1. Remember you need to associate your CSS with a link line, and we'll do that in the Nunjucks layout file: Inside `base.njk`, add this reference link to your CSS file.

`<link rel="stylesheet" href="relative/file/path/to/your/css.css">`

Make the path be from index.md **relative to the css folder you created**. You don't need or want a leading `./` in front of this path, because it'll be looking "down" from one of your built html files into the css directory that you create.

1. Now, we need to edit the `.eleventy.js` file. If you were to “build” your site right now, 11ty would only be able to recognize your `index.md` file. To have 11ty recognize your `_includes`, CSS folder and its content, add the following code to your .eleventy.js:

```
    eleventyConfig.addPassthroughCopy("_src/_includes/");
    eleventyConfig.addPassthroughCopy("./_src/css/");

```
Periodically, as you develop folders in `_src`  and new resources, you'll need to go back and add those `addPassthroughCopy` lines to `.eleventy.js` in order for them to be included in site builds.

Here's how the `.eleventy.js` file should look now:

```
module.exports = function (eleventyConfig){
     eleventyConfig.addPassthroughCopy("_src/_includes/");
     eleventyConfig.addPassthroughCopy("./_src/css/");

     return{
         dir: {
            input: "_src",
            output: "_site"
        },
    };
};

```

1. Okay, let's test your site to see if it builds! Open your terminal and enter the command `npm run build`.

* This is actually executing the "build" command that you added to `package.json` earlier!
When this command is used, 11ty will look for your .eleventy.js file, discover that `_src` will be the input. It will then configure what’s directly inside `_src`, then output a folder called `_site` with the configured content.

* After the command is completed, you will now see the new `_site` folder.
Take a look inside the new `_site` folder: you will see not your initial index.md, but an index.html with your Markdown content configured to HTML.

* Every time you add new content within the `_src` file and `npm run build`, your changes will be converted and placed in the existing `_site`.

* **Important:** You can add new content to the `_site` folder, but don't do it! It will only be erased on the next `npm run build` **if that same content isn’t added to the `_src`** as well.

* **Never edit in the `site` folder.** The only time we open the `_site` folder is to make sure files are configuring correctly and to view 11tys filing layout.

Here's what your file directory structure will look like on completing these steps:

```
repo /
|-- _site /
|   |-- _includes /
|   |   |-- base.njk
|   |-- CSS /
|   |   |-- styles.css
|   |-- index.html
|
|-- _src /
|   |-- _includes /
|   |   |-- base.njk
|   |-- CSS /
|   |   |-- styles.css
|   |-- index.md
|
|-- .eleventy.js
|-- .gitignore
|-- package.json
|-- package-lock.json

```

To view live changes locally, use the command `npm run start` (as created in Step #3) and click on the localhost link provided in the terminal.

Congrats! You got some working HTML and CSS!


## Publishing to GitHub Pages on the gh-pages branch

Let's set up your project for publishing.

First, open up your `package.json` file, then insert the following command under the "scripts:"

`"deploy": "gh-pages -d _site"`


Next, open your terminal, travel to your project directory, and commit your changes remotely. Afterwards, use the command `npm run deploy`.

After your terminal loads a bunch of content and says "Published," open GitHub.com and open your repo. Click the branch dropdown, and you should see a "gh-pages" branch.

There you can open it, and find the contents of your `_site` folder.
Next, click on your repo's Setting/Pages, and under Source, set it to "Deploy from a branch."

Under "Branch" set the drop-down to "gh-pages" and "/(root)" and then hit Save.

Congrats! Your content is now public!
Your site link is provided at the top of the Pages settings.



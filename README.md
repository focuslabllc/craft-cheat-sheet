# The Craft Field Cheat Sheet

If you're like me, it's not uncommon to be working on a project and need to reference the documentation for code samples and syntax. Sure, text editors like Sublime Text and the like have the ability to add bundles that can auto-complete and insert code for you; but those often are out of context and you have to change around code before anything is ready and right.

Click the image below to learn more and see it in action.

[![Watch a video about the Cheat Sheet](https://raw.githubusercontent.com/focuslabllc/craft-field-cheat-sheet/master/img/screen-frame.jpg)](https://vimeo.com/125499887)

The Craft Field Cheat Sheet brings code samples into context to the site you're actually working on. The code you're shown actually uses **your** custom field names rather than sample field names. Each custom field shows you the type of field and some common code snippets that you can copy and paste for quick use within your templates.

![Sample Field with code blocks](https://raw.githubusercontent.com/focuslabllc/craft-field-cheat-sheet/master/img/ui-sample-1.png)

When you add a new Field in the Control Panel, The Craft Field Cheat Sheet is ready to show you the new sample code right away. It's designed to be a template you setup alongside your other templates. We recommend you put it in a location such as `templates/cheatsheet.html` so you can easily access it in your browser while you work. You would simply open `yourdomain.com/cheatsheet` and you're ready to rock.

You can view a static sample of the Cheat Sheet at the following link: <http://shared.focus.build/craft-cheat-sheet/>


## Visual Overview

Here is a quick breakdown of what you can expect to see in The Craft Field Cheat Sheet.

![UI with numeric labels](https://raw.githubusercontent.com/focuslabllc/craft-field-cheat-sheet/master/img/ui-sample-2.png)

1. Element switching
-  Menu grouped by groups
-  List just alphabetical
-  Field search box (for sites with tons of fields)
-  Official tag docs link
-  View in CP link



## Setting it up

Setting up the Cheat Sheet is very simple. Effectively, the steps are as follows:

1. Copy the contents of `downloads/cheatsheet.html` in this repository ([click here for the code to copy](https://raw.githubusercontent.com/focuslabllc/craft-field-cheat-sheet/master/downloads/cheatsheet.html))
2. Create a template called `templates/cheatsheet.html` (or `.twig` if you prefer)
3. Paste in the contents and save the file
4. Load the Cheat Sheet in your browser (`yourdomain.com/cheatsheet`)

**That's it!**

---

### Customizing the code samples

The power of the Cheat Sheet comes in how little setup there is. Craft, by design, allows fields to be used in a number of contexts. You have Entries, Assets, Categories, Users, etc. All of these elements can use the same fields from within Craft. As a result The Craft Field Cheat Sheet allows you to toggle the element name you're using so your sample code is more context-aware. Regardless of the Element you're working with, the code samples will be ready to go.

Additionally, it's common to use Twig's `set` function to name an element; or use a unique name for an element in a `for` loop etc. That's why you can add your own Custom Element Names. Selecting your Custom Element name updates your code samples so you literally can copy / paste / and use without needing to change things around.

![Creating and using custom element names](https://raw.githubusercontent.com/focuslabllc/craft-field-cheat-sheet/master/img/ui-sample-3.gif)

**Note:** We're using your browser's `localStorage` to save your custom elements on a per-hostname basis so you shouldn't have to re-enter them too often.


### Whitespace in code: Spaces or Tabs!??!?!?

Let's face it. We all have preferences around how we indent our code. This was considered while we built out The Craft Field Cheat Sheet. You can easily customize the whitespace used in your code snippets so that when you paste them into your text editor you don't have to convert tabs to space or vise-versa.

The default setting is to use a single tab for indentation. You can change this by updating the setting at the top of the `cheatsheet.html` file. Just look for this line:

	{%- set whitespace = '	' -%}

You might prefer two spaces for indentation. Here's a screenshot of my Sublime Text file representing different whitespace settings:

![Whitespace variable](https://raw.githubusercontent.com/focuslabllc/craft-field-cheat-sheet/master/img/ui-sample-4.png)



## Non-native Field Types

Does your site use any Field Types that didn't come with the original Craft install? (Or perhaps you've built one yourself.) No problem. These show up in the automated documentation as well. The trick is that we need to be aware of those to include code samples. We'll work diligently to cover our bases on making these code sample available.

If you're a Plugin developer and would like your plugin sample code included, create a pull request to have yours added in. There's a particular format to follow so we'll happily help you along the way. We want The Craft Field Cheat Sheet to be as inclusive as possible across the community.



## Things Worth Knowing

- The **Craft Field Cheat Sheet** only runs when Craft is in [dev mode](http://buildwithcraft.com/help/dev-mode). This is an effort to protect any potential exposure of your data structure. (This is, after all, a tool for development.)
- We considered making the template only render if the user was logged into the Control Panel (using the `{% if currentUser %}` conditional) but ultimately decided against that due to potential session timeouts during template work.
- This hasn't been extensively tested with sites containing 100+ fields. Feedback in these environments is very, very welcomed.
- We're toying around with a Plugin version that brings similarly helpful tools into the Control Panel. Feel free to submit any thoughts or ideas about that. Speaking of which...



## General Feedback

We love feedback! If you use this please let us know what you think, how it helps, and any ideas you may have. If you find a bug, have a question, or just need some help please submit it as [a GitHub issue](https://github.com/focuslabllc/craft-field-cheat-sheet/issues). Also feel free to hit us up on Twitter at [@FocusLabLLC](https://www.twitter.com/focuslabllc).



## Credits & Thanks

We originally created this as a self-serving tool while working on our own Craft builds. It seemed like something the community may benefit from though, so we opted to pretty it up and release it for free. After that decision we had suggestions, feedback, and help from a few key people.

- Core contributors @ Focus Lab:
    - [Alex Sailer](https://twitter.com/alexsailer) on UI
    - [Andy Fought](https://twitter.com/andyfought) on html/css
    - [Erik Reagan](https://twitter.com/erikreagan) on js/twig/craft
- Community credits
    - [Brandon Kelly](https://twitter.com/brandonkelly) who helped us wrap our heads around some of the data structure. Particularly Matrix.
    - [Ben Parizek](https://twitter.com/BenParizek) who originally inspired the "Cheat Sheet" idea through his awesome resources on [Straight up Craft](http://straightupcraft.com/search/results?q=cheat+sheet).



## License & Legalese

Copyright (c) 2016 Focus Lab, LLC

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

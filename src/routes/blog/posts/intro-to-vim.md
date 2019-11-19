---
title: An intro to Vim
date: 2019-11-17T20:30:00.000Z
---

An introduction to Vim's fundamentals

<!-- more -->

This post is an opinionated introduction to some of [Vim](https://www.vim.org/)'s fundamentals. It touches on `.vimrc` configuration and plugins (or plugin managers) briefly but leaves most of that for another guide (which I will hopefully get around to writing someday 🤞).

> I originally wrote this guide while TAing an introductory systems class at Northwestern University. Since writing it I have switched from `vim` to [`neovim`](https://github.com/neovim/neovim). These two editors are so similar that every single thing I wrote here translates though so thankfully no need to rewrite ✏️
>
> Here's my [current configuration](https://github.com/nathanshelly/.files/tree/master/neovim) and [my specific reasoning for using `neovim`](https://github.com/nathanshelly/.files/tree/master/neovim#why-neovim) if you're curious.

## <a name="top"></a> Table of Contents

- [What is `vim`](#what-is-vim)
  - [Why use it?](#why-use-it)
- [Installation](#installation)
  - [macOS](#macos)
  - [Linux](#linux)
  - [Windows](#windows)
- [Overview](#overview)
  - [Modes](#modes)
  - [Opening a file](#opening-a-file)
  - [Exiting `vim` (and saving files)](#exiting-vim-and-saving-files)
  - [Inserting text](#inserting-text)
  - [Navigating](#navigating)
  - [Deleting text](#deleting-text)
  - [Undo and redo](#undo-and-redo)
  - [Copy and paste](#copy-and-paste)
  - [Indentation](#indentation)
  - [Visual Mode](#visual-mode)
  - [Find and replace](#find-and-replace)
- [Advanced capabilities](#advanced-capabilities)
  - [Composition](#composition)
  - [Splits](#splits)
  - [Configuration](#configuration)
  - [Plugins](#plugins)
- [Further Learning](#further-learning)
- [Acknowledgment](#acknowledgment)

---

## What is `vim`

`vim` is a command line text editor.

“command line” means you use it inside your terminal.

“text editor” means it allows you to write and edit text files (primarily code files for our purposes).

It does not have the standard graphical interface one might associate with other text editors like Sublime Text, Atom or Visual Studio Code. Important to note that it is **NOT** an integrated development environment (IDE) like Xcode, Visual Studio or IntelliJ (Atom & Visual Studio Code blur the line here by including some features often associated with IDEs). By default `vim` does not come with features like code completion, refactoring, build tools or a debugger out of the box. These features can be added through plugins (though we won’t get into how today).

### Why use it?

One could come up with many reasons to use it but here are two things `vim` provides that I find particularly compelling.

First, portability. `vim` (or its predecessor Vi) are installed on nearly every compuer you will ever work on. This doesn’t matter as much on your own laptop where you can install any text editor or IDE you’d like. On a remote server though, you can’t use these graphical application (and may not even have permission to install other applications you might want to use). Emacs has a similar level of portability (though not quite the same ubiquity).

Second, a language for editing. All text editors aside from `vim` (at least as far as I am aware) directly insert characters when you hit letters or numbers on your keyboard and use keyboard shortcuts, e.g. `Ctrl-c`, to manipulate text or take special actions. In contrast, `vim` has modes, one of which allows you to directly enter characters while another (the default mode) takes your typing as actions to manipulate text. This may seem confusing or odd, I promise we’ll discuss it more in a little bit. As a sign of the popularity of this editing philosophy there are numerous plugins for IDEs, text editors and even web browsers that add `vim` keybindings to transplant the paradigm.

Here are some other people’s longer form thoughts (obviously a biased representation, definitely recommend reading other people’s thoughts on why they use Emacs or competing editors if you’re considering switching to `vim` full time):

- [What is `vim` and Why use `vim`?](https://medium.com/@fay_jai/what-is-vim-and-why-use-vim-54c67ce3c18e)
- [Why I Still Use `vim`](https://medium.com/commitlog/why-i-still-use-vim-67afd76b4db6)
- [Why I use `vim`](https://pascalprecht.github.io/posts/why-i-use-vim/)

## Installation

### macOS

Comes preinstalled with a non-current version. Recommend installing separately to ensure up to date versions. The easiest way to install is `brew install vim` if you use [Homebrew](https://brew.sh/).

### Linux

Preinstalled on most flavors. Can be installed through your package manager if not. `sudo apt install vim` for Ubuntu & Debian bistros, `sudo yum install vim` on Fedora & CentOS, and `sudo pacman -S vim` on Arch.

### Windows

The most convenient way I know of to run modern `vim` (or `neovim`) on Windows is the [Windows Subsystem for Linux (WSL)](https://docs.microsoft.com/en-us/windows/wsl/about). Once set up install `vim` with the appropriate package manager for the Linux distribution you chose. Probably one of the ones listed [a section above](#linux).

## Overview

### Modes

Officially, vim has 6 modes, we’ll focus on four of them for this tutorial (and I personally primarily use the first two modes covered here). Those four are `insert`, `normal`, `visual`, and `command-line`. We’ll cover `normal`, `insert` & `command-line` modes immediately, `visual` mode a little bit later.

#### `normal` & `insert` modes

When you open `vim` it starts in `normal` mode. In this mode each key is a shortcut for some action and they can be combined to allow more complex actions. To enter `insert` mode hit `i`. Until you leave `insert` mode, any key you hit will be inserted into the document like a normal text editor. Hit `esc` or `Ctrl-C` (_Note:_ `Ctrl-` is sometimes written `C-`) to leave `insert` mode and go back to `normal` mode.

#### `command-line`

Type `:` in `normal` mode to activate the `vim` command line. Here you can enter commands to take a range of actions, from simple to complex.

### Opening a file

- `vim <filename>` - to launch `vim` & open the specified file
- `:e <filename>` - to open a file from `vim` (this is using the `command-line` mode mentioned in the previous section)

### Exiting `vim` (and saving files)

1. If in `insert` mode, switch to `normal` mode by hitting `esc`
2. Type `:` to active `command-line` mode
3. Type one of the below sequences then hit `enter`. Example: `:wq<enter>` saves and quits the current file.
   - `w` (short for `write`) to save the file
   - `q` (short for `quit`) to close the file
   - `wq` or `x` to simultaneously save and exit
   - `q!` to exit without saving
   - `cq` to exit with an error code (useful for abandoning git commit edits for example)

### Inserting text

There are many ways to enter `insert` mode from `normal` mode, here are a few:

- `i` -> enter `insert` mode before cursor
  - `I` enters `insert` mode at the start of the line
- `a` -> enter `insert` mode after cursor
  - `A` enters `insert` mode at the end of the line
- `o` -> create new line below current line, enter `insert` mode on new line
  - `O` does the same, but inserts the new line above the cursor

### Navigating

`vim` provides many ways of navigating a file. This allows someone with the right commands to jump just about anywhere with a single line. Today we’ll just look at the basics that will get you 90% of the way there.

Note: `C-<key>` is shorthand for `Ctrl+<key>`. You can hold down the keys to repeat the actions.

- `normal` or `insert` mode - arrow keys to move by character/line in `normal` or `insert` mode
- `normal` mode only
  - `h`, `j`, `k`, and `l` to move left, down, up, and right, respectively
  - `e` to move to the end of the current “word”, `w` to move to the beginning of the next "word"
  - `$` to move to the end of the line, `0` to move to the start of the line
  - `:<number>` to jump to a particular line. This is particularly helpful if you get an error compiling/running something that tells you the line it happened on - you can jump straight there.
  - `/<pattern>` to search for all instances of the pattern. Use `n` to jump to the next instance, and `N` to jump to the previous instance. This will highlight all instances; use `:noh` to get rid of that highlighting when you're done jumping. This is really helpful if you're looking for a particular variable/function name.
- `zz` center file around cursor
- `C-d` and `C-u` to jump the screen down and up respectively, by half the height of the screen, without moving the cursor
- `C-e` and `C-y` move the screen down and up respectively, by one line at a time, without moving the cursor

### Deleting text

- `backspace` to delete text while in `insert` mode
- `dd` to delete the current line while in `normal` mode
- `cc` to “cut” the current line (delete and enter `insert` mode) while in `normal` mode

### Undo and redo

In `normal` mode:

- `u` to undo the last operation (e.g., `ddu` deletes the current line, and then immediately undoes the delete)
- `C-r` to redo (or undo an undo) (e.g., `ddu<C-r>` deletes the current line, undoes the delete, then redoes it)

### Copy and paste

In `normal` mode hit `y<motion>` to copy (yank) the current line. Hit `p` (again in `normal` mode) to paste the `yanked` line after the cursor (in the case of whole lines this will paste on the next line). Hit `P` to paste before the cursor (or the line above in the case of whole lines). Important to note that `dd` and `cc` both yank the current line as well, overwriting the copy buffer.

### Indentation

In `normal` mode hit `>>` to indent the current line once and `<<` to unindent the current line once. This works regardless of your cursor’s location on the line.

### Visual Mode

Mentioned briefly earlier, visual mode is an editing mode that lets you visually select text. Hit `v` to enter Visual Mode, or `V` to enter Visual-Line Mode. As you move around in Visual Mode text will be highlighted, and then you can apply a key command to it.

For example, if you highlight some text/lines and hit `d`, that selection will be deleted.

### Find and replace

`vim` find-and-replace is a command-line action. In general, it looks like: `:%s/<find>/<replace>/<modifiers>`

In this line, `%s` is the command "find-and-replace on all lines", `<find>` is the pattern you want to find, `<replace>` is the text you want to replace it with, and `<modifiers>` are keys that tweak the behavior of the find-and-replace.

Common modifiers include:

- `g` for "global" or "replace all instances within a line". Otherwise, it will only replace the first instance per line.
- `c`, for "confirm" or "ask for confirmation before replacing an instance". When it prompts, use `y` as "yes", `n` as "no", and `q` as "quit/stop replacing".

If you want to replace just on one line, or only in a visually selected block of text, leave off the `%` at the beginning - `:s/<find>/<replace>/<modifiers>`.

For example, to replace all instances of the text "hello" with the text "world" without asking for confirmation, the command would look like `:%s/hello/world/g`.

## Advanced Capabilities

### Composition

> `operators`, `motions` & `text objects`

This right here is the magic of `vim`. This is why people refer to `vim` as a language for editing text, not just a text editor.

Mastering most text editors involves memorizing various key combinations to perform complex actions. `vim` has some of that, but for most of the core editing actions it focuses on composability which dramatically increases the range of actions you can keep in your head without a photographic memory.

First let’s briefly discuss each of `operators`, `motions`, and `text objects` . All these explanations apply in `normal` mode.

- Operators (think `d` or `y`) are keys which perform an action like `d`eleting or `y`anking (copying)
  - A few operators to start with:
    - `d` - delete
    - `y` - yank
    - `c` - cut (delete and enter `insert` mode)
    - `>` or `<` - indent
  - Operators can be hit twice to operate on the current line. E.g., `dd` deletes the current line, `<<` to unindent the current line.
- Motions (think `w`, `j` or `$`) are keys which move the cursor. For example by `w`ord, down one line (`j`), or to the end of the line (`$`).
  - A few motions to start with:
    - `e` - end of current word
    - `w` - start of next word
    - `h`, `j`, `k`, and `l` - left, down, up, and right, respectively
    - `$` - end of line
- Text objects are keys which represent constructs like words (`iw`), sentences (`as`), or inside quotes (`i"`)
  - The default text objects (I say default because plugins can add more) of `vim` generally fall in two categories, inner (`i<key>`) or a (`a<key>`), as in “a sentence”. The distinction here usually has to do with whether or not the object includes surrounding white space and the surrounding character. E.g., `is` represents a sentence through the period (inclusive), while `as` represents a sentence through the space following the period (inclusive). Another example, `i”` represents all characters within a pair of quotes, exclusive of the quotes themselves. `a"` represents all characters and the quotes themselves. Try these out on some example text to get a better sense.
  - A few text objects to start with (all of these must be combined with `i` or `a`for `inner` or `a`, e.g., `iw` for inner word, surrounding whitespace exclusive, and `aw` for `a word`, surrounding whitespace inclusive.
    - `w` - word
    - `s` - sentence
    - `p` - paragraph
    - `(` or `)` (and other similar characters - `<`, `{`, `[`, etc.) - within or around innermost containing parens (or other character). E.g., if your cursor is within nested sets of parens it operates on the innermost set.
    - `"`, `'` - within or around innermost double or single quotes

Okay now that we’ve got that groundwork let’s talk composition. Generally, this composability comes in the form `<optional-number><operator><text-object-or-motion>`. Ignoring the `<optional-number>` for the moment, this means we can write `di"` to delete all characters between a pair of quotes, `y$` to yank all characters from our cursor to the end of the line, `ci(` (or `ci)`) to delete all characters within the nearest enclosing `()`s, and any other combination you can think of.

Okay now finally, let’s add in that `<optional-number>`. This allows you to repeat an `<operator>` and `<text-object-or-motion>` combination multiple times. For example, we know that `dd` deletes a line. `2dd` deletes _two_ lines, starting at the current. Equivalently, `dj` deletes the motion of the current line and the line below, indicated by `j` (which means “down"). `dk` deletes the current line and the one above. `2dk` deletes the current line and _two_ above. For a text object example,`daw` deletes the current word. `2daw` deletes the current word and the next. Important to note here that `i` text objects (like `iw`) cannot be repeated multiple times.

_Note:_ the optional number can also come between the `<operator>` and `<text-object-or-motion>`, e.g. `<operator><optional-number><text-object-or-motion>`.

There are more motions and text objects than I can list here. As you feel comfortable using the ones I did list look into adding more and more to increase your capabilities. There is, however, one additional set of motions I find super useful that I want to briefly mention:

- `f<key>` - move cursor to the next instance of `<key>` in the line

  - E.g. if I have the following line (with `^` indicating my cursor):

    ```
    The quick brown fox jumps over the lazy dog
          ^
    ```

    and I hit `fl` my cursor will move to the `l` in `lazy`:

    ```
    The quick brown fox jumps over the lazy dog
                                       ^
    ```

  - Just like other motions this can be composed with operators, had I hit `dfl` instead of `fl` in the example above I would have deleted all characters between my cursor (at the `i` in `quick`) and the `l` in `lazy`, inclusive, meaning I would have been left with `The quazy dog`.
  - `F<key>` performs the same motion but backwards

- `t<key>` - the same as `f<key>` except the cursor moves to the character before the next instance of `<key>`
  - `T<key>` performs the same motion but backwards
- See [this Stack Overflow post](https://stackoverflow.com/questions/12495442/what-do-the-f-and-t-commands-do-in-vim) if this explanation of `t` and `f` doesn’t do it for you

#### More references

- Composition
  - [Learn to speak vim — verbs, nouns, and modifiers!](https://yanpritzker.com/learn-to-speak-vim-verbs-nouns-and-modifiers-d7bfed1f6b2d)
  - [`vim` 101: Combining Operators and Motions](https://medium.com/usevim/vim-101-combining-operators-and-motions-1664a3847504)
  - [`vim` documentation: motion](http://vimdoc.sourceforge.net/htmldoc/motion.html#operator)
- Focus on motion
  - [`vim`: Motions & Command Language](http://springest.io/vim-motions-and-command-language)
- Focus on text objects (though there is overlap)
  - [`vim` Text Objects: The Definitive Guide](https://blog.carbonfive.com/2011/10/17/vim-text-objects-the-definitive-guide/)
  - [`vim` Killer Features Part 1: Text Objects](http://codyveal.com/posts/vim-killer-features-part-1-text-objects/)

### Splits

One awesome feature of text editors is the ability to edit the same or multiple files at the same time, side-by-side. `vim` has great support for these, called splits!

- Enter `:vsp <optional filename>` to open a `v`ertical `sp`lit. By default, it opens another view into the same file - you can give a filename to open a different file in the split.
- Enter `:sp <optional filename>` to open a horizontal `sp`lit
- Use `C-w <direction>` to move the cursor between splits. `<direction>` can be either an `hjkl` key or an arrow key - anything you'd normally use to move the cursor.

Note: `:q` and `:w` operate on a split-by-split basis. To make them apply to all open splits, use `:qa` (short for `:quitall`) or `:wa` (short for `writeall`), or all together as `:wqa`. E.g., to write and close all open splits simultaneously, use `:wqa`.

Here’s a guide on using splits for additional information: [`vim` Splits - Move Faster and More Naturally](https://robots.thoughtbot.com/vim-splits-move-faster-and-more-naturally).

### Configuration

> Note: configuration is about the only part of this guide where differences between `neovim` & `vim` need to be accounted for. If you're using `neovim` replace any instances of `.vimrc` with `init.vim` & `~/.vimrc` w/ `~/.config/nvim/init.vim`.

Configuration is done is a `.vimrc`, usually located in your home directory, e.g. `~/.vimrc`.

As you start to use `vim` more you might want to define your own custom commands, or remap keys, or use a particular set of non-default settings. To create these and maintain them between `vim` sessions you use a configuration file called a `.vimrc` (pronounced `vim-are-see`).

`vim` looks for a `.vimrc` file in your home directory (`~`). This file consists of a set of commands that `vim` runs each time you launch it.

Here’s an [example `.vimrc`](https://gist.github.com/nathanshelly/69e56b0035a1b671299f0d5c705babfc) with some simple defaults you might find useful (I’ve tried to comment each setting, if you only like some of the settings feel free to cherry pick just those). Additionally, here’s my full [personal vim configuration](https://github.com/nathanshelly/.files/tree/master/neovim) (split into multiple files) which I also try to keep well commented.

Finally, here are a few external references for more examples:

- [Example vimrc | `vim` Wiki](http://vim.wikia.com/wiki/Example_vimrc)
- [My .vimrc | Chris Yeh](https://chrisyeh96.github.io/2017/12/18/vimrc.html)
- [A Good `vim`rc](https://dougblack.io/words/a-good-vimrc.html) - opinionated take on `.vimrc`s, definitely agree with the one rule listed at the top of the article

### Plugins

If you want to use `vim` for heavier editing, you'll want to look into plugins. Plugins extend the built-in functionality of `vim`, and let you do some really cool stuff. This includes bringing in functionality for specific domains, for example smart autocompletion for a particular language.

It’s possible to install plugins manually (see the resources below for an article on doing so) but I highly recommend using a plugin manager. A few options are [vim-plug](https://github.com/junegunn/vim-plug), [Vundle](https://github.com/Vundle`vim`/Vundle.vim), and [Pathogen](https://github.com/tpope/vim-pathogen). I have used `vim-plug` for the past couple years and have never had any issues (I also haven't tried out any others so YMMV).

Setting up any plugin manager relies on modifying a `.vimrc`. If you're interested in learning more here’s some resources:

- [A StackOverflow discussion on the differences between various plugin managers](https://vi.stackexchange.com/questions/388/what-is-the-difference-between-the-vim-plugin-managers)
- [How to install `vim` plugins without a plugin manager](https://howchoo.com/g/ztmyntqzntm/how-to-install-vim-plugins-without-a-plugin-manager)
- [10 essential `vim` plugins for 2018](https://medium.com/@huntie/10-essential-vim-plugins-for-2018-39957190b7a9) - the author says essential, not sure about that but there’s some cool ones here
- [`vim` Awesome](https://vimawesome.com/) - a searchable listing of vim plugins
  - [`coc.nvim`](https://github.com/neoclide/coc.nvim) - the most valuable plugin I use
  - [`fzf.vim`](https://github.com/junegunn/fzf.vim) - the second most valuable plugin I use

## Further Learning

This guide only scratches the surface of `vim`’s features. Here’s a random grab bag of a few other features you may want to look into on your own:

- macros - record multiple keystrokes then repeat them to perform arbitrarily complex actions
- `.` - in `normal` mode hit `.` to repeat the last action taken (e.g., hit `dd` to delete a line, then move your cursor to another line and hit `.` to delete that line)
- folds - hide and show code for easier readability
- marks - set marks to easily jump between locations in a document
- `:!` - type `!` in `command-line` mode then any shell command to execute that command in the folder `vim` was launched from (e.g. `:!ls` to list the the files in the current folder)
- registers - yank and paste to multiple buffers, including the system buffer (to copy and paste between `vim` and other programs)

- Interactive tutorials
  - `vimtutor` - enter at the command line like you would to launch `vim`
  - [Interactive online `vim` tutorial](https://www.openvim.com/)
- Books
  - [`vim`book](<https://github.com/tpn/pdfs/blob/master/`vim`%20Book%20(vimbook-OPL).pdf>)
  - [Learn `vim`script the Hard Way](http://learnvimscriptthehardway.stevelosh.com/)
  - [Introduction · A Byte of `vim`](https://vim.swaroopch.com/)

## Acknowledgment

Thanks to [Sasha Weiss](asashaweiss.com) for his [excellent tutorial](https://gist.github.com/sashaweiss/d1b64e2cd0440159f00ba1f71625e76d) given last year that I borrowed from in writing this guide.

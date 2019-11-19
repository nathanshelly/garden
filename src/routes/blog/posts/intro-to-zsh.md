---
title: An intro to Zsh
date: 2019-11-18T18:30:00.000Z
---

An introduction to Zsh

<!-- more -->

An intro to `zsh`, a superset (mostly) of `bash` with modern bells and whistles. These include better tab-completion, more complex globbing support, a well-supported plugin system (to go with some [particularly](https://github.com/zsh-users/zsh-autosuggestions) [nice](https://github.com/zdharma/fast-syntax-highlighting) [plugins](https://github.com/romkatv/powerlevel10k)), and more!

## <a name="top"></a> Table of Contents

- [TL;DR](#tldr)
- [Full setup](#full-setup)
  - [Completion](#completion)
    - [`bash` comparison](#bash-comparison)
  - [Plugins](#plugins)
- [Appendix](#appendix)
  - [`ice` mods](#ice-mods)

## TL;DR

Run the following commands:

```bash
# replace with your package manager
brew install zsh
sudo sh -c "echo $(command -v zsh) >> /etc/shells"
chsh -s "$(command -v zsh)"
```

Open a new shell. You’re now using `zsh`!

If you don't have a `$HOME/.zshrc` file you'll see a setup wizard, definitely recommend running through it and setting up the basics.

To transfer your `bash` configuration over to `zsh` run the following (note: your configuration will likely transfer cleanly but it isn't guaranteed):

```bash
cat "$HOME/.bash_profile" >> "$HOME/.zshrc"
cat "$HOME/.bashrc" >> "$HOME/.zshrc"
```

Anything you’d add to `.bashrc` (or `.bash_profile`) add to `.zshrc` instead.

> [Here's](https://unix.stackexchange.com/a/71258) a description of the different `zsh` config files if you're interested.

If you want some other nice features like better completion, a context-aware prompt, easy autocompletion of your history, etc. then keep reading 🙂

## Full setup

This guide will help you set up `zsh` and add a couple useful plugins. In ~5 minutes you’ll have a modern, blazing fast `zsh` setup with a fancy contextual-aware (e.g. `git status` info, current executable version, running jobs indicators, etc.) prompt, history autosuggestion (so you can easily repeat past commands), and syntax highlighting (so that you can write correct commands confidently):

> The prompt you'll set up has a customization wizard that will quickly set you up with your perfect prompt if you prefer something different to mine
> ![](intro_to_zsh_hero.png)

Finally, here is a shameless plug for [my `zsh` configuration](https://github.com/nathanshelly/.files/tree/master/zsh). The README in that folder explains each file’s purpose which should help narrow down any that may be interesting to you.

With all that out of the way let’s get started!

Did you read the TL;DR above?

| No                  | Yes                     |
| ------------------- | ----------------------- |
| [Go read it](#tldr) | [Carry on](#completion) |

### Completion

Carrying on, if you’ve ran through the wizard and enabled completion then [skip ahead](#bash-comparison) to a quick side-by-side comparison with `bash`, otherwise keep reading.

Add the following lines to `$HOME/.zshrc` to enable completion:

```bash
autoload -Uz compinit
compinit
```

Now source it so your changes take effect - `source $HOME/.zshrc`. Great you’ve set up completions! The next section gives a (brief) comparison of `zsh` & `bash` completion.

#### `bash` comparison

Okay, let's walk through three (by no means comprehensive) examples of `zsh` tab completion vs `bash` tab completion:

```bash
ls -<TAB>
# bash does nothing
# zsh displays flags

git <TAB>
# bash displays all files in the directory
# zsh displays git subcommands (e.g. add, branch, commit, etc.)

git add <TAB>
# bash displays all files in the directory
# zsh displays only unstaged files

# additional note: repeatedly hitting Tab cycles through
# options in zsh, in bash it just redisplays all options
```

### Plugins

Plugins add functionality to `zsh`. There are many different plugin managers, I recommend [`zplugin`](https://github.com/zdharma/zplugin) which is by far the fastest (primarily due to its support for asynchronous loading) and most featureful plugin manager I’ve used as of the publishing of this post.

The tradeoff for this speed and packed feature set is it can be pretty complex to understand deeply. Thankfully we don’t need to dive too deep to use it to install a few plugins.

First let’s install it [following the instructions in the README](https://github.com/zdharma/zplugin#installation). I recommend using the automatic installation over the manual but either works fine.

> Personally I [added this installation step to my `.zshrc`](https://github.com/nathanshelly/.files/blob/a9755a33103422db8d89eedeb77479416947925c/zsh/plugins.zsh#L7-L11) so that it’s automatically installed by copying my `.zshrc` over to a new machine and opening a new `zsh` shell. Note: technically these lines are in a `plugins.zsh` file that is sourced by `.zshrc` for organizational purposes.

Installation should have resulted in the following lines being added to your `.zshrc`:

```bash
source "$HOME/.zplugin/bin/zplugin.zsh"
autoload -Uz _zplugin
(( ${+_comps} )) && _comps[zplugin]=_zplugin
```

Next let’s add a few plugins. There are far too many to list but here’s a few I like along with installation instructions.

- [romkatv/powerlevel10k](https://github.com/romkatv/powerlevel10k) - a context-aware prompt. Displays `git status`, executable versions, virtual environments, etc. Additionally has a convenient setup wizard for customizing the look exactly as you want it.
  - [Installation](https://github.com/romkatv/powerlevel10k#zplugin): add `zplugin light romkatv/powerlevel10k` to `$HOME/.zshrc`
- [zdharma/fast-syntax-highlighting](https://github.com/zdharma/fast-syntax-highlighting) - highlight your commands as you type them
  - [Installation](http://zdharma.org/zplugin/wiki/GALLERY/#plugins) (can’t link directly, search `fast-syntax-highlighting` on that page): add the following lines to `$HOME/.zshrc`:
    ```bash
    zplugin ice wait lucid atinit"ZPLGM[COMPINIT_OPTS]=-C; zpcompinit; zpcdreplay"
    zplugin light zdharma/fast-syntax-highlighting
    ```
- [zsh-users/zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions) - quickly execute or edit previous commands from history as you type
  - [Installation](http://zdharma.org/zplugin/wiki/GALLERY/#plugins) (can’t link directly, search `zsh-autosuggestions` on that page): add the following lines to `$HOME/.zshrc`
    ```bash
    zplugin ice wait lucid atload'!\_zsh_autosuggest_start'
    zplugin light zsh-users/zsh-autosuggestions
    ```
  - This plugin benefits from adding a few optional keyboard shortcuts, see the example comment at the end of the next code block

Here is what your `.zshrc` should look like at the end of this:

````bash
... # whatever configuration you have before your plugins

# initialization of `zplugin`
source "$HOME/.zplugin/bin/zplugin.zsh"
autoload -Uz _zplugin
(( ${+_comps} )) && _comps[zplugin]=_zplugin

# individual plugins

# quickly execute or edit previous commands from history as you type
# note: this MUST be loaded before `fast-syntax-highlighting` to avoid errors
# ref - search zsh-autosuggestions
# http://zdharma.org/zplugin/wiki/GALLERY/#plugins
zplugin ice wait lucid atload'!_zsh_autosuggest_start'
zplugin light zsh-users/zsh-autosuggestions

# ref - serach fast-syntax-highlighting
# http://zdharma.org/zplugin/wiki/GALLERY/#plugins
zplugin ice wait lucid atinit"ZPLGM[COMPINIT_OPTS]=-C; zpcompinit; zpcdreplay"
zplugin light zdharma/fast-syntax-highlighting

# prompt
# ref - https://github.com/romkatv/powerlevel10k#zplugin
zplugin ice depth=1
zplugin light romkatv/powerlevel10k

# the below ENTIRELY OPTIONAL keymappings make `zsh-autosuggestions` even more useful
# ref - https://github.com/zsh-users/zsh-autosuggestions#key-bindings
# Ctrl-e accepts until end of line (same as right arrow)
bindkey '^e' autosuggest-accept
# Ctrl-Space accepts until end of line and immediately executes
bindkey '^ ' autosuggest-execute
# Ctrl-w accepts next word
# I generally prefer the more narrow definition of a word used by `forward-vi-word`
# over the more permissive definition of `forward-word`
bindkey '^w' vi-forward-word
```

## Appendix

### `ice` modifiers

The installation instructions for `fast-syntax-highlighting` & `zsh-autosuggestions` both use a `zplugin` concept called [`ice` modifiers](https://github.com/zdharma/zplugin#ice-modifiers).

These modifiers can be kind of confusing. Basically they apply single-use modifiers to the next `zplugin` command.

> “mod” because they modify the next command and “ice” as a metaphor for single-use (melting away after the next command)

Here are the four used above:

- [`wait`](https://github.com/zdharma/zplugin#conditional-loading) - perform the next command asynchronously. This often benefits from an `atload` or `atinit` command so that the command takes effect once it has asynchronously loaded. The following three mods really only apply
  - [`atload`](https://github.com/zdharma/zplugin#command-execution-after-cloning-updating-or-loading) - run command after loading, within plugin's directory
  - [`atinit`](https://github.com/zdharma/zplugin#command-execution-after-cloning-updating-or-loading) - run given command after directory setup (cloning, checking it, etc.) of plugin/snippet but before loading
  - [`lucid`](https://github.com/zdharma/zplugin#plugin-output) - skip `Loaded <plugin-name>` message for asynchronously loaded plugins
- [`depth`](https://github.com/zdharma/zplugin#cloning-options) - limits how much git history of the project to load
````

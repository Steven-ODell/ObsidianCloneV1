# Intro

So here it is. The first attempt at my "clone of Obsidian". **I AM NOT USING AI CODING OR VIBE CODING.** I disabled copilot and I have refused to accept codeblocks from AI chats. I **DID** use it to generate the SVGs for the buttons. I **AM** and **WILL** be asking for new syntax or tools I don't know and check my work or if a bug escapes me I will ask. Back to the main point. The realization hit hard when I learned that "Obsidian" started as a editor/preview toggle and not a direct live editor/preview like it is currently. That allowed me to at least set the initial scope to get the project mostly functional and then build out the file stuff and surrounding features before heading into the codemirror implementation to get the live editing/parsing all with the proper alignment of caret and current markdown ending. (absolute nightmare) (if so desired you can read more detailed progress in my last project and how I got _here_ in my last .mdParserV2 project). Basically this my way of forcing myself to learn JS and just coding in general. Me being naive but determined set me up to jump into this clone project after making a bare minimum AST for Markdown. This gave me basically a *6-12* month project with real use case for myself alongside the teaching aspect.

# Scope

So just to state upfront I am starting this with 7 weeks of self taught coding experience. Started this project with **ZERO** electron experience and **ZERO** node.js experience. A lot of conceptual knowledge and you can read my comments throughout this project on how I understand IPC currently. This is all a learning process not a perfect sellable future project. The plan as of this moment is to get as close as I can to an "Obsidian clone" with my own twist. Something that can be useful in my everyday. It will be clear where I am cloning and then trying to add my own idea or maybe remove things I wouldn't use personally.

## What is built so far
- Parser AST is made and works on basic .md cases
- Preview toggle
- IPC file saving and reading
- "FileExplorer" openable files
- Vault config (just a path in a file now but will be settings input eventually)
- Folder Creation and ***"focus"*** nesting
- Proper folder nesting visually
- Upon load create the file-explorer not just upon file creation within session
- Folder SVG rotation up opening or closing
- Save folder state after new file/folder creation
- File title/name rework is now a separate bar like the old obsidian
- Resizable file explorer
- Mostly "state" based now with a few cleanup bits left

## List of features planned
- AI Autocomplete for notes(Copilot for notes)
- AI summary on right sidebar
- AI plug in Local or API key
- Doodler not as detailed as "excalidraw" but may be another 6 month project itself
- Git implementation for a repo and push and pull from it(possibly do a learning project for making a "gitcache" of last 3 saves and having those states and differences viewable)
- Note connections node visual like Obsidian
- Calendar button on the left side or a calendar always on right bar
- A Trie prefix file search to start then eventually Fuzzy Matching to learn more :)
- Make the parser closer to a 95% .md parser (except tables) not a 75% basically where it is now.
- Nesting lists in .md parser
- Profile/Settings menu
- Special tab view for file explorer(Hover over tabs they flip to show .md visual)
- Tabs to have work able to be returned to in background not only one file at a time

# State system pivot

(3/25/2026)
So I am pivoting to a main "state" so that the project is more of a reactive project while making it easier to know what to display. This is basically *needed* to add tabs and it makes it easier for other parts of the program to know of the state by just passing the state object as a variable instead of 10+ unique variables I have to track. For debugging it also makes it a but easier to just print the current state and see what isn't aligning. That could be the display or the information expected to be in the state and it makes it easier to just print the object and then view the current state of it and find what is misaligned. 
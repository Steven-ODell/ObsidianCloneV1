# Intro

So here it is. The first attempt at my "clone of Obsidian". I AM NOT USING AI CODING OR VIBE CODING. I disabled copilot and I have refused to accept codeblocks from AI. I WILL ask for new syntax or tools I don't know and check my work or if a bug escapes me I will ask but I am by no means using AI to write this. The realization hit hard when I learned that "Obsidian" started as a editor/preview toggle and not a direct live editor/preview like it is currently. That allowed me to at least set the initial scope to get the project mostly functional and then build out the file stuff and surrounding features before heading into the codemirror implementation to get the live editing/parsing all wit the proper alignment of caret and curren markdown (absolute nightmare) (if so desired you can read more detailed progress in my last project and how I got _here_ in my last .mdParserV2 project). Basically this my way of forcing myself to learn JS and just coding in general. Me being naive but determined set me up to jump into this clone project after making a bare minimum AST for Markdown. This gave me basically a 6-12 month project with real use case for myself alongside the teaching aspect.

# Scope

So just to state upfront I am starting this with 7 weeks of coding experience. Started this project with ZERO electron experience and ZERO node.js experience. A lot of conceptual knowledge and you can read my comments throughout this project on how I understand IPC currently. THis is all a learning process not a perfect sellable future project. The plan as of this moment is to get as close as I can to an "Obsidian clone" with my own twist. Something that can be useful in my everyday. It will be clear where I am cloning and then trying to add my own idea or maybe remove things I wouldn't use personally.

## What is built so far
- Parser AST is made and works on basic .md cases
- Preview toggle
- IPC file saving and reading
- "FileExplorer" openable files
- Vault config (just a path in a file now but will be settings input eventually)

## list of features planned
- AI Autocomplete for notes(Copilot for notes)
- AI summary on right sidebar
- AI plug in Local or API key
- Doodler not as detailed as "excalidraw" but may be another 6 month project itself
- Git implementation for a repo and push and pull from it
- Note connections node visual like Obsidian
- Calendar button on the left side or a calendar always on right bar
- A Trie prefix file search
- I will make the parser closer to a 95% .md parser not a 75% basically where it is now
- Nesting lists in .md parser
- Profile/Settings menu
- Special tab view for file explorer(Hover over tabs they flip to show .md visual)
- Tabs to have work able to be returned to in background not only one file at a time



import { renderer } from "./RendererV3.js";
import { inlineParser } from "./InlineParserV3.js";
import { createNewFileButton } from "../file_management/createFileButton.js";


const inputBox = document.getElementById("main-editor-text-area");
const outputDiv = document.getElementById("main-editor-div");
const previewButton = document.getElementById("toggle-preview");
const editorButton = document.getElementById("toggle-editor");
const newFileButton = document.getElementById("top-bar-new-file")
const fileExplorer =  document.getElementById("file-explorer")

let root = []

const startingItems = [
    { pattern: /^\#\#\#\s/,   type: "h3" },
    { pattern: /^\#\#\s/,    type: "h2" },
    { pattern: /^\#\s/,     type: "h1" },
    { pattern: /^\>\s/,     type: "blockquote" },
    { pattern: /^\-\s/ ,    type: "ul" },
    { pattern:/^\d+\.\s/, type: "ol"},
    { pattern:/^\-\-\-/, type: "hr"},
]

// Test Input area
inputBox.addEventListener('input', ()  => {
    const rootReadyForRender = blockParser(inputBox.value)
    outputDiv.innerHTML = renderer(rootReadyForRender)
})

const blockParser = (inputString) => {
    
    if (inputString === "") {root = []}

    let splitStringArray = inputString.split("\n"); //Break into the HTML blocks
    root.length = 0
    let currentObject = {}
    let nestLevel = 0 

    splitStringArray.forEach(block => {
        const matched = startingItems.find(patterns => { //Search for start pattern. If found return true and push value into object
            if (block.match(patterns.pattern)) {
                currentObject = {
                    type: patterns.type,
                    value: block.replace(patterns.pattern, ""),
                    nestLevel: 0,
                    children: []
                }
                root.push(currentObject)
                return true
            }
        })

        if (!matched) { // If header not found label it as a paragraph and add value and ship as object
            currentObject = {
            type: "p",
            value: block,
            nestLevel: 0,
            children: []
            } 
            root.push(currentObject)
        }
    })
    root  = inlineParser(root) // send root off to parse for inline items 
    console.log("Tree is:\n" + JSON.stringify(root, null, 2))
    return root // send tree back to be sent the renderer
}

previewButton.addEventListener('click', () => {
    inputBox.style.backgroundColor = 'transparent';
    inputBox.style.color = 'transparent';
    inputBox.style.zIndex = 0;
})

editorButton.addEventListener('click', () => {
    inputBox.style.backgroundColor = 'rgb(19, 19, 19)';
    inputBox.style.color = 'rgb(238, 238, 238)';
    inputBox.style.zIndex = 2;
})

newFileButton.addEventListener('click', async () => {
    const newFile = await window.api.saveFile(inputBox.value)
    if (!newFile) return
    inputBox.value = ""
    fileExplorer.append(createNewFileButton(newFile, inputBox))
})
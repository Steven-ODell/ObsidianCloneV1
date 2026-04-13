let currentState = {
    theme: 'classic-dark',
    vaultTree: [],
    activeTab: {fileType: '', fileTitle: '', filePath: '', fileContent: '' ,nodeLinks: []},
    openTabs: [],
    openFolders: [],
    activeFolder: "/home/saoii/linux-Obsidian-Vault/my-obsidian-vault",
    previewMode: false,
    sidePreviewMode: false,
    leftSidebarOpen: true,
    rightSidebarOpen: true,
    activePlugins: [/*NodeLinks, Calendar, GitCache*/],
}
export{currentState}

/*
let state = {
    theme: 'classic-dark',
    vaultDirectory: 'SetupPath config file',
    vaultTree: [], // Track the tree for button building and types and paths
    openTabs: [], // When a file in explorer is clicked check if it exists in here and if not then add it
    openFolders: [], // Kept to reopen on refresh or to keep them open to query
    activeFolder: 'Whatever you last clicked on file explorer if you make a new file/foler it goes there',
    activeTab: {fileType: 'added for later button making incase PNG', fileTitle: 'Becomes filename', filePath: 'made on click fromcreated from join active folde fileTitle.md', fileContent: 'Whatever is in the Codemirror textarea' , nodeLinks: []},
    previewMode: false, 
    sidePreviewMode: false,
    leftSidebarOpen: true,
    rightSidebarOpen: true,
    rightSidebarTools: [], // For later when I have things to add to the side like summary and calander i will add them here to render them
    activePlugins: [NodeLinks, Calendar, GitTree, AI Autocomplete],
}
*/

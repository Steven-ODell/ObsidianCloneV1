const inlineItems = [
    { pattern: "***", regex: /(?<!\*)\*\*\*(?!\*)/, type: "strongEm" },
    { pattern: "**", regex: /(?<!\*)\*\*(?!\*)/, type: "strong" },
    { pattern: "*", regex: /(?<!\*)\*(?!\*)/, type: "em" },
    { pattern: "~~", regex: /(?<!~)\~\~(?![~])/, type: "del" },
    { pattern: "~", regex: /(?<!~)~(?![~])/, type: "sub" },
    { pattern: "^", regex: /(?<!\^)\^(?!\^)/, type: "sup" },
    { pattern: "==", regex: /(?<!=)==(?!=)/, type: "mark" },
    { pattern: "`", regex: /(?<!`)[`](?!`)/, type: "code" }
]

/*const inlineItems = [
    { pattern: "***", type: "strongEm" },
    { pattern: "**", type: "strong" },
    { pattern: "*", type: "em" },

@@ -7,39 +18,47 @@ const inlineItems = [
    { pattern: "^", type: "sup" },
    { pattern: "==", type: "mark" },
    { pattern: "`", type: "code" }
]
]*/

//TODO This entire function

const inlineParser = (inputRoot) => {
  /*Goal here is to take a chunk of text and find its parent wrapper. As in when you type "*" you will find all 
  that and wrap it in a label that says what type it is and then parse it again for any more sybols within it.
  if it has any sybols within it do the same for those symbols. Recurssion. */

  //inputRoot is an array of Header siblings all with the content they hold which contains all 
  //including the patters but it will possibly be from recurssion so sating from header is incorrect
  //Difficult part will be getting the recursion to happen on an array unless i make a a smaller one which just takes in remaining
  //but then it wont know pattern types. but then i also need ther to be the abiity to make full patterns. i may be able to referenece
  //the past branch and reuse most and rethink the recursion and how that effects the array going in or how im processing the incoming data.
  //The problem is i need to be passing in a string. i also need to be walking each character. checking the next and last. i may even just
  //call it at ** and ~~ and realisitically and i am never going to use *** so i can maybe just do a look one ahead parser for the patterns.
  //i think that is a good comproise and may actually not be as hard to add another one token ahead if i make this correctly. 
  //lets start
  //
  // 1 i have to take the root which is an arrey
  // 2 Take that line find first pattern then add suffix to inlineText
  // 3 take remaining string walk through it checking each. if you find something equal to you then check next character
  // 4 if that character is the same then s
    return inputRoot
}

export { inlineParser }

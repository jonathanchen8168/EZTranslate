// Background script that gets selected word from content.js and creates a popup of selected word translation link to jisho.org after user action

// Creates console log to make sure background.js script is running
console.log("Background running nice!");

// Gets data from content.js
chrome.runtime.onMessage.addListener(receiver);

// Declares empty string variable
window.word ="";

// Gets data from content.js and stores highlighted text to variable
function receiver(request, sender, sendResponse) {

    // // Checks if request is highlightword
    if (request.highlightword){ 

        // Displays highlighted word in console
        console.log(request.highlightword.text);

        // Stores highlightword in window.word
        window.word = request.highlightword.text;
    }
}

// Creates popup with link and variable
function popupCreate(){
    
    // Declares url variable with selected word
    var newURL = "http://jisho.org/search/" + window.word;

    // Creates a new popup window with translation url link
    chrome.windows.create({ url: newURL, type: "popup"});

    // Display word when popup is run
    console.log(window.word);
}

// Creates popup window when extension icon is clicked
chrome.browserAction.onClicked.addListener(function(tabs) {

    // Checks to make sure the selected string is not empty before creating a popup to search the word
    if (window.word != ""){

        // Creates a popup and searches word 
        popupCreate();
    }
  });

// Declares context menu item with an id, display title, and when it is activated
var contextMenuItem = {
    "id": "eztranslate",
    "title": "EZtranslate!",
    "contexts": ["selection"]
};

// Creates context menu item
chrome.contextMenus.create(contextMenuItem);

// Creates popup window when context menu item is clicked
chrome.contextMenus.onClicked.addListener(function(info, tabs) {    
    if (tabs){

        // Checks to make sure menu item id "eztranslate" is selected before creating popup to search the word
        if (info.menuItemId === "eztranslate"){

            // Creates a popup and searches word 
            popupCreate();
        }
    }
});

// Program to enable taking highlighted text and store/send to background.js

// Displays that content.js script is running in console
console.log("Chrome extension goooo");


// Adds a listener for when mouse button is released and executes wordSelected
window.addEventListener('mouseup', wordSelected);

// Function to get selected text and convert to string
function wordSelected() {

    // Takes what the user selects then converts it to a string and stores it in a variable
    let selectedText = window.getSelection().toString();

    // Displays selected text in page console
    console.log(selectedText);

        // Stores selected text as variable
        let message = {
            text: selectedText
        };

        // Sends message to allow communication between scripts - added highlightword id
        chrome.runtime.sendMessage({highlightword: message});
};
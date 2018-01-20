### Extension Streams
This package is a wrapper around the following communicators:
 
* `chrome.runtime.sendMessage`
* `chrome.runtime.onMessage.addListener`
* `document.dispatchEvent`
* `document.addEventListener`

It's purpose is to strengthen the security for extensions between the web page and the extension as well as to ease development inside of
the extension when communicating between the popup script and the background script.


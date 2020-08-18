chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request == "getScreenType") {
            screenType = document.getElementById('screenType').value;
            sendResponse({ "sources": [screenType] });
        }
    }
);
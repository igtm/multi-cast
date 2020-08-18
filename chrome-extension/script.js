
// Listens for external messages coming from pages that match url pattern defined in manifest.json
chrome.runtime.onMessageExternal.addListener(
    function(request, sender, sendResponse) {
        console.log("Got request", request, sender);
        let screenType;
        if(request.getVersion) {
            sendResponse({ version: chrome.runtime.getManifest().version});
            return false; // Dispose of sendResponse
        } else if(request.screenType) {
            screenType = request.screenType;
            return false; // Dispose of sendResponse
        } else if(request.getStream) {
            // タブを取得する
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, "getScreenType", function (response) {
                    chrome.desktopCapture.chooseDesktopMedia(
                        response["sources"] || ['screen', 'window'], sender.tab,
                        function(streamId) {
                            sendResponse({ streamId: streamId});
                        }
                    );
                });
            });
            return true
        } else {
            console.error("Unknown request");
            sendResponse({ error : "Unknown request" });
            return false;
        }
    }
);

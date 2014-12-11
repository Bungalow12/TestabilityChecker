var testabilityChecker: TestabilityChecker;

//Message Handler
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action == "checkTestability") {
            //objectExtractor = new ObjectExtractor();
            //objectExtractor.Extract();
            //sendResponse({ PageContent: objectExtractor.PageContent });
        }
    });
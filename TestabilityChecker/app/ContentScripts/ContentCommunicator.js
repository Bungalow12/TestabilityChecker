var testabilityChecker;
//Message Handler
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action == "checkTestability") {
        testabilityChecker = new TestabilityChecker();
        testabilityChecker.checkTestability();
        sendResponse({ results: testabilityChecker.results });
    }
});
//# sourceMappingURL=ContentCommunicator.js.map
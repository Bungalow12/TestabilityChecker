var testabilityChecker;
//Message Handler
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action == "checkTestability") {
        testabilityChecker = new TestabilityChecker();
        testabilityChecker.checkTestability();
        testabilityChecker.highlightIssues();
        var score = testabilityChecker.score;
        var results = testabilityChecker.results;
        sendResponse({ results: results, score: score });
    }
});
//# sourceMappingURL=ContentCommunicator.js.map
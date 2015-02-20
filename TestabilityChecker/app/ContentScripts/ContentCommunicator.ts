/// <reference path = "TestabilityChecker.ts" />
/// <reference path = "../../scripts/typings/chrome/chrome.d.ts" />

var testabilityChecker: TestabilityChecker;

//Message Handler
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action == "checkTestability") {
            testabilityChecker = new TestabilityChecker();
            testabilityChecker.checkTestability();
            testabilityChecker.highlightIssues();
            var score: number = testabilityChecker.score;
            var results = testabilityChecker.results;
            sendResponse({ results: results, score: score });
        }
    });

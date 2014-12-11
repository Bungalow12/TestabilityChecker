// When the popup is ready request the testability check.
$(document).ready(function () {    
    //Request Testability data for the page.
    var testabilityResults: TestabilityResult[] = [];
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "checkTestability" }, function (response) {
            testabilityResults = response.results;
        });
    });
}); 
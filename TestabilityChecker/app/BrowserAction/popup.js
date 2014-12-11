//Request Testability data for the page.
function setup() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "checkTestability" }, function (response) {
            var results = response.results;
            var score = response.score;
            displayScore(score);
            for (var i = 0; i < results.length; ++i) {
                addResultToTable(results[i]);
            }
        });
    });
}
// Run our setup as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
    setup();
});
function displayScore(score) {
    var scoreElement = document.getElementById("score");
    if (score >= 75) {
        scoreElement.setAttribute("style", "color:#009900");
    }
    else if (score >= 50) {
        scoreElement.setAttribute("style", "color:#FFD119");
    }
    else {
        scoreElement.setAttribute("style", "color:#990000");
    }
    scoreElement.textContent = score.toString() + "%";
}
function addResultToTable(result) {
    //Get a reference to our table.
    var resultTable = document.getElementById("results");
    //Create a new row
    var row = resultTable.insertRow(resultTable.rows.length);
    //Element cell
    var cell1 = row.insertCell(0);
    var element = document.createTextNode(result.elementHtml.split('>')[0]);
    cell1.appendChild(element);
    //Suggestion cell
    var cell2 = row.insertCell(1);
    var suggestion = document.createTextNode(result.message);
    cell2.appendChild(suggestion);
}
//# sourceMappingURL=popup.js.map
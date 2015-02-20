/// <reference path="../Utilities/TestabilityResult.ts" />
/// <reference path="../../scripts/typings/chrome/chrome.d.ts" />

//Request Testability data for the page.
function setup() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "checkTestability" }, function (response) {
            var results: SerializableResult[] = response.results;
            var score = Math.round(response.score);

            displayScore(score);

            for (var i: number = 0; i < results.length; ++i) {
                addResultToTable(results[i]);
            }
        });
    });
}

// Run our setup as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
    setup();
});

function displayScore(score: number) {
    var scoreElement:HTMLLabelElement = <HTMLLabelElement>document.getElementById("score");

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

function addResultToTable(result: SerializableResult) {
    //Get a reference to our table.
    var resultTable: HTMLTableElement = <HTMLTableElement>document.getElementById("results");

    //Create a new row
    var row: HTMLTableRowElement = <HTMLTableRowElement>resultTable.insertRow(resultTable.rows.length);
    if (resultTable.rows.length % 2 == 0) {
        row.setAttribute("style", row.getAttribute("style") + "; background: #EAEAEA;");
    }

    //Element cell
    var cell1: HTMLTableCellElement = <HTMLTableCellElement>row.insertCell(0);
    var element: Text = document.createTextNode(result.elementHtml.split('>')[0] + '>');
    cell1.appendChild(element);
}
/// <reference path = "../Utilities/TestabilityResult.ts" />
/// <reference path = "../Utilities/TestabilityRules.ts" />

/** Class responsible for performing the check on the content.
 */
class TestabilityChecker {
    private _results: TestabilityResult[];

    /** Initializes the Testability Checker.
     */
    public constructor() {
        this._results = [];
    }

    /** Gets the results collected in execution of the checker.
     */
    public get results(): SerializableResult[]{
        var serializable: SerializableResult[] = [];

        for (var i: number = 0; i < this._results.length; ++i) {
            serializable[i] = { elementHtml: this._results[i].element.outerHTML, message: this._results[i].message };
        }
        return serializable;
    }

    /** Gets a testability score out of 100%.
     */
    public get score(): number {
        if (TestabilityRules.searchedElements == 0) {
            return -1;
        }
        return 100 - ((this._results.length / TestabilityRules.searchedElements) * 100);
    }

    /** Executes the Testability rules.
     */
    public checkTestability() {
        TestabilityRules.searchedElements = 0;
        for (var i: number = 0; i < TestabilityRules.rules.length; ++i) {
            this._results = this._results.concat(TestabilityRules.rules[i](document.body));
        }
    }

    /** Highlights all issues on the page.
     */
    public highlightIssues() {
        //TODO: Add a red border to each element in the results list.
        for (var i: number = 0; i < this._results.length; ++i) {
            var element: HTMLElement = this._results[i].element;

            var curStyle: string = element.getAttribute("style");
            if (curStyle === null) {
                curStyle = "";
            }

            element.setAttribute("style", curStyle + " border-style: ridge; border-color:#990000;");
        }
    }
}

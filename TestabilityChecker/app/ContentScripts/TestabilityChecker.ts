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
    public get results(): TestabilityResult[] {
        return this._results;
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
    }
}

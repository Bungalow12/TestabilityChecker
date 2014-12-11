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

    /** Executes the Testability rules.
     */
    public checkTestability() {
        for (var i: number = 0; i < TestabilityRules.rules.length; ++i) {
            this._results.concat(TestabilityRules.rules[i](document.body));
        }
    }
}

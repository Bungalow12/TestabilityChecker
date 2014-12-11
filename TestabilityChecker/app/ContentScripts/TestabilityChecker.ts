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
}

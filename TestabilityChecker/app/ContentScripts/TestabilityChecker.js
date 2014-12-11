/** Class responsible for performing the check on the content.
 */
var TestabilityChecker = (function () {
    /** Initializes the Testability Checker.
     */
    function TestabilityChecker() {
        this._results = [];
    }
    Object.defineProperty(TestabilityChecker.prototype, "results", {
        /** Gets the results collected in execution of the checker.
         */
        get: function () {
            return this._results;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TestabilityChecker.prototype, "score", {
        /** Gets a testability score out of 100%.
         */
        get: function () {
            if (TestabilityRules.searchedElements == 0) {
                return -1;
            }
            return 100 - ((this._results.length / TestabilityRules.searchedElements) * 100);
        },
        enumerable: true,
        configurable: true
    });
    /** Executes the Testability rules.
     */
    TestabilityChecker.prototype.checkTestability = function () {
        TestabilityRules.searchedElements = 0;
        for (var i = 0; i < TestabilityRules.rules.length; ++i) {
            this._results = this._results.concat(TestabilityRules.rules[i](document.body));
        }
    };
    /** Highlights all issues on the page.
     */
    TestabilityChecker.prototype.highlightIssues = function () {
        //TODO: Add a red border to each element in the results list.
    };
    return TestabilityChecker;
})();
//# sourceMappingURL=TestabilityChecker.js.map
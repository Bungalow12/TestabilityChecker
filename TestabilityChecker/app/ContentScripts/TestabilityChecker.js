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
    /** Executes the Testability rules.
     */
    TestabilityChecker.prototype.checkTestability = function () {
        for (var i = 0; i < TestabilityRules.rules.length; ++i) {
            this._results.concat(TestabilityRules.rules[i](document.body));
        }
    };
    return TestabilityChecker;
})();
//# sourceMappingURL=TestabilityChecker.js.map
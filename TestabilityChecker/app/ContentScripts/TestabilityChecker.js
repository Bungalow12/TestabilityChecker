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
    return TestabilityChecker;
})();
//# sourceMappingURL=TestabilityChecker.js.map
/** Static class containing rule implementation
 */
var TestabilityRules = (function () {
    function TestabilityRules() {
    }
    /** Checks specfic element types for an uniquely identifiable attribute.
     * @param rootElement The root HTMLElement to search from.
     * @return An array of testability results for this rule.
     */
    TestabilityRules.hasIdCheck = function (rootElement) {
        var results = [];
        var index = 0;
        //TODO: Make less basic.
        //Crawl the tree for specific elements
        //Input fields
        var elements = TestabilityRules.combineCollections([], document.getElementsByTagName("input"));
        //Hyperlinks
        elements = TestabilityRules.combineCollections(elements, document.getElementsByTagName("a"));
        //Buttons
        elements = TestabilityRules.combineCollections(elements, document.getElementsByTagName("button"));
        //Tables
        elements = TestabilityRules.combineCollections(elements, document.getElementsByTagName("table"));
        //TODO: Add in a way to check elements that do not contain static text.
        //Process the elements.
        TestabilityRules.searchedElements = elements.length;
        for (var i = 0; i < elements.length; ++i) {
            var element = elements[i];
            var html = element.outerHTML;
            var hasId = elements[i].getAttribute("id") !== null || elements[i].parentElement.getAttribute("id") !== null;
            if (!hasId) {
                results[index++] = { elementHtml: html, message: "Consider adding a unique id attribute." };
            }
        }
        return results;
    };
    TestabilityRules.combineCollections = function (collection1, collection2) {
        var start = collection1.length;
        for (var i = 0; i < collection2.length; ++i) {
            collection1[i + start] = collection2[i];
        }
        return collection1;
    };
    TestabilityRules.rules = [TestabilityRules.hasIdCheck];
    TestabilityRules.searchedElements = 0;
    return TestabilityRules;
})();
//# sourceMappingURL=TestabilityRules.js.map
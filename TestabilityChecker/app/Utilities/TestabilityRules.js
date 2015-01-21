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
            var hasId = elements[i].getAttribute("id") !== null || elements[i].parentElement.getAttribute("id") !== null;
            var isHidden = elements[i].getAttribute("hidden") !== null || elements[i].parentElement.getAttribute("hidden") !== null || elements[i].getAttribute("type") == "hidden" || elements[i].parentElement.getAttribute("type") == "hidden";
            var hasFullHref = elements[i].getAttribute("href") !== null && elements[i].getAttribute("href").indexOf("http") == 0;
            var hasUniqueClassName = TestabilityRules.isUniqueClassName(elements[i].classList) || TestabilityRules.isUniqueClassName(elements[i].parentElement.classList);
            if (!hasId && !isHidden && !hasUniqueClassName && !hasFullHref) {
                results[index++] = { element: element, message: "Consider adding a unique id attribute." };
            }
        }
        return results;
    };
    /** Checks elements for click handlers as those likely should be accessible to automation.
     * @param rootElement The root HTMLElement to search from.
     * @return An array of testability results for this rule.
     */
    TestabilityRules.hasClickHandler = function (rootElement) {
        var results = [];
        var index = 0;
        var elements = [];
        elements = TestabilityRules.walkDom(rootElement);
        for (var i = 0; i < elements.length; ++i) {
            var element = elements[i];
            var hasId = elements[i].getAttribute("id") !== null || elements[i].parentElement.getAttribute("id") !== null;
            var hasHandler = elements[i].onclick !== null;
            var hasUniqueClassName = TestabilityRules.isUniqueClassName(elements[i].classList) || TestabilityRules.isUniqueClassName(elements[i].parentElement.classList);
            if (!hasId && !hasUniqueClassName && hasHandler) {
                results[index++] = { element: element, message: "Consider adding a unique id attribute." };
            }
        }
        return results;
    };
    /** Checks a class name collection for duplicate combinations.
     * @param classNames a collection of class names from element.classList.
     * @return True if the class name combination is unique and is not too long.
    */
    TestabilityRules.isUniqueClassName = function (classNames) {
        var selector = "";
        var result = false;
        if (classNames.length > 2) {
            return false;
        }
        for (var i = 0; i < classNames.length; ++i) {
            if (classNames[i] != "") {
                selector += "." + classNames[i];
            }
        }
        try {
            result = (document.querySelectorAll(selector).length != 1);
        }
        catch (e) {
            result = false;
        }
        return result;
    };
    /** Walks the entire DOM from the specified root.
     * @param rootElement The root HTMLElement to search from.
     * @return An array of elements in the DOM.
     */
    TestabilityRules.walkDom = function (rootElement) {
        var elements = [];
        elements = TestabilityRules.combineCollections(elements, rootElement.children);
        for (var i = 0; i < rootElement.children.length; ++i) {
            elements = elements.concat(TestabilityRules.walkDom(rootElement.children.item(i)));
        }
        return elements;
    };
    /** Combines an array with what turns out to be an HTMLElementCollection. This prevents awkward results from array.concat.
     * @param collection1 The array that the items will move into.
     * @param collection2 The HTMLElementCollection.
     * @return The combined data in an array of HTMLElements.
     */
    TestabilityRules.combineCollections = function (collection1, collection2) {
        var start = collection1.length;
        for (var i = 0; i < collection2.length; ++i) {
            collection1[i + start] = collection2[i];
        }
        return collection1;
    };
    TestabilityRules.rules = [TestabilityRules.hasIdCheck, TestabilityRules.hasClickHandler];
    TestabilityRules.searchedElements = 0;
    return TestabilityRules;
})();
//# sourceMappingURL=TestabilityRules.js.map
/// <reference path="TestabilityResult.ts"/>

/** Static class containing rule implementation
 */
class TestabilityRules {

    public static rules: { (rootElement: HTMLElement): TestabilityResult[] }[] =
        [TestabilityRules.hasIdCheck, TestabilityRules.hasClickHandler, TestabilityRules.hasCorrectCssName];
    public static searchedElements: number = 0;

    /** Checks specfic element types for an uniquely identifiable attribute.
     * @param rootElement The root HTMLElement to search from.
     * @return An array of testability results for this rule.
     */
    public static hasIdCheck(rootElement: HTMLElement): TestabilityResult[] {
        var results: TestabilityResult[] = [];
        var index: number = 0;

        //TODO: Make less basic.
        //Crawl the tree for specific elements

        //Input fields
        var elements: HTMLElement[] = TestabilityRules.combineCollections([],
            <HTMLElement[]><any>document.getElementsByTagName("input"));

        //Hyperlinks
        elements = TestabilityRules.combineCollections(elements,
            <HTMLElement[]><any>document.getElementsByTagName("a"));

        //Buttons
        elements = TestabilityRules.combineCollections(elements,
            <HTMLElement[]><any>document.getElementsByTagName("button"));

        //Tables
        elements = TestabilityRules.combineCollections(elements,
            <HTMLElement[]><any>document.getElementsByTagName("table"));

        //TODO: Add in a way to check elements that do not contain static text.

        //Process the elements.
        TestabilityRules.searchedElements = elements.length;

        for (var i: number = 0; i < elements.length; ++i) {
            var element: HTMLElement = elements[i];
            var hasId: boolean = elements[i].getAttribute("id") !== null ||
                elements[i].parentElement.getAttribute("id") !== null;
            var isHidden: boolean = elements[i].getAttribute("hidden") !== null ||
                elements[i].parentElement.getAttribute("hidden") !== null ||
                elements[i].getAttribute("type") == "hidden" ||
                elements[i].parentElement.getAttribute("type") == "hidden";
            var hasFullHref: boolean = elements[i].getAttribute("href") !== null &&
                elements[i].getAttribute("href").indexOf("http") == 0;
            var hasUniqueClassName = TestabilityRules.isUniqueClassName(elements[i].classList) ||
                TestabilityRules.isUniqueClassName(elements[i].parentElement.classList);

            if (!(hasId || hasUniqueClassName) && !isHidden && !hasFullHref) {
                results[index++] = { element: element, message: "Consider adding a unique id attribute." };
            }
        }
        return results;
    }

    /** Checks elements for click handlers as those likely should be accessible to automation.
     * @param rootElement The root HTMLElement to search from.
     * @return An array of testability results for this rule.
     */
    public static hasClickHandler(rootElement: HTMLElement): TestabilityResult[] {
        var results: TestabilityResult[] = [];
        var index: number = 0;
        var elements: HTMLElement[] = [];

        elements = TestabilityRules.walkDom(rootElement);

        //Process the elements.
        for (var i: number = 0; i < elements.length; ++i) {
            var element: HTMLElement = elements[i];
            var hasId: boolean = elements[i].getAttribute("id") !== null ||
                elements[i].parentElement.getAttribute("id") !== null;
            var hasHandler: boolean = elements[i].onclick !== null;
            var hasUniqueClassName = TestabilityRules.isUniqueClassName(elements[i].classList) ||
                TestabilityRules.isUniqueClassName(elements[i].parentElement.classList);

            if (!(hasId || hasUniqueClassName) && hasHandler) {
                results[index++] = { element: element, message: "Consider adding a unique id attribute." };
            }
        }
        return results;
    }

    /** Checks elements for class names that contain an underscore when they should use a dash.
     * @param rootElement The root HTMLElement to search from.
     * @return An array of testability results for this rule.
     */
    public static hasCorrectCssName(rootElement: HTMLElement): TestabilityResult[] {
        var results: TestabilityResult[] = [];
        var index: number = 0;
        var elements: HTMLElement[] = [];

        elements = TestabilityRules.walkDom(rootElement);

        //Process the elements.
        for (var i: number = 0; i < elements.length; ++i) {
            var element: HTMLElement = elements[i];

            if (element.classList.contains("_")){
                results[index++] = { element: element, message: "Use a dash('-') instead of an underscore('_')" };
            }
        }
        return results;
    }

    /** Checks a class name collection for duplicate combinations.
     * @param classNames a collection of class names from element.classList.
     * @return True if the class name combination is unique and is not too long.
    */
    private static isUniqueClassName(classNames: DOMTokenList): boolean {
        var selector: string = "";
        var result: boolean = false;

        if (classNames.length > 2) {
            return false;
        }

        for (var i: number = 0; i < classNames.length; ++i) {
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
    }

    /** Walks the entire DOM from the specified root.
     * @param rootElement The root HTMLElement to search from.
     * @return An array of elements in the DOM.
     */
    private static walkDom(rootElement: HTMLElement): HTMLElement[] {
        var elements: HTMLElement[] = [];
        elements = TestabilityRules.combineCollections(elements, <HTMLElement[]><any>rootElement.children);

        for (var i: number = 0; i < rootElement.children.length; ++i) {
            elements = elements.concat(TestabilityRules.walkDom(<HTMLElement>rootElement.children.item(i)));
        }

        return elements;
    }

    /** Combines an array with what turns out to be an HTMLElementCollection.
     * This prevents awkward results from array.concat.
     * @param collection1 The array that the items will move into.
     * @param collection2 The HTMLElementCollection.
     * @return The combined data in an array of HTMLElements.
     */
    private static combineCollections(collection1: HTMLElement[], collection2: HTMLElement[]): HTMLElement[] {
        var start: number = collection1.length;

        for (var i: number = 0; i < collection2.length; ++i) {
            collection1[i + start] = collection2[i];
        }

        return collection1;
    }
}
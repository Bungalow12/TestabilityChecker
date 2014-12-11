/** Static class containing rule implementation
 */
class TestabilityRules {

    public static rules: { (rootElement: HTMLElement): TestabilityResult[] }[] = [TestabilityRules.hasIdCheck];
    public static searchedElements: number = 0;

    /** Checks specfic element types for an uniquely identifiable attribute.
     * @param rootElement The root HTMLElement to search from.
     * @return An array of testability results for this rule.
     */
    public static hasIdCheck(rootElement: HTMLElement): TestabilityResult[]{
        var results: TestabilityResult[] = [];
        var index: number = 0;

        //TODO: Make less basic.
        //Crawl the tree for specific elements

        //Input fields
        var elements: HTMLElement[] = TestabilityRules.combineCollections([], <HTMLElement[]><any>document.getElementsByTagName("input"));

        //Hyperlinks
        elements = TestabilityRules.combineCollections(elements, <HTMLElement[]><any>document.getElementsByTagName("a"));

        //Buttons
        elements = TestabilityRules.combineCollections(elements, <HTMLElement[]><any>document.getElementsByTagName("button"));

        //Tables
        elements = TestabilityRules.combineCollections(elements, <HTMLElement[]><any>document.getElementsByTagName("table"));

        //TODO: Add in a way to check elements that do not contain static text.

        //Process the elements.
        TestabilityRules.searchedElements = elements.length;

        for (var i: number = 0; i < elements.length; ++i) {
            var element: HTMLElement = elements[i];
            var html = element.outerHTML;
            var hasId: boolean = elements[i].getAttribute("id") !== null || elements[i].parentElement.getAttribute("id") !== null;

            if (!hasId) {
                results[index++] = { elementHtml: html, message: "Consider adding a unique id attribute." };
            }
        }
        return results;
    }

    private static combineCollections(collection1: HTMLElement[], collection2: HTMLElement[]): HTMLElement[]{
        var start: number = collection1.length;

        for (var i: number = 0; i < collection2.length; ++i) {
            collection1[i + start] = collection2[i];
        }

        return collection1;
    }
}
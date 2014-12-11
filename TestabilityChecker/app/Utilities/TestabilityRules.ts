/** Static class containing rule implementation
 */
class TestabilityRules {

    public static rules: { (rootElement: HTMLElement): TestabilityResult[] }[] = [TestabilityRules.hasIdCheck];

    /** Checks specfic element types for an uniquely identifiable attribute.
     * @param rootElement The root HTMLElement to search from.
     * @return An array of testability results for this rule.
     */
    public static hasIdCheck(rootElement: HTMLElement): TestabilityResult[] {
        return null;
    }
}
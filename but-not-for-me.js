// @ts-check

/** @type {(elements: HTMLCollection, callback: (el: Element) => boolean) => Element | null} */
const findInHtmlCollection = (elements, callback) => {
    for (const element of elements) {
        if (callback(element)) return element;
    }
    return null;
}

const main = () => {
    // 1. Identify the closest ancestor to the "Following" and "For you" tabs.
    /* "A document mustn't have more than one <main> element
     * that doesn't have the hidden attribute specified."
     * - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main 
     */
    const mainEl = findInHtmlCollection(document.getElementsByTagName("main"), el => el.getAttribute("hidden") === null);
    if (!mainEl) {
        console.error("Couldn't find main element");
        return;
    }
    // wheeeeeeeeee
    const closestAncestorToTabs = mainEl.firstElementChild?.firstElementChild?.firstElementChild?.firstElementChild?.firstElementChild;
    if (!closestAncestorToTabs) {
        console.error("Couldn't find closest ancestor to for you and following tabs");
        return;
    }
    // 2. Identify the clickable "Following" element
    // the Ancestor has four children. The third is the Following tab
    const followingTabAnchor = /** @type {HTMLElement | null} */ (closestAncestorToTabs.children.item(2)?.firstElementChild);
    // 3. If the "For you" tab is selected, click on "Following"
    // (on redirect, this will probably re-run the entire script)
    if (window.location.href.includes("stuff_for_you")) {
        followingTabAnchor?.click();
    }
    // 4. Remove "For you" from the DOM
    const forYouContainer = closestAncestorToTabs.childNodes.item(3);
    closestAncestorToTabs.removeChild(forYouContainer);
}

main();
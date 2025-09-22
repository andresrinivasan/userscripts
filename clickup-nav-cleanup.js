// ==UserScript==
// @name         Clickup Nav Cleanup
// @version      1.0.3
// @description  Remove parts of the nav bar that I don't care about
// @author       andresrinivasan
// @license      Unlicense
// @match        https://app.clickup.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=app.clickup.com
// @require      https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2
// @downloadURL  https://github.com/andresrinivasan/userscripts/raw/main/clickup-nav-cleanup.js
// @supportURL   https://github.com/andresrinivasan/userscripts/issues
// ==/UserScript==

VM.observe(document.body, () => {
    const selectors = [
        "cu-manager > div.cu-manager2__container.ng-tns-c2866496296-4.ng-star-inserted.cu-manager2__container_v3.layout-size_compact > div > div > cu-simple-bar > div > div > div.cdk-virtual-scrollable.ng-tns-c2032951352-6.cu-simple-bar__body > div:nth-child(3)",
        "cu-manager > div.cu-manager2__container.ng-tns-c2866496296-4.ng-star-inserted.cu-manager2__container_v3.layout-size_compact > div > div > cu-simple-bar > div > div > div.cdk-virtual-scrollable.ng-tns-c2032951352-6.cu-simple-bar__body > div.ng-tns-c2032951352-6.cu-simple-bar__item-container.cu-simple-bar__item-container_home.ng-star-inserted",
        "cu-manager > div.cu-manager2__container.ng-tns-c2866496296-4.ng-star-inserted.cu-manager2__container_v3.layout-size_compact > div > div > cu-simple-bar > div > div > div.cdk-virtual-scrollable.ng-tns-c2032951352-6.cu-simple-bar__body > div.ng-tns-c2032951352-6.cu-simple-bar__item-container.ng-star-inserted",
        "cu-manager > div.cu-manager2__container.ng-tns-c2866496296-4.ng-star-inserted.cu-manager2__container_v3.layout-size_compact > div > div > cu-simple-bar > div > div > div.cdk-virtual-scrollable.ng-tns-c2032951352-6.cu-simple-bar__body > cu-sidebar-favorites"
    ];

    for (const s of selectors) {
        try {
            let e = document.querySelector(s);
            if (e) {
                e.remove();
            }
        } catch (e) {
            return false;
        }
    }

    return true;
});

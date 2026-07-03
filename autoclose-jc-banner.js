// ==UserScript==
// @name         Auto-Close JC Banner
// @namespace    http://violentmonkey.github.io/
// @version      1.2
// @description  Automatically close the JC banner on page load (shadow DOM aware)
// @author       André Srinivasan <andre.srinivasan@gmail.com>
// @match        *://*/*
// @grant        unsafeWindow
// @downloadURL  https://raw.githubusercontent.com/andresrinivasan/userscripts/master/autoclose-jc-banner.js
// @supportURL   https://github.com/andresrinivasan/userscripts/issues
// ==/UserScript==

(function() {
    'use strict';

    // Function to search for elements inside shadow DOM
    function findInShadowDOM(selector) {
        const allElements = document.querySelectorAll('*');
        
        for (let el of allElements) {
            // Check if element has a shadow root
            if (el.shadowRoot) {
                const found = el.shadowRoot.querySelector(selector);
                if (found) return found;
            }
        }
        return null;
    }

    // Function to click the close button
    function closeBanner() {
        // Try regular DOM first
        let closeButton = document.querySelector('button#restriction-close-button');
        
        // If not found, search in shadow DOM
        if (!closeButton) {
            closeButton = findInShadowDOM('button#restriction-close-button');
        }
        
        if (closeButton) {
            closeButton.click();
            console.log('Banner closed');
            return true;
        }
        
        return false;
    }

    // // Try immediately on page load
    // setTimeout(closeBanner, 500);

    // // Also try at 1 second
    // setTimeout(closeBanner, 1000);

    // Also observe for dynamically added elements
    VM.observe(document.body, () => {
        if (closeBanner()) {
            return true;
        }
        return false;
    });
})();

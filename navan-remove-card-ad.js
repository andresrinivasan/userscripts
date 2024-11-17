// ==UserScript==
// @name        Remove Navan Card Ads
// @description Don't show Navan ads for their card
// @version     0.0.7
// @license     The Unlicense
// @author      André Srinivasan
// @website     https://github.com/andresrinivasan/userscripts
// @supportURL  https://github.com/andresrinivasan/userscripts/issues
// @downloadURL	https://github.com/andresrinivasan/userscripts/raw/main/navan-remove-card-ad.js
// @match       *://app.navan.com/*
// @require     https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2
// ==/UserScript==

VM.observe(document.body, () => {
    // Remove Navan Card CTA across the top of the page
    const n1 = document.querySelector(".order-card-cta-left-container");
    if (n1) {
      document.querySelector(".secondary").click()
    }
  
    // Remove Navan Card CTA on the right nav
    const containerCSSPath = [".order-card-cta-container[_ngcontent-ng-c3120622055]", ".order-card-cta-container[_ngcontent-ng-c3120622055]"];
    for (const path of containerCSSPath) {
      const n2 = document.querySelector(path);
      if (n2 != null && n2.style.display != "none") {
        n2.style.setProperty("display", "none", "important")
      }
    }
});

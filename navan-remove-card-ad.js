// ==UserScript==
// @name        Remove Navan Card Ad
// @description Don't show Navan ads for their card
// @version     0.0.3
// @license     The Unlicense
// @author      André Srinivasan
// @website     https://github.com/andresrinivasan/userscripts
// @supportURL  https://github.com/andresrinivasan/userscripts/issues
// @downloadURL	https://github.com/andresrinivasan/userscripts/raw/main/navan-remove-card-ad.js
// @match       *://app.navan.com/*
// @require     https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2
// ==/UserScript==

VM.observe(document.body, () => {
    const n1 = document.querySelector(".order-card-cta-left-container");
    if (n1) {
      document.querySelector(".secondary").click()
    }
  
    const n2 = document.querySelector(".order-card-cta-container[_ngcontent-ng-c3120622055]");
    if (n2.style.display != "none") {
      n2.style.setProperty("display", "none", "important")
    }
});

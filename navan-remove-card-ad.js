// ==UserScript==
// @name        Remove Navan Card Ad
// @description Don't show Navan ads for their card
// @version     0.0.1
// @license     The Unlicense
// @author      André Srinivasan
// @website     https://github.com/andresrinivasan/userscripts
// @supportURL  https://github.com/andresrinivasan/userscripts/issues
// @downloadURL	https://github.com/andresrinivasan/userscripts/raw/main/navan-remove-card-ad.js
// @match       *://app.navan.com/app/liquid/user/transactions/*
// @require     https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2
// ==/UserScript==

VM.observe(document.body, () => {
    const o1 = document.querySelector(".order-card-cta-left-container");
    if (o1) {
      document.querySelector(".secondary").click()
    }
  
    const o2 = document.querySelector(".order-card-cta-container[_ngcontent-ng-c3120622055]");
    if (o2.style.display != "none") {
      o2.style.display = "none";
    }
});

// ==UserScript==
// @name        Remove Navan Card Ads
// @description Don't show Navan ads for their card
// @version     0.0.9
// @license     The Unlicense
// @author      André Srinivasan
// @website     https://github.com/andresrinivasan/userscripts
// @supportURL  https://github.com/andresrinivasan/userscripts/issues
// @downloadURL	https://github.com/andresrinivasan/userscripts/raw/main/navan-remove-card-ad.js
// @match       *://app.navan.com/*
// @require     https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2
// ==/UserScript==

"use strict";

// Need to use VM.observe to wait for the CTA to show up

VM.observe(document.body, () => {
  let done = false;

  // Remove Navan Card CTA across the top of the page
  const n1 = document.querySelector(".order-card-cta-left-container");
  if (n1) {
    document.querySelector(".secondary").click();
    done = true;
  }

  // Remove Navan Card CTA on the right nav
  const containerCSSPath = [
    ".order-card-cta-container[_ngcontent-ng-c3120622055]", 
    "user-order-new-card-tile.ng-star-inserted",
  ];
  for (const path of containerCSSPath) {
    const n2 = document.querySelector(path);
    if (n2 != null && n2.style.display != "none") {
      n2.style.setProperty("display", "none", "important");
    }
  }

  return done;
});

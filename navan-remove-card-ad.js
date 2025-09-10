// ==UserScript==
// @name        Remove Navan Card Ads
// @description Don't show Navan ads for their card
// @version     1.1.0
// @license     The Unlicense
// @author      andresrinivasan
// @website     https://github.com/andresrinivasan/userscripts
// @supportURL  https://github.com/andresrinivasan/userscripts/issues
// @downloadURL	https://github.com/andresrinivasan/userscripts/raw/main/navan-remove-card-ad.js
// @match       *://app.navan.com/*
// @require     https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2
// ==/UserScript==

'use strict';

// Need to use VM.observe to wait for the CTA to show up

VM.observe(document.body, () => {
  // Remove Navan Card CTA across the top of the page
  const n1 = document.querySelector(".order-card-cta-left-container");
  if (n1) {
    document.querySelector(".secondary").click();
  }

  // Remove Navan Card CTA on the right nav
  const containerCSSPath = [
    ".order-card-cta-container[_ngcontent-ng-c3120622055]", 
    "user-order-new-card-tile.ng-star-inserted",
  ];
  for (const path of containerCSSPath) {
    const n2 = document.querySelector(path);
    if (n2 != null) {
      n2.remove();
    }
  }

  // 20250408 Remove Navan Card CTA across the top
  const n3 = document.querySelector(".banner-minimal__container");
  if (n3) {
    const n4 = n3.querySelector(".icon-cross-filled");
    if (n4) {
      n4.click()
    }
  }

  // CTAs can come back
  return false;
});

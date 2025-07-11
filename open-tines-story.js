// ==UserScript==
// @name        Open Tines Story
// @namespace   https://github.com/andresrinivasan/userscripts
// @description Open the Tines Story in the library tenant from tines.com/library when the Import button is alt+clicked.
// @version     1.0.4
// @license     The Unlicense
// @author      andresrinivasan
// @website     https://github.com/andresrinivasan/userscripts
// @supportURL  https://github.com/andresrinivasan/userscripts/issues
// @downloadURL	https://github.com/andresrinivasan/userscripts/raw/main/open-tines-story.js
// @match       *://*.tines.com/*
// @require     https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2
// @grant       GM_openInTab
// ==/UserScript==

"use strict";

VM.observe(document.body, () => {
  let observed = false;

  if (location.pathname.startsWith("/library/stories")) {
    const b = document.querySelector('.l1dpxm3m') // Use div around button to avoid event added by Tines
    if (b) {
      b.addEventListener('click', catchClick, false);
      // observed = true; // I can't run this once as some Tines logic is overwriting my listener. XXX fix me
    }
  }

  return observed;
});

function catchClick(e) {
  if (e.altKey) {
    e.preventDefault();
    const storyId = location.pathname.split("/").filter(Boolean).pop();
    GM_openInTab("https://library.tines.com/stories/" + storyId, { active: true })
  }
}

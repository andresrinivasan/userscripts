// ==UserScript==
// @name        YouTube Autoclick Popups
// @description Click 'no' on upgrade offer and 'yes' on still here
// @version     1.0.0
// @license     The Unlicense
// @author      andresrinivasan
// @website     https://github.com/andresrinivasan/userscripts
// @supportURL  https://github.com/andresrinivasan/userscripts/issues
// @downloadURL	https://github.com/andresrinivasan/userscripts/raw/main/youtube-autoclick-popups.js
// @match       *://music.youtube.com/*
// @require     https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2
// ==/UserScript==

'use strict';

// Need to use VM.observe to wait for the popups to show up

VM.observe(document.body, () => {
  const upgrade = document.querySelector("body > ytmusic-app > ytmusic-popup-container > tp-yt-paper-dialog > ytmusic-mealbar-promo-renderer > div.button-wrapper.style-scope.ytmusic-mealbar-promo-renderer > yt-button-renderer.dismiss-button.style-scope.ytmusic-mealbar-promo-renderer > yt-button-shape");
  if (upgrade) {
    upgrade.click()
  }

  const here = document.querySelector("body > ytmusic-app > ytmusic-popup-container > tp-yt-paper-dialog > ytmusic-you-there-renderer > div > yt-button-renderer > yt-button-shape > button");
  if (here) {
    here.click()
  }

  // Popups can come back
  return false;
});

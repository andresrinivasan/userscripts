// ==UserScript==
// @name         Youtube Music I'm still here listening
// @version      3.1.0
// @description  Forked from https://greasyfork.org/en/scripts/535841-youtube-music-i-m-still-here-listening. Clicks on the annoying button for you and trying to fake page focus so this message won't appear at all
// @author       andresrinivasan
// @author       kkrow
// @license      MIT
// @match        https://music.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=music.youtube.com
// @grant        none
// @run-at       document-start
// @downloadURL  https://github.com/andresrinivasan/userscripts/raw/main/youtube-music-no-bother.js
// @require      https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2
// @supportURL   https://github.com/andresrinivasan/userscripts/issues
// ==/UserScript==

(function() {
    'use strict';
    
    // Wait for the body to exist before observing it.
    window.addEventListener('DOMContentLoaded', (event) => {
        // Click popup buttons as soon as they appear.
        VM.observe(document.body, () => {
            // "Are you still listening?" - Yes button
            const stillHereBtn = document.querySelector('ytmusic-you-there-renderer .yt-spec-button-shape-next--call-to-action, ytmusic-you-there-renderer yt-button-renderer button');
            if (stillHereBtn) {
                stillHereBtn.click();
            }

            // "Upgrade" or other promos - Dismiss button
            const promoDismissBtn = document.querySelector('ytmusic-mealbar-promo-renderer .dismiss-button, .yt-spec-button-shape-next--call-to-action-inverse');
            if (promoDismissBtn) {
                promoDismissBtn.click();
            }

            // Popups can come back, so we keep observing.
            return false;
        });
    });
})();
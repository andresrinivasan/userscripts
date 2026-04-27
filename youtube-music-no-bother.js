// ==UserScript==
// @name         Youtube Music I'm still here listening
// @version      3.1.0
// @description  Forked from https://greasyfork.org/en/scripts/535841-youtube-music-i-m-still-here-listening. Clicks on the annoying button for you and trying to fake page focus so this message won't appear at all
// @name         YouTube Music - No Bother
// @version      3.2.0
// @description  Automatically clicks "Are you still listening?" and dismisses upgrade/promo popups on YouTube Music.
// @author       andresrinivasan
// @author       kkrow
// @license      MIT
// @match        https://music.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=music.youtube.com
// @grant        none
// @run-at       document-start
// @run-at       document-end
// @downloadURL  https://github.com/andresrinivasan/userscripts/raw/main/youtube-music-no-bother.js
// @require      https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2
// @supportURL   https://github.com/andresrinivasan/userscripts/issues
// ==/UserScript==

(function() {
    'use strict';

    const SELECTORS = {
        stillHere: 'ytmusic-you-there-renderer .yt-spec-button-shape-next--call-to-action, ytmusic-you-there-renderer yt-button-renderer button',
        promoDismiss: 'ytmusic-mealbar-promo-renderer .dismiss-button, .yt-spec-button-shape-next--call-to-action-inverse'
    };

    function clickButtons() {
        try {
            const stillHereBtn = document.querySelector(SELECTORS.stillHere);
            if (stillHereBtn) {
                stillHereBtn.click();
                return true;
            }

            const promoDismissBtn = document.querySelector(SELECTORS.promoDismiss);
            if (promoDismissBtn) {
                promoDismissBtn.click();
                return true;
            }
        } catch (e) {
            // Swallow errors — some elements may be detached during navigation
        }
        return false;
    }

    // Primary mechanism: Mutation observer via VM.observe for immediate clicks.
    VM.observe(document.body || document.documentElement, () => {
        clickButtons();
        return false; // keep observing
    });

    // Fallback polling to handle cases where MutationObservers may be delayed
    // (background tabs can throttle timers, but setInterval still fires eventually).
    let intervalId = null;
    function startPolling() {
        if (intervalId) return;
        const baseMs = document.hidden ? 2000 : 1000; // slower when hidden
        intervalId = setInterval(() => {
            clickButtons();
        }, baseMs);
    }
    function stopPolling() {
        if (intervalId) { clearInterval(intervalId); intervalId = null; }
    }

    if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', startPolling);
    } else {
        startPolling();
    }

    document.addEventListener('visibilitychange', () => {
        stopPolling();
        startPolling();
    });

})();

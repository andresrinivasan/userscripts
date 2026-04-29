// ==UserScript==
// @name         YouTube Music - No Bother
// @version      4.0.1
// @description  Forked from https://greasyfork.org/en/scripts/535841-youtube-music-i-m-still-here-listening. Automatically clicks "Are you still listening?" and dismisses upgrade/promo popups on YouTube Music.
// @author       andresrinivasan
// @author       kkrow
// @license      MIT
// @match        https://music.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=music.youtube.com
// @grant        none
// @run-at       document-end
// @homepageURL  https://github.com/andresrinivasan/userscripts
// @downloadURL  https://github.com/andresrinivasan/userscripts/raw/main/youtube-music-no-bother.js
// @require      https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2
// @supportURL   https://github.com/andresrinivasan/userscripts/issues
// ==/UserScript==

(function() {
    'use strict';

    const SELECTORS = {
        promoDismiss: 'ytmusic-mealbar-promo-renderer .dismiss-button, .yt-spec-button-shape-next--call-to-action-inverse'
    };

    function findStillHereButton() {
        // Prefer the direct actions button selector (matches observed DOM)
        const actionsBtn = document.querySelector('ytmusic-you-there-renderer div.actions button');
        if (actionsBtn) return actionsBtn;

        // Try the exact popup path as a second attempt
        const exact = document.querySelector('body > ytmusic-app > ytmusic-popup-container > tp-yt-paper-dialog > ytmusic-you-there-renderer > div > yt-button-renderer > yt-button-shape > button');
        if (exact) return exact;

        // Fallback: look inside the renderer for likely buttons
        const root = document.querySelector('ytmusic-you-there-renderer');
        if (!root) return null;
        const candidates = Array.from(root.querySelectorAll('button, yt-button-renderer button, yt-button-shape > button'));
        return candidates.find(b => {
            const txt = (b.textContent || '').trim().toLowerCase();
            const aria = (b.getAttribute && (b.getAttribute('aria-label') || '')).toLowerCase();
            return /yes|still here|keep playing|continue|play/i.test(txt) || /yes|still here|keep playing|continue|play/i.test(aria);
        }) || candidates[0] || null;
    }

    // Whitelist of focusable elements/selectors where the script should never attempt clicks
    // Add page-specific selectors here if the script interferes with typing.
    const FOCUS_WHITELIST = [
        'ytmusic-search-box input',            // common YouTube Music search box wrapper
        'input[aria-label="Search"]',        // generic aria-labeled search inputs
        'tp-yt-paper-input input',             // yt/custom input wrappers
        'input#search',                        // generic search id
        'input#input'                          // some wrappers use this id
    ];

    function isTypingInEditable() {
        try {
            const ae = document.activeElement;
            if (!ae) return false;

            // If the focused element itself matches a whitelist selector, skip
            for (const s of FOCUS_WHITELIST) {
                if (ae.closest && ae.closest(s)) return true;
            }

            const tag = (ae.tagName || '').toUpperCase();
            if (tag === 'INPUT' || tag === 'TEXTAREA') return true;
            if (ae.isContentEditable) return true;

            // Walk up ancestors looking for a search role or search-related class
            let el = ae;
            while (el && el !== document.documentElement) {
                const role = el.getAttribute && el.getAttribute('role');
                if (role === 'search') return true;
                const cls = el.className || '';
                if (typeof cls === 'string' && /search|query|autocomplete|suggest/i.test(cls)) return true;
                el = el.parentElement;
            }
        } catch (err) {
            // ignore
        }
        return false;
    }

    function clickButtons() {
        // Don't interact while the user is typing in a form/search box
        if (isTypingInEditable()) return false;

        try {
            const stillHereBtn = findStillHereButton();
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

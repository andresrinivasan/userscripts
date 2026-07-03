// ==UserScript==
// @name         YouTube Music - No Bother
// @version      4.1.0
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

    // List of selectors for promo "no thanks" / "dismiss" buttons.
    // The script will try these in order.
    const PROMO_DISMISS_SELECTORS = [
        'ytmusic-mealbar-promo-renderer .dismiss-button button', // New, more specific selector for certain popups
        'ytmusic-mealbar-promo-renderer .dismiss-button',
        '.yt-spec-button-shape-next--call-to-action-inverse'
    ];

    function findStillHereButton() {
        // Prefer the direct actions button selector (matches observed DOM)
        const actionsBtn = document.querySelector('ytmusic-you-there-renderer div.actions button');
        if (actionsBtn) {
            console.log('[YTM-NoBother] Found "still here" button via actions selector:', {
                text: (actionsBtn.textContent || '').trim(),
                ariaLabel: actionsBtn.getAttribute('aria-label'),
                selector: 'ytmusic-you-there-renderer div.actions button',
                element: actionsBtn
            });
            return actionsBtn;
        }

        // Fallback: look inside the renderer for likely buttons
        const root = document.querySelector('ytmusic-you-there-renderer');
        if (!root) {
            console.debug('[YTM-NoBother] No ytmusic-you-there-renderer found on page');
            return null;
        }
        
        console.debug('[YTM-NoBother] ytmusic-you-there-renderer found, searching for button candidates...');
        const candidates = Array.from(root.querySelectorAll('button, yt-button-renderer button, yt-button-shape > button'));
        console.debug('[YTM-NoBother] Found', candidates.length, 'button candidates in renderer:', candidates.map(b => ({
            text: (b.textContent || '').trim().substring(0, 50),
            ariaLabel: b.getAttribute('aria-label'),
            class: b.className,
            id: b.id
        })));
        
        const matchingBtn = candidates.find(b => {
            const txt = (b.textContent || '').trim().toLowerCase();
            const aria = (b.getAttribute && (b.getAttribute('aria-label') || '')).toLowerCase();
            const matches = /yes|still here|keep playing|continue|play/i.test(txt) || /yes|still here|keep playing|continue|play/i.test(aria);
            if (matches) {
                console.log('[YTM-NoBother] Matched button with regex:', { text: txt, ariaLabel: aria });
            }
            return matches;
        });
        
        if (matchingBtn) {
            console.log('[YTM-NoBother] Selected matching button:', {
                text: (matchingBtn.textContent || '').trim(),
                ariaLabel: matchingBtn.getAttribute('aria-label'),
                element: matchingBtn
            });
            return matchingBtn;
        }
        
        if (candidates[0]) {
            console.warn('[YTM-NoBother] No regex match found; falling back to first candidate button:', {
                text: (candidates[0].textContent || '').trim(),
                ariaLabel: candidates[0].getAttribute('aria-label'),
                element: candidates[0]
            });
            return candidates[0];
        }
        
        console.warn('[YTM-NoBother] No button candidates found in ytmusic-you-there-renderer');
        return null;
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
                console.log('[YTM-NoBother] Clicking "still here" button:', stillHereBtn.textContent);
                stillHereBtn.click();
                return true;
            }

            for (const selector of PROMO_DISMISS_SELECTORS) {
                const promoDismissBtn = document.querySelector(selector);
                if (promoDismissBtn) {
                    console.log('[YTM-NoBother] Clicking promo dismiss button with selector:', selector, 'Text:', (promoDismissBtn.textContent || '').trim());
                    promoDismissBtn.click();
                    return true;
                }
            }
            console.debug('[YTM-NoBother] No clickable buttons found this cycle');
        } catch (e) {
            // Swallow errors — some elements may be detached during navigation
            console.error('[YTM-NoBother] Error during clickButtons:', e);
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
            const hasDialog = document.querySelector('ytmusic-you-there-renderer');
            if (hasDialog) {
                console.debug('[YTM-NoBother] Polling cycle detected "still here" dialog');
            }
            clickButtons();
        }, baseMs);
        console.log('[YTM-NoBother] Polling started, interval:', baseMs, 'ms');
    }
    function stopPolling() {
        if (intervalId) { 
            clearInterval(intervalId); 
            intervalId = null;
            console.log('[YTM-NoBother] Polling stopped');
        }
    }

    if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', startPolling);
    } else {
        startPolling();
    }

    document.addEventListener('visibilitychange', () => {
    console.log('[YTM-NoBother] Visibility change: document.hidden =', document.hidden);
    stopPolling();
    startPolling();
    if (!document.hidden) {
        // YTM may have been waiting for foreground to resume — nudge it
        console.log('[YTM-NoBother] Tab returned to foreground, nudging clickButtons');
        clickButtons();
    }
});

})();

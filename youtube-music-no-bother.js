// ==UserScript==
// @name         Youtube Music I'm still here listening
// @version      1.1.0
// @description  Forked from https://greasyfork.org/en/scripts/535841-youtube-music-i-m-still-here-listening. Clicks on the annoying button for you and trying to fake page focus so this message won't appear at all
// @author       andresrinivasan
// @author       kkrow
// @license      MIT
// @match        https://music.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=music.youtube.com
// @grant        none
// @run-at       document-start
// @downloadURL  https://github.com/andresrinivasan/userscripts/raw/main/youtube-music-no-bother.js
// @supportURL   https://github.com/andresrinivasan/userscripts/issues
// ==/UserScript==

(function() {
    'use strict';
    // Util to redefine getters
    function defineGetter(obj, prop, value) {
        Object.defineProperty(obj, prop, {
            get: () => value,
            configurable: true
        });
    }

    // Page Visibility API — always visible
    defineGetter(document, 'hidden', false);
    defineGetter(document, 'webkitHidden', false);
    defineGetter(document, 'visibilityState', 'visible');
    defineGetter(document, 'webkitVisibilityState', 'visible');

    // hasFocus() — always true
    window.hasFocus = () => true;
    document.hasFocus = () => true;

    // If tab lose focus turn focus back immediately
    window.addEventListener('blur', () => {
        window.focus();
    });

    // Block registry of tracking listeners
// This may not be needed as the window events are being blocked so they won't bubble up
//    const origDocumentAddEventListener = document.addEventListener;
//    document.addEventListener = function(type, listener, options) {
//        if (type === 'visibilitychange' || type === "blur" || type === "focus") {
//            // console.log("rejected attempt of adding new document listener: " + type)
//            return;
//        }
//        return origDocumentAddEventListener.call(this, type, listener, options);
//    };
    const origWindowAddEventListener = document.addEventListener;
    window.addEventListener = function(type, listener, options) {
        if (type === 'visibilitychange' || type === "blur" || type === "focus") {
            // console.log("rejected attempt of adding new window listener: " + type)
            return;
        }
        return origWindowAddEventListener.call(this, type, listener, options);
    };

    // If tab lose focus turn focus back immediately
// Moved earlier
//    window.addEventListener('blur', () => {
//        window.focus();
//    });

    // Click these button as soon as they appear
    setInterval(() => {
        try {
            document.getElementsByClassName('yt-spec-button-shape-next yt-spec-button-shape-next--text yt-spec-button-shape-next--call-to-action-inverse yt-spec-button-shape-next--size-m yt-spec-button-shape-next--enable-backdrop-filter-experiment')[0].click()
        } catch {}
    }, 1000);
    setInterval(() => {
        try {
            document.getElementsByClassName('yt-spec-button-shape-next yt-spec-button-shape-next--text yt-spec-button-shape-next--call-to-action yt-spec-button-shape-next--size-m yt-spec-button-shape-next--enable-backdrop-filter-experiment')[0].click()
        } catch {}
    }, 1000);
    setInterval(() => {
        try {
            document.querySelector("body > ytmusic-app > ytmusic-popup-container > tp-yt-paper-dialog > ytmusic-mealbar-promo-renderer > div.button-wrapper.style-scope.ytmusic-mealbar-promo-renderer > yt-button-renderer.dismiss-button.style-scope.ytmusic-mealbar-promo-renderer > yt-button-shape > button").click();
        } catch {}
    }, 1000);
})();
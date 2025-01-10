// ==UserScript==
// @name        Gmail and Gcal SFDC move button
// @description Move the SFDC button so it doesn't consume so much space
// @version     0.0.2
// @license     The Unlicense
// @author      André Srinivasan
// @website     https://github.com/andresrinivasan/userscripts
// @supportURL  https://github.com/andresrinivasan/userscripts/issues
// @downloadURL	https://github.com/andresrinivasan/userscripts/raw/main/gmail-gcal-move-sfdc-button.user.js
// @match       *://mail.google.com/*
// @match       *://calendar.google.com/*
// @require     https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2
// ==/UserScript==

'use strict';

let mailInited = false;
let calendarInited = false

function openCloseSFDC() {
    let b = document.querySelector("#sfdc-mailapp-container > everywhere-toolbar").shadowRoot.querySelector("div > div > everywhere-tool").shadowRoot.querySelector("div > button");
    b.click();
    b.click();
}

VM.observe(document.body, () => {
  const node = document.querySelector("#sfdc-mailapp-container");
  if (node) {
    if (!mailInited && window.location.hostname.includes('mail')) {
      document.querySelector(':root').style.setProperty('--collapsed-width', '0px');
      openCloseSFDC()
      mailInited = true
    }

    if (!calendarInited && window.location.hostname.includes('calendar')) {
      document.querySelector(':root').style.setProperty('--collapsed-width', '10px');
      openCloseSFDC()
      calendarInited = true;
    }
  }

  if (mailInited && calendarInited) {
    return true;
  }

  return false;
});


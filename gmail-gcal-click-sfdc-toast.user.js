// ==UserScript==
// @name        Gmail and Gcal SFDC toast click
// @description Wait for the SFDC 'network is disconnected toast' and click on it as it adds no value
// @version     0.0.2
// @license     The Unlicense
// @author      André Srinivasan
// @website     https://github.com/andresrinivasan/userscripts
// @supportURL  https://github.com/andresrinivasan/userscripts/issues
// @downloadURL	https://github.com/andresrinivasan/userscripts/raw/main/gmail-gcal-click-sfdc-toast.user.js
// @match   	  *://mail.google.com/*
// @match   	  *://calendar.google.com/*
// @require 	  https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2
// ==/UserScript==

VM.observe(document.body, () => {
  if (window.location.hostname.includes('calendar')) {
    const n = document.querySelector("#sfdc-mailapp-toast-button > img");
    if (n) {
      n.click()
    }
  }

  if (window.location.hostname.includes('mail')) {
    const n = document.querySelector(".sfdc-mailapp-toast-message-container > div > div");
    if (n) {
      n.click();
    }
  }

  return false;
});

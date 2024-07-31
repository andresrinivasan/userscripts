// ==UserScript==
// @name        Gmail and Gcal SFDC toast click
// @description Click on the SFDC disconnected toast as it adds no value
// @license     The Unlicense
// @author      André Srinivasan
// @website     https://github.com/andresrinivasan/userscripts
// @supportURL  https://github.com/andresrinivasan/userscripts/issues
// @match   *://mail.google.com/*
// @match   *://calendar.google.com/*
// @require https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2
// ==/UserScript==

VM.observe(document.body, () => {
  if (window.location.hostname.includes('calendar')) {
    const n = document.querySelector("#sfdc-mailapp-toast-button > img");
    if (n) {
      n.click()
    }
  }

  if (window.location.hostname.includes('mail')) {
 //   const n = window.location.hostname.includes('mail')
 //   if (n) {
 //     n.style.display = 'none';
  //  }
  }

  return false;
});

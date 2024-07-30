// ==UserScript==
// @name    Hide SFDC toast in Gmail and Gcal
// @match   *://mail.google.com/*
// @match   *://calendar.google.com/*
// @require https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2
// ==/UserScript==

VM.observe(document.body, () => {
  if (window.location.hostname.includes('calendar')) {
    const n = document.querySelector("#sfdc-mailapp-toast-message");
    if (n) {
      n.style.display = 'none';
    }
  }

  if (window.location.hostname.includes('mail')) {
    const n = window.location.hostname.includes('mail')
    if (n) {
      n.style.display = 'none';
    }
  }

  return false;
});

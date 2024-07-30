// ==UserScript==
// @name     Hide SFDC button in Gmail and Gcal
// @match   *://mail.google.com/*
// @match   *://calendar.google.com/*
// @require https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2
// ==/UserScript==

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

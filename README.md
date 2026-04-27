# userscripts

[![License](https://img.shields.io/github/license/andresrinivasan/userscripts)](LICENSE) [![Issues](https://img.shields.io/github/issues/andresrinivasan/userscripts)](https://github.com/andresrinivasan/userscripts/issues)

A small collection of standalone browser userscripts (ViolentMonkey / Tampermonkey style). Each top-level .js file is an independent script with its own metadata header and install URL. Most scripts use the lightweight DOM helper via @require https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2 and the global VM helper.

Installation
- Install ViolentMonkey or Tampermonkey and add a script by pasting the file contents, or use the script's raw GitHub URL (the repository `raw` path) as the install URL.

Scripts

- clickup-nav-cleanup.js
  - Purpose: Remove unwanted ClickUp nav items using precise CSS selectors.
  - Match: https://app.clickup.com/*
  - Notes: Selectors are intentionally specific and may break when ClickUp updates UI.

- gmail-gcal-click-sfdc-toast.user.js
  - Purpose: Auto-click SFDC "network disconnected" toast in Gmail/Calendar.
  - Match: mail.google.com, calendar.google.com
  - Notes: Lightweight and safe — simply clicks a toast element when present.

- gmail-gcal-move-sfdc-button.user.js
  - Purpose: Move or collapse the SFDC button in Gmail/Calendar to save space.
  - Match: mail.google.com, calendar.google.com
  - Notes: Uses shadow DOM traversal; fragile if SFDC's DOM changes.

- navan-remove-card-ad.js
  - Purpose: Remove Navan card CTAs/ads on app.navan.com.
  - Match: https://app.navan.com/*
  - Notes: Multiple selector patterns used — kept conservative but may need updates.

- open-tines-story.js
  - Purpose: Alt+click the Import button on tines.com/library to open the story in library.tines.com.
  - Match: *.tines.com/*
  - Grant: GM_openInTab
  - Status: Fragile — author notes that Tines sometimes overwrites listeners; may need fixing.

- youtube-autoclick-popups.js
  - Purpose: Experimental script to auto-click YouTube Music promo/"still here" popups.
  - Match: *://music.youtube.com/*
  - Status: Experimental — notes in-file that it doesn't work when the tab is backgrounded.

- youtube-music-no-bother.js (current stable)
  - Purpose: Auto-click "Are you still listening?" and dismiss upgrade/promo popups on YouTube Music.
  - Match: https://music.youtube.com/*
  - Status: Active — includes MutationObserver (VM.observe) + polling fallback and a focus whitelist to avoid interfering with typing. Version: 4.0.0. Homepage URL set to this repo.

Repository notes / conventions
- Each script's metadata header is authoritative for install/update URLs, supported hosts (@match), and script version. Keep @downloadURL, @supportURL, and @homepageURL accurate when changing the repo location.
- Prefer a single @run-at directive (this repo uses document-end for runtime safety).
- Use VM.observe(document.body, ...) for dynamic sites and keep selectors focused; many scripts intentionally use brittle selectors.
- If adding a build step or tests, update this README with exact build/test/lint commands and how to run a single-script test.

Contributing
- Open issues or PRs against this repository. For script changes, update the metadata @version and @downloadURL if you intend users to auto-update.

If you'd like, a follow-up can:
- Add per-script example screenshots or GIFs
- Create a release / changelog entry for the youtube-music-no-bother.js 4.0.0 update


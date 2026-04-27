# Copilot instructions for this repository

Purpose
- A small collection of standalone browser userscripts (ViolentMonkey/Tampermonkey style) maintained in a single repository.

Build, test, and lint commands
- No build, test, or lint toolchain is configured (no package.json, no test framework).  
- How to run a single script locally: install ViolentMonkey or Tampermonkey in your browser and either:
  - Add a new userscript and paste the file contents; or
  - Use the file's raw GitHub URL (the repository `raw` path) as the install URL.

High-level architecture
- Flat repository: each top-level .js file is an independent userscript.  
- Each script contains a Greasemonkey/ViolentMonkey metadata block (// ==UserScript== ... // ==/UserScript==) defining @name, @match, @require, @downloadURL, @supportURL, etc.  
- Scripts typically depend on the small DOM helper at `https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2` and use the global `VM` API (e.g., `VM.observe`) to react to DOM changes.  
- Scripts are executed in the page context by the userscript engine and are intentionally standalone (no shared modules or build step).

Key conventions and patterns
- Metadata fields are canonical sources of truth for where the script is intended to run:
  - @match/hostnames declare target sites; @downloadURL points to raw GitHub URL used for installs; @supportURL points to the repository issues page.
- DOM updates are handled via VM.observe(document.body, () => { ...; return false; }) to wait for dynamic elements.
- Prefer precise CSS selectors inside the scripts. Many selectors are brittle by intent (targeting specific app internals).
- Use of `@require` to pull the violentmonkey/dom helper rather than bundling local helper code.
- Versioning is manual inside the metadata header (`@version`) — keep it in sync when releasing changes.

Files and automation to check for
- No CI/workflow files detected in the repository root at the time of writing. If adding workflows, include brief notes here for Copilot to reference.
- No special AI assistant rule files (CLAUDE.md, AGENTS.md, .cursorrules, etc.) were found; if added, include them so Copilot can merge guidance.

When editing scripts
- Keep the metadata header accurate (especially @downloadURL and @supportURL).
- If adding dependencies or introducing a build step, update this file with exact commands to run (install, build, test, lint) and how to run a single script test.

Contact / context
- Repository README is minimal ("userscripts"). Use this file for operational guidance Copilot should know when suggesting edits.


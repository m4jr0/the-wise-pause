// ==UserScript==
// @name         The Wise Pause
// @namespace    https://github.com/m4jr0/the-wise-pause
// @downloadURL  https://raw.githubusercontent.com/m4jr0/the-wise-pause/main/src/the_wise_pause.user.js
// @updateURL    https://raw.githubusercontent.com/m4jr0/the-wise-pause/main/src/the_wise_pause.user.js
// @version      0.1.1
// @description  A gentle nudge towards mindfulness, this script offers a moment of reflection before venturing into time-consuming websites. Like a sage guardian of your focus, it reminds you to consider whether the path ahead is truly worth your time.
// @author       m4jr0
// @match        *://*/*
// @grant        none
// @require       https://github.com/m4jr0/the-wise-pause/raw/main/src/css.js
// @require       https://github.com/m4jr0/the-wise-pause/raw/main/src/greetings.js
// @require       https://github.com/m4jr0/the-wise-pause/raw/main/src/filtered_sites.js
// @require       https://github.com/m4jr0/the-wise-pause/raw/main/src/popup.js
// ==/UserScript==

;(function () {
  'use strict'
  handleCurrentWebsite()
})()

function handleCurrentWebsite() {
  if (!isCurrentWebsiteMatch()) {
    return
  }

  loadCss()
  displayPopup()
}

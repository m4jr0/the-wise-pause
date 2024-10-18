// ==UserScript==
// @name          The Wise Pause
// @namespace     https://github.com/m4jr0/the-wise-pause
// @downloadURL   https://raw.githubusercontent.com/m4jr0/the-wise-pause/main/src/the_wise_pause.user.js
// @updateURL     https://raw.githubusercontent.com/m4jr0/the-wise-pause/main/src/the_wise_pause.user.js
// @version       0.1.3
// @description   A gentle nudge towards mindfulness, this script offers a moment of reflection before venturing into time-consuming websites. Like a sage guardian of your focus, it reminds you to consider whether the path ahead is truly worth your time.
// @author        m4jr0
// @match         *://*/*
// @grant         none
// @require       file://C:\Users\gcatto\Documents\Private\Projects\the-wise-pause/src/css.js
// @require       file://C:\Users\gcatto\Documents\Private\Projects\the-wise-pause/src/greetings.js
// @require       file://C:\Users\gcatto\Documents\Private\Projects\the-wise-pause/src/filtered_sites.js
// @require       file://C:\Users\gcatto\Documents\Private\Projects\the-wise-pause/src/popup.js
// ==/UserScript==

;(function () {
  'use strict'
  console.log(
    `“${GM_info.script.name}”, version ${GM_info.script.version}, is now in motion. Let us continue with intention. 🧙‍♂️`
  )
  handleCurrentWebsite()
})()

function handleCurrentWebsite() {
  if (!isCurrentWebsiteMatch()) {
    return
  }

  loadCss()
  showGreetings()
}

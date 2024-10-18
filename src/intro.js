class Intro {
  static #HAS_INTRODUCTED_KEY = `${Consts.MAIN_PREFIX}has-introduced`

  static hasIntroduced () {
    const hasIntroduced = GM_getValue(Intro.#HAS_INTRODUCTED_KEY)

    if (!hasIntroduced) {
      return false
    }

    return JSON.parse(hasIntroduced)
  }

  static introduce () {
    Popups.show({
      title: 'A Word of Welcome.',
      onPopupFill: Intro.#onPopupFill,
      onPopupClosed: Intro.#onPopupClosed,
      closeBtnLabel: 'I Shall Tread With Intention',
      classes: `${Consts.MAIN_PREFIX}greetings ${Consts.MAIN_PREFIX}fadable`
    })
  }

  static #onPopupFill (_, popup) {
    // Generate HTML using DOM node Intro.#creation methods to keep our browser happy.
    // https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/Safely_inserting_external_content_into_a_page
    const p1 = document.createElement('p')
    const p2 = document.createElement('p')
    const p3 = document.createElement('p')
    const p4 = document.createElement('p')

    const span1 = Intro.#createSpan(
      'Greetings, traveler.',
      `${Consts.MAIN_PREFIX}emphasized-text`
    )

    p1.appendChild(span1)

    p1.appendChild(
      document.createTextNode(
        ' I am here to offer a word of counsel as you venture into the vast realms of the web. Before you proceed, know this: should you find yourself straying too far into the lands of distraction, I stand ready to remind you of more meaningful pursuits.'
      )
    )

    const span2 = Intro.#createSpan(
      'no longer appear',
      `${Consts.MAIN_PREFIX}emphasized-text`
    )

    const span3 = Intro.#createSpan(
      'you can always summon me again by typing ',
      `${Consts.MAIN_PREFIX}emphasized-text`
    )

    const forceCodeSpan = Intro.#createSpan(
      'twpforce',
      `${Consts.MAIN_PREFIX}force-code`
    )

    p2.appendChild(
      document.createTextNode(
        'If, however, my presence fades and the reminders '
      )
    )

    p2.appendChild(span2)

    p2.appendChild(
      document.createTextNode(
        ', it may be that something was changed in the settings—perhaps unintentionally. Fear not, for '
      )
    )

    p2.appendChild(span3)
    span3.appendChild(forceCodeSpan)
    p2.appendChild(document.createTextNode(', and I shall return.'))

    const span4 = Intro.#createSpan(
      'simply click the cog in the bottom right',
      `${Consts.MAIN_PREFIX}emphasized-text`
    )

    p3.appendChild(
      document.createTextNode(
        'Should you wish to see which paths—websites—currently call upon me, or adjust them as needed, '
      )
    )

    p3.appendChild(span4)

    p3.appendChild(
      document.createTextNode(
        '. There, you will find the power to manage the distractions that seek to pull you astray.'
      )
    )

    const span5 = Intro.#createSpan(
      'Choose wisely',
      `${Consts.MAIN_PREFIX}emphasized-text`
    )

    p4.appendChild(span5)

    p4.appendChild(
      document.createTextNode(
        ', for even the smallest steps can shape the road ahead.'
      )
    )

    popup.appendChild(p1)
    popup.appendChild(p2)
    popup.appendChild(p3)
    popup.appendChild(p4)
  }

  static #onPopupClosed (_) {
    GM_setValue(Intro.#HAS_INTRODUCTED_KEY, JSON.stringify(true))
    Script.quit()
  }

  static #createSpan (text, className) {
    const span = document.createElement('span')
    span.className = className
    span.textContent = text
    return span
  }
}

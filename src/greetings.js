class GreetingsSetGenerator {
  static #INTROS = [
    "Ah, I see you are about to venture once more into the realm of distraction. But, before you proceed, might I suggest a moment of quiet reflection? Is this truly the path you wish to tread, or could your time be better spent pursuing greater things, more meaningful endeavors? The choice, of course, is yours—but remember, even the smallest decisions can shape the course of one's destiny.",
    "It seems you're on the verge of a detour into distraction. Before you continue, it might be worth reflecting—is this the best use of your time, or is there something more pressing that calls for your attention?",
    "Ah, I see you've arrived at a familiar crossroads. Before you choose distraction, take a moment to consider: is this truly where you'd like to direct your focus right now? The decision is yours to make.",
    'You stand once again at the threshold of distraction. Perhaps this is the right moment to ask yourself: is this how you wish to spend this time, or would you rather use it differently? The choice is yours.',
    'Distraction lies ahead, and as you consider stepping into it, pause to reflect. Is this path the most aligned with your goals right now, or is there another direction you could take instead?',
    'Ah, a moment of distraction approaches. Before stepping forward, take a brief pause. Is this where your focus is needed most, or is there something more important that awaits your attention?',
    "I see you are about to shift into a moment of distraction. Perhaps, before proceeding, you could ask yourself if this is how you'd like to use your time, or if there's another task that calls for it.",
    'It seems distraction is on the horizon. Before moving ahead, consider: is this the best direction for your attention right now, or might there be other ways to use this moment?',
    "You stand before a familiar choice—distraction awaits. Before venturing further, take a second to reflect. Is this truly where you'd like to spend your time, or is there another focus that could be more meaningful?",
    "Ah, it appears distraction is within reach. Before you proceed, consider: is this where you'd prefer to direct your energy, or could it be better placed elsewhere at this moment?"
  ]

  static #QUOTE_PREFIX = [
    'As a wise soul once said, ',
    'As the saying goes, ',
    'In the words of one who knew well, ',
    'As is often wisely said, ',
    'As someone once keenly observed, ',
    'As the old adage reminds us, ',
    'As the wise often remind us, ',
    'In the wisdom of those who came before, ',
    'As a thoughtful mind once noted, ',
    'As those who reflect deeply have said, ',
    'In the words of those who have walked this path, ',
    'As it is often said by the insightful, ',
    'As the thoughtful have long believed, ',
    'As the wise have long understood, '
  ]

  static #QUOTES = [
    "Don't watch the clock; do what it does. Keep going.",
    'Success is not final, failure is not fatal: It is the courage to continue that counts.',
    'The way to get started is to quit talking and begin doing.',
    "Don't let yesterday take up too much of today.",
    "It's not whether you get knocked down, it's whether you get up.",
    'We may encounter many defeats but we must not be defeated.',
    "Your time is limited, don't waste it living someone else's life.",
    'The only limit to our realization of tomorrow is our doubts of today.',
    "Believe you can and you're halfway there.",
    'Success is not final, failure is not fatal: it is the courage to continue that counts.',
    'The greatest glory in living lies not in never falling, but in rising every time we fall.',
    'Courage is not the absence of fear, but the triumph over it.',
    'He who dares, wins.',
    'The only way to do great work is to love what you do.',
    'To improve is to change; to be perfect is to change often.',
    'We make a living by what we get, but we make a life by what we give.',
    'All we have to decide is what to do with the time that is given us.',
    'Even the smallest person can change the course of the future.',
    'It is not despair, for despair is only for those who see the end beyond all doubt. We do not.',
    'I will not say: do not weep; for not all tears are an evil.',
    'It is our choices, my friend, that show what we truly are, far more than our abilities.',
    'Happiness can be found even in the darkest of times, if one only remembers to turn on the light.',
    'It does not do to dwell on dreams and forget to live, remember that.',
    'We must all face the choice between what is right and what is easy.'
  ]

  static #REPLIES = [
    'Noted',
    'Point taken',
    "I'll reflect on that",
    'Duly noted',
    "I'll consider it",
    "I'll keep that in mind",
    'Message received',
    'I see your point',
    'Wise words',
    'Understood',
    'Something to think about',
    'You have a point',
    "I'll ponder that",
    'Thanks for the insight',
    "I'll take that to heart"
  ]

  static generateIntro () {
    return GreetingsSetGenerator.#INTROS[
      Math.floor(Math.random() * GreetingsSetGenerator.#INTROS.length)
    ]
  }

  static generateQuotePrefix () {
    return GreetingsSetGenerator.#QUOTE_PREFIX[
      Math.floor(Math.random() * GreetingsSetGenerator.#QUOTE_PREFIX.length)
    ]
  }

  static generateQuote () {
    return GreetingsSetGenerator.#QUOTES[
      Math.floor(Math.random() * GreetingsSetGenerator.#QUOTES.length)
    ]
  }

  static generateReply () {
    return GreetingsSetGenerator.#REPLIES[
      Math.floor(Math.random() * GreetingsSetGenerator.#REPLIES.length)
    ]
  }
}

class Greetings {
  #intro = '-'
  #quotePrefix = '-'
  #quote = '-'

  constructor () {
    this.#intro = GreetingsSetGenerator.generateIntro()
    this.#quotePrefix = GreetingsSetGenerator.generateQuotePrefix()
    this.#quote = GreetingsSetGenerator.generateQuote()
  }

  getIntro () {
    return this.#intro
  }

  getQuote () {
    return this.#quote
  }

  getQuotePrefix () {
    return this.#quotePrefix
  }
}

class GreetingsUi {
  static showOne () {
    Popups.show({
      title: 'Greetings, friend.',
      onPopupFill: GreetingsUi.#onPopupFill,
      onPopupClosed: GreetingsUi.#onPopupClosed,
      closeBtnLabel: GreetingsSetGenerator.generateReply(),
      classes: `${Consts.MAIN_PREFIX}greetings ${Consts.MAIN_PREFIX}fadable`
    })
  }

  static makeAllInvisible () {
    const allGreetings = document.querySelectorAll(
      `.${Consts.MAIN_PREFIX}greetings`
    )

    for (const greetings of allGreetings) {
      greetings.classList.add(`${Consts.MAIN_PREFIX}faded`)
    }
  }

  static makeAllVisible () {
    const allGreetings = document.querySelectorAll(
      `.${Consts.MAIN_PREFIX}greetings`
    )

    for (const greetings of allGreetings) {
      greetings.classList.remove(`${Consts.MAIN_PREFIX}faded`)
    }
  }

  static #onPopupFill (_, popup) {
    // Generate HTML using DOM node creation methods to keep our browser happy.
    // https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/Safely_inserting_external_content_into_a_page
    const greetings = new Greetings()

    const introParagraph = document.createElement('p')
    introParagraph.className = `${Consts.MAIN_PREFIX}intro`
    introParagraph.textContent = greetings.getIntro()
    popup.appendChild(introParagraph)

    const fullQuoteParagraph = document.createElement('p')
    fullQuoteParagraph.className = `${Consts.MAIN_PREFIX}full-quote`

    const quotePrefixText = document.createTextNode(
      `${greetings.getQuotePrefix()}‘`
    )

    fullQuoteParagraph.appendChild(quotePrefixText)

    const quoteSpan = document.createElement('span')
    quoteSpan.className = `${Consts.MAIN_PREFIX}quote`
    quoteSpan.textContent = greetings.getQuote()
    fullQuoteParagraph.appendChild(quoteSpan)

    const closingQuoteText = document.createTextNode('’')
    fullQuoteParagraph.appendChild(closingQuoteText)

    popup.appendChild(fullQuoteParagraph)
  }

  static #onPopupClosed (_) {
    Script.quit()
  }
}

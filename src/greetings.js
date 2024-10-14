function generateIntro() {
  return "Ah, I see you are about to venture once more into the realm of distraction. But, before you proceed, might I suggest a moment of quiet reflection? Is this truly the path you wish to tread, or could your time be better spent pursuing greater things, more meaningful endeavors? The choice, of course, is yours—but remember, even the smallest decisions can shape the course of one's destiny."
}

function generateQuotePrefix() {
  return 'As a wise soul once said, '
}

function generateQuote() {
  const QUOTES = [
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
    'We must all face the choice between what is right and what is easy.',
  ]

  return QUOTES[Math.floor(Math.random() * QUOTES.length)]
}

class Greetings {
  intro = '-'
  quotePrefix = '-'
  quote = '-'

  constructor() {
    this.intro = generateIntro()
    this.quotePrefix = generateQuotePrefix()
    this.quote = generateQuote()
  }

  getIntro() {
    return this.intro
  }

  getQuote() {
    return this.quote
  }

  getFullQuote() {
    return `${this.quotePrefix}“${this.getQuote()}”`
  }
}

function generateGreetings() {
  return new Greetings()
}
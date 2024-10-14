function generatePopupHtmlElements(greetings) {
  const title = 'Greetings, friend.'

  const overlay = document.createElement('div')
  overlay.id = 'twp-overlay'

  const popup = document.createElement('div')
  popup.id = 'twp-popup'

  const titleElement = document.createElement('h2')
  titleElement.id = 'twp-popup-title'
  titleElement.textContent = title
  popup.appendChild(titleElement)

  const introParagraph = document.createElement('p')
  introParagraph.className = 'twp-intro'
  introParagraph.textContent = greetings.getIntro()
  popup.appendChild(introParagraph)

  const fullQuoteParagraph = document.createElement('p')
  fullQuoteParagraph.className = 'twp-full-quote'

  const quotePrefixText = document.createTextNode(
    `${greetings.getQuotePrefix()}“`
  )

  fullQuoteParagraph.appendChild(quotePrefixText)

  const quoteSpan = document.createElement('span')
  quoteSpan.className = 'twp-quote'
  quoteSpan.textContent = greetings.getQuote()
  fullQuoteParagraph.appendChild(quoteSpan)

  const closingQuoteText = document.createTextNode('”')
  fullQuoteParagraph.appendChild(closingQuoteText)

  popup.appendChild(fullQuoteParagraph)

  const popupFooter = document.createElement('div')
  popupFooter.id = 'twp-popup-footer'

  const closeButton = document.createElement('button')
  closeButton.id = 'twp-popup-close-btn'
  closeButton.textContent = 'I heard you'
  popupFooter.appendChild(closeButton)

  popup.appendChild(popupFooter)
  overlay.appendChild(popup)

  return overlay
}

function displayPopup() {
  const greetings = generateGreetings()
  const popupElement = generatePopupHtmlElements(greetings)

  const popupContainer = document.createElement('div')
  popupContainer.id = 'twp-container'
  popupContainer.appendChild(popupElement)

  document.body.appendChild(popupContainer)

  document
    .querySelector('#twp-popup-close-btn')
    .addEventListener('click', () => {
      document.querySelector('#twp-overlay').classList.remove('show')
      document.querySelector('#twp-popup').classList.remove('open')

      setTimeout(() => {
        document.body.removeChild(document.querySelector('#twp-container'))
      }, 2000)
    })

  setTimeout(() => {
    document.querySelector('#twp-overlay').classList.add('show')
    document.querySelector('#twp-popup').classList.add('open')
  }, 0)
}

const InputMode = Object.freeze({
  UNKNOWN: 0,
  PLAIN_TEXT: 1,
  REGEX: 2
})

function getInputModeLabel (inputMode) {
  const labels = {
    [InputMode.UNKNOWN]: 'unknown',
    [InputMode.PLAIN_TEXT]: 'text',
    [InputMode.REGEX]: 'regex'
  }

  return labels[inputMode] || '???'
}

function getDefaultFilteredWebsites () {
  return [
    { domain: 'www.9gag.com', inputMode: InputMode.PLAIN_TEXT },
    { domain: 'www.buzzfeed.com', inputMode: InputMode.PLAIN_TEXT },
    { domain: 'www.discord.com', inputMode: InputMode.PLAIN_TEXT },
    { domain: 'www.facebook.com', inputMode: InputMode.PLAIN_TEXT },
    { domain: 'www.imgur.com', inputMode: InputMode.PLAIN_TEXT },
    { domain: 'www.instagram.com', inputMode: InputMode.PLAIN_TEXT },
    { domain: 'www.linkedin.com', inputMode: InputMode.PLAIN_TEXT },
    { domain: 'www.pinterest.com', inputMode: InputMode.PLAIN_TEXT },
    { domain: 'www.reddit.com', inputMode: InputMode.PLAIN_TEXT },
    { domain: 'www.snapchat.com', inputMode: InputMode.PLAIN_TEXT },
    { domain: 'www.tiktok.com', inputMode: InputMode.PLAIN_TEXT },
    { domain: 'www.tumblr.com', inputMode: InputMode.PLAIN_TEXT },
    { domain: 'www.twitch.tv', inputMode: InputMode.PLAIN_TEXT },
    { domain: 'www.twitter.com', inputMode: InputMode.PLAIN_TEXT },
    { domain: 'www.vimeo.com', inputMode: InputMode.PLAIN_TEXT },
    { domain: 'www.youtube.com', inputMode: InputMode.PLAIN_TEXT },
    { domain: 'x.com', inputMode: InputMode.PLAIN_TEXT }
  ]
}

let cachedFilteredWebsites = null

function getFilteredWebsites () {
  if (cachedFilteredWebsites) {
    return cachedFilteredWebsites
  }

  const storedWebsites = GM_getValue(Context.FILTERED_WEBSITES_KEY)

  if (storedWebsites) {
    try {
      cachedFilteredWebsites = JSON.parse(storedWebsites)

      if (isNonEmptyArray(cachedFilteredWebsites)) {
        return cachedFilteredWebsites
      }
    } catch (error) {
      console.error('Error parsing filtered websites from local storage', error)
    }
  }

  cachedFilteredWebsites = getDefaultFilteredWebsites()
  return cachedFilteredWebsites
}

function saveFilteredWebsites (websites) {
  const uniqueWebsites = new Set()

  const cleanedWebsites = websites.filter(website => {
    const isDuplicate = uniqueWebsites.has(website.domain)
    uniqueWebsites.add(website.domain)
    return !isDuplicate
  })

  cachedFilteredWebsites = websites
  GM_setValue(Context.FILTERED_WEBSITES_KEY, JSON.stringify(cleanedWebsites))
}

function isWebsiteAMatch (url, website) {
  if (website.inputMode === InputMode.PLAIN_TEXT) {
    if (url.includes(website.domain)) {
      return true
    }
  } else if (website.inputMode === InputMode.REGEX) {
    // This is bad performance, but this script is executed only once
    // anyway...
    const regex = new RegExp(website.domain)

    if (regex.test(website.domain)) {
      return true
    }
  } else {
    console.error(`Unknown or unsupported input mode: ${website.inputMode}!`)
  }
}

function isCurrentWebsiteAMatch () {
  const url = window.location.host
  const filteredWebsites = getFilteredWebsites()

  for (const website of filteredWebsites) {
    if (isWebsiteAMatch(url, website)) {
      return true
    }
  }

  return getFilteredWebsites().includes(url)
}

function onFilteredWebsitesPopupFill (id, popup) {
  // Generate HTML using DOM node creation methods to keep our browser happy.
  // https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/Safely_inserting_external_content_into_a_page
  const urlListId = `${Context.CSS_PREFIX}url-list-${id}`

  const urlList = document.createElement('div')
  urlList.id = urlListId
  urlList.className = `${Context.CSS_PREFIX}url-list no-spacing`
  popup.appendChild(urlList)

  const addSection = document.createElement('div')
  addSection.className = `${Context.CSS_PREFIX}url-list-add-section no-spacing`
  popup.appendChild(addSection)

  const addButton = document.createElement('button')
  addButton.id = `${Context.CSS_PREFIX}url-list-${id}-add-btn`
  addButton.className = `${Context.CSS_PREFIX}url-list-item-add-btn`
  addButton.textContent = 'Add'
  addSection.appendChild(addButton)

  fillFilteredWebsites(urlList)

  addButton.addEventListener('click', () => {
    addFilteredWebsiteLine(urlList)
  })
}

function fillFilteredWebsites (urlList) {
  const filteredWebsites = getFilteredWebsites()
  clearElementChildren(urlList)

  filteredWebsites.forEach((website, _) => {
    addFilteredWebsiteLine(urlList, website, false)
  })
}

function generateFilteredWebsitesButton () {
  const button = document.createElement('button')
  button.id = `${Context.CSS_PREFIX}filtered-websites-btn`

  // Create an SVG element
  const svgNS = 'http://www.w3.org/2000/svg'
  const svg = document.createElementNS(svgNS, 'svg')
  svg.setAttribute('version', '1.1')
  svg.setAttribute('id', 'Capa_1')
  svg.setAttribute('xmlns', svgNS)
  svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink')
  svg.setAttribute('width', '800px')
  svg.setAttribute('height', '800px')
  svg.setAttribute('viewBox', '0 0 45.973 45.973')
  svg.setAttribute('xml:space', 'preserve')
  svg.setAttribute('fill', '#FFFFFF')

  const g = document.createElementNS(svgNS, 'g')
  const path = document.createElementNS(svgNS, 'path')

  g.appendChild(path)
  svg.appendChild(g)

  button.appendChild(svg)
  document.body.appendChild(button)
  return button
}

function initFilteredWebsitesSettings () {
  const button = generateFilteredWebsitesButton()
  button.addEventListener('click', showFilteredWebsites)
  const mainContainer = document.querySelector(`#${Context.MAIN_CONTAINER_ID}`)
  mainContainer.appendChild(button)
}

function showFilteredWebsites () {
  makeAllGreetingsInvisible()

  showPopup({
    title: 'Veil of Serenity',
    onPopupFill: onFilteredWebsitesPopupFill,
    onPopupClosed: onFilteredWebsitesPopupClosed,
    closeBtnLabel: 'Seal'
  })
}

function sanitizeDomain (rawDomain) {
  if (typeof rawDomain !== 'string' || rawDomain.trim().length === 0) {
    return null
  }

  return rawDomain
}

function sanitizeInputMode (rawInputMode) {
  const inputMode = parseInt(rawInputMode)

  if (
    isNaN(inputMode) ||
    (inputMode !== InputMode.PLAIN_TEXT && inputMode !== InputMode.REGEX)
  ) {
    return null
  }

  return inputMode
}

function onFilteredWebsitesPopupClosed (id) {
  makeAllGreetingsVisible()

  const urlList = document.querySelector(`#${Context.CSS_PREFIX}url-list-${id}`)
  const websites = []

  for (const rawWebsite of urlList.children) {
    const rawDomain = rawWebsite.querySelector(
      `.${Context.CSS_PREFIX}url-list-domain-input`
    )

    const rawInputMode = rawWebsite.querySelector(
      `.${Context.CSS_PREFIX}url-list-item-input-mode-toggle`
    )

    const domain = sanitizeDomain(rawDomain.value)
    const inputMode = sanitizeInputMode(rawInputMode.value)

    if (domain === null || inputMode === null) {
      continue
    }

    websites.push({ domain, inputMode })
  }

  saveFilteredWebsites(websites)
}

function addFilteredWebsiteLine (urlList, website = null, isAnimation = true) {
  // Generate HTML using DOM node creation methods to keep our browser happy.
  // https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/Safely_inserting_external_content_into_a_page
  const urlItem = document.createElement('div')
  urlItem.className = `${Context.CSS_PREFIX}url-list-item`

  const input = document.createElement('input')
  input.type = 'text'
  input.value = website?.domain || ''
  input.placeholder = 'Domain'
  input.className = `${Context.CSS_PREFIX}url-list-domain-input`

  const inputMode = website?.inputMode ?? InputMode.PLAIN_TEXT
  const modeToggle = document.createElement('button')
  modeToggle.value = inputMode
  modeToggle.className = `${Context.CSS_PREFIX}url-list-item-input-mode-toggle`

  const modeToggleText = document.createElement('span')
  modeToggleText.className = `${Context.CSS_PREFIX}url-list-item-input-mode-toggle-text ${Context.CSS_PREFIX}text-fadable`
  modeToggleText.innerText = getInputModeLabel(inputMode)

  modeToggle.appendChild(modeToggleText)

  let fadeTimeout = 0

  modeToggle.addEventListener('click', () => {
    if (fadeTimeout !== 0) {
      clearTimeout(fadeTimeout)
    }

    const newInputMode =
      parseInt(modeToggle.value) === InputMode.PLAIN_TEXT
        ? InputMode.REGEX
        : InputMode.PLAIN_TEXT

    modeToggleText.classList.add(`${Context.CSS_PREFIX}text-faded`)
    modeToggle.value = newInputMode

    fadeTimeout = setTimeout(() => {
      fadeTimeout = 0
      modeToggleText.innerText = getInputModeLabel(newInputMode)
      modeToggleText.classList.remove(`${Context.CSS_PREFIX}text-faded`)
    }, 100)
  })

  const removeBtn = document.createElement('button')
  removeBtn.className = `${Context.CSS_PREFIX}url-list-item-remove-btn`
  insertTrashIcon(removeBtn)

  removeBtn.addEventListener('click', () => {
    removeFilteredWebsiteLine(urlItem)
  })

  const buttons = document.createElement('div')
  buttons.className = `${Context.CSS_PREFIX}url-list-item-buttons`

  buttons.appendChild(modeToggle)
  buttons.appendChild(removeBtn)

  urlItem.appendChild(input)
  urlItem.appendChild(buttons)

  urlList.appendChild(urlItem)

  urlItem.classList.add(`${Context.CSS_PREFIX}show`)

  if (!isAnimation) {
    urlList.appendChild(urlItem)
    return
  }

  const computedStyle = window.getComputedStyle(urlItem)
  const currentHeight = parseFloat(computedStyle.height)
  const currentPaddingTop = parseFloat(computedStyle.paddingTop)
  const currentPaddingBottom = parseFloat(computedStyle.paddingBottom)
  const currentMarginTop = parseFloat(computedStyle.marginTop)
  const currentMarginBottom = parseFloat(computedStyle.marginBottom)

  const timeoutMs = 700

  addElementSmoothly(
    urlItem,
    currentHeight,
    currentPaddingTop,
    currentPaddingBottom,
    currentMarginTop,
    currentMarginBottom,
    timeoutMs
  )

  // Case: scrolling to the bottom of the page if necessary.
  const intervalId = setInterval(() => {
    scrollToEnd(urlList.parentElement)
  }, 1 / Context.EFFECTS_REFRESH_RATE_HZ)

  const timeoutId = setTimeout(() => {
    clearInterval(intervalId)
    window.removeEventListener('wheel', onScroll)
    window.removeEventListener('scroll', onScroll)
  }, timeoutMs)

  // Case: user decided to scroll.
  const onScroll = () => {
    clearTimeout(timeoutId)
    clearInterval(intervalId)
    window.removeEventListener('wheel', onScroll)
    window.removeEventListener('scroll', onScroll)
  }

  window.addEventListener('wheel', onScroll)
  window.addEventListener('scroll', onScroll)
}

function removeFilteredWebsiteLine (urlItem) {
  removeElementSmoothly(urlItem, 700)
  urlItem.classList.add(`${Context.CSS_PREFIX}removing`)
}

function insertTrashIcon (container) {
  const svgNS = 'http://www.w3.org/2000/svg'
  const svg = document.createElementNS(svgNS, 'svg')

  svg.setAttribute('fill', '#FFFFFF')
  svg.setAttribute('xmlns', svgNS)
  svg.setAttribute('viewBox', '0 0 24 24')
  svg.setAttribute('width', '24px')
  svg.setAttribute('height', '24px')

  svg.appendChild(document.createElementNS(svgNS, 'path'))
  container.appendChild(svg)
}

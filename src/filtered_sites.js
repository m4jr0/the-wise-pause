const FilteredSiteInputMode = Object.freeze({
  UNKNOWN: 0,
  PLAIN_TEXT: 1,
  REGEX: 2,

  getLabel: inputMode => {
    const labels = {
      [FilteredSiteInputMode.UNKNOWN]: 'unknown',
      [FilteredSiteInputMode.PLAIN_TEXT]: 'text',
      [FilteredSiteInputMode.REGEX]: 'regex'
    }

    return labels[inputMode] || '???'
  }
})

class FilteredSites {
  static #FILTERED_WEBSITES_KEY = `${Consts.MAIN_PREFIX}filtered-websites`
  static #cache = null

  static #websiteSort (website1, website2) {
    if (website1.domain < website2.domain) {
      return -1
    }

    if (website1.domain > website2.domain) {
      return 1
    }

    return 0
  }

  static getDefault () {
    return [
      { domain: 'www.9gag.com', inputMode: FilteredSiteInputMode.PLAIN_TEXT },
      {
        domain: 'www.buzzfeed.com',
        inputMode: FilteredSiteInputMode.PLAIN_TEXT
      },
      {
        domain: 'www.discord.com',
        inputMode: FilteredSiteInputMode.PLAIN_TEXT
      },
      {
        domain: 'www.facebook.com',
        inputMode: FilteredSiteInputMode.PLAIN_TEXT
      },
      { domain: 'www.imgur.com', inputMode: FilteredSiteInputMode.PLAIN_TEXT },
      {
        domain: 'www.instagram.com',
        inputMode: FilteredSiteInputMode.PLAIN_TEXT
      },
      {
        domain: 'www.linkedin.com',
        inputMode: FilteredSiteInputMode.PLAIN_TEXT
      },
      {
        domain: 'www.pinterest.com',
        inputMode: FilteredSiteInputMode.PLAIN_TEXT
      },
      { domain: 'www.reddit.com', inputMode: FilteredSiteInputMode.PLAIN_TEXT },
      {
        domain: 'www.snapchat.com',
        inputMode: FilteredSiteInputMode.PLAIN_TEXT
      },
      { domain: 'www.tiktok.com', inputMode: FilteredSiteInputMode.PLAIN_TEXT },
      { domain: 'www.tumblr.com', inputMode: FilteredSiteInputMode.PLAIN_TEXT },
      { domain: 'www.twitch.tv', inputMode: FilteredSiteInputMode.PLAIN_TEXT },
      {
        domain: 'www.twitter.com',
        inputMode: FilteredSiteInputMode.PLAIN_TEXT
      },
      { domain: 'www.vimeo.com', inputMode: FilteredSiteInputMode.PLAIN_TEXT },
      {
        domain: 'www.youtube.com',
        inputMode: FilteredSiteInputMode.PLAIN_TEXT
      },
      { domain: 'x.com', inputMode: FilteredSiteInputMode.PLAIN_TEXT }
    ].sort(FilteredSites.#websiteSort)
  }

  static get () {
    if (FilteredSites.#cache) {
      return FilteredSites.#cache
    }

    const storedWebsites = GM_getValue(FilteredSites.#FILTERED_WEBSITES_KEY)

    if (storedWebsites) {
      try {
        FilteredSites.#cache = JSON.parse(storedWebsites)

        if (Array.isArray(FilteredSites.#cache)) {
          FilteredSites.#cache.sort(FilteredSites.#websiteSort)
          return FilteredSites.#cache
        }
      } catch (error) {
        console.error(
          'Error parsing filtered websites from local storage',
          error
        )
      }
    }

    FilteredSites.#cache = FilteredSites.getDefault()
    return FilteredSites.#cache
  }

  static save (websites) {
    const uniqueWebsites = new Set()

    const cleanedWebsites = websites.filter(website => {
      const isDuplicate = uniqueWebsites.has(website.domain)
      uniqueWebsites.add(website.domain)
      return !isDuplicate
    })

    FilteredSites.#cache = websites
    GM_setValue(
      FilteredSites.#FILTERED_WEBSITES_KEY,
      JSON.stringify(cleanedWebsites)
    )
  }

  static #isWebsiteMatch (url, website) {
    if (website.inputMode === FilteredSiteInputMode.PLAIN_TEXT) {
      if (url.includes(website.domain)) {
        return true
      }
    } else if (website.inputMode === FilteredSiteInputMode.REGEX) {
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

  static isCurrentFiltered () {
    const url = window.location.host
    const filteredWebsites = FilteredSites.get()

    for (const website of filteredWebsites) {
      if (FilteredSites.#isWebsiteMatch(url, website)) {
        return true
      }
    }

    return FilteredSites.get().includes(url)
  }
}

class FilteredWebsiteSanitizer {
  static sanitizeDomain (rawDomain) {
    if (typeof rawDomain !== 'string' || rawDomain.trim().length === 0) {
      return null
    }

    return rawDomain
  }

  static sanitizeInputMode (rawInputMode) {
    const inputMode = parseInt(rawInputMode)

    if (
      isNaN(inputMode) ||
      (inputMode !== FilteredSiteInputMode.PLAIN_TEXT &&
        inputMode !== FilteredSiteInputMode.REGEX)
    ) {
      return null
    }

    return inputMode
  }
}

class FilteredSitesUi {
  static #popupId = 0

  static init () {
    const button = FilteredSitesUi.#generateOpenButton()
    button.addEventListener('click', FilteredSitesUi.toggle)
    const mainContainer = document.querySelector(`#${Consts.MAIN_CONTAINER_ID}`)
    mainContainer.appendChild(button)
  }

  static close () {
    if (FilteredSitesUi.#popupId === 0) {
      return
    }

    Popups.close(FilteredSitesUi.#popupId)
    FilteredSitesUi.#popupId = 0
    GreetingsUi.makeAllVisible()
  }

  static toggle () {
    if (FilteredSitesUi.#popupId) {
      FilteredSitesUi.close()
      return
    }

    GreetingsUi.makeAllInvisible()

    Popups.show({
      title: 'Veil of Serenity',
      onPopupFill: FilteredSitesUi.#onPopupFill,
      onPopupClosed: FilteredSitesUi.#onPopupClosed,
      closeBtnLabel: 'Save',
      sideButtons: [
        {
          label: 'Cancel',
          onClick: FilteredSitesUi.close
        },
        {
          className: `${Consts.MAIN_PREFIX}url-list-restore-defaults-btn`,
          label: 'Restore defaults',
          onClick: id => {
            FilteredSitesUi.#fill(
              document.querySelector(FilteredSitesUi.#generateUrlListId(id)),
              FilteredSites.getDefault()
            )
          }
        }
      ]
    })
  }

  // Popup events.
  static #onPopupFill (id, popup) {
    // Generate HTML using DOM node creation methods to keep our browser happy.
    // https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/Safely_inserting_external_content_into_a_page
    const urlList = document.createElement('div')
    urlList.id = `${Consts.MAIN_PREFIX}url-list-${id}`
    urlList.className = `${Consts.MAIN_PREFIX}url-list no-spacing`
    popup.appendChild(urlList)

    const addSection = document.createElement('div')
    addSection.className = `${Consts.MAIN_PREFIX}url-list-add-section no-spacing`
    popup.appendChild(addSection)

    const addButton = document.createElement('button')
    addButton.className = `${Consts.MAIN_PREFIX}url-list-item-add-btn`
    addButton.textContent = '+'
    addSection.appendChild(addButton)

    FilteredSitesUi.#fill(urlList, FilteredSites.get())

    addButton.addEventListener('click', () => {
      FilteredSitesUi.#addWebsiteLine(urlList)
    })

    FilteredSitesUi.#popupId = id
  }

  static #onPopupClosed (id) {
    GreetingsUi.makeAllVisible()

    const urlList = document.querySelector(
      FilteredSitesUi.#generateUrlListId(id)
    )
    const websites = []

    for (const rawWebsite of urlList.children) {
      const rawDomain = rawWebsite.querySelector(
        `.${Consts.MAIN_PREFIX}url-list-domain-input`
      )

      const rawInputMode = rawWebsite.querySelector(
        `.${Consts.MAIN_PREFIX}url-list-item-input-mode-toggle`
      )

      const domain = FilteredWebsiteSanitizer.sanitizeDomain(rawDomain.value)
      const inputMode = FilteredWebsiteSanitizer.sanitizeInputMode(
        rawInputMode.value
      )

      if (domain === null || inputMode === null) {
        continue
      }

      websites.push({ domain, inputMode })
    }

    FilteredSites.save(websites)
  }

  // Utils.
  static #fill (urlList, filteredWebsites) {
    DomUtils.clearElementChildren(urlList)

    filteredWebsites.forEach((website, _) => {
      FilteredSitesUi.#addWebsiteLine(urlList, website, false)
    })
  }

  static #addWebsiteLine (urlList, website = null, isAnimation = true) {
    // Generate HTML using DOM node creation methods to keep our browser happy.
    // https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/Safely_inserting_external_content_into_a_page
    const urlItem = document.createElement('div')
    urlItem.className = `${Consts.MAIN_PREFIX}url-list-item`

    const input = document.createElement('input')
    input.type = 'text'
    input.value = website?.domain || ''
    input.placeholder = 'Domain'
    input.className = `${Consts.MAIN_PREFIX}url-list-domain-input`

    const inputMode = website?.inputMode ?? FilteredSiteInputMode.PLAIN_TEXT
    const modeToggle = document.createElement('button')
    modeToggle.value = inputMode
    modeToggle.className = `${Consts.MAIN_PREFIX}url-list-item-input-mode-toggle`

    const modeToggleText = document.createElement('span')
    modeToggleText.className = `${Consts.MAIN_PREFIX}url-list-item-input-mode-toggle-text ${Consts.MAIN_PREFIX}text-fadable`
    modeToggleText.innerText = FilteredSiteInputMode.getLabel(inputMode)

    modeToggle.appendChild(modeToggleText)

    let fadeTimeout = 0

    modeToggle.addEventListener('click', () => {
      if (fadeTimeout !== 0) {
        clearTimeout(fadeTimeout)
      }

      const newInputMode =
        parseInt(modeToggle.value) === FilteredSiteInputMode.PLAIN_TEXT
          ? FilteredSiteInputMode.REGEX
          : FilteredSiteInputMode.PLAIN_TEXT

      modeToggleText.classList.add(`${Consts.MAIN_PREFIX}text-faded`)
      modeToggle.value = newInputMode

      fadeTimeout = setTimeout(() => {
        fadeTimeout = 0
        modeToggleText.innerText = FilteredSiteInputMode.getLabel(newInputMode)
        modeToggleText.classList.remove(`${Consts.MAIN_PREFIX}text-faded`)
      }, 100)
    })

    const removeBtn = document.createElement('button')
    removeBtn.className = `${Consts.MAIN_PREFIX}url-list-item-remove-btn`
    FilteredSitesUi.#insertTrashIcon(removeBtn)

    removeBtn.addEventListener('click', () => {
      FilteredSitesUi.#removeWebsiteLine(urlItem)
    })

    const buttons = document.createElement('div')
    buttons.className = `${Consts.MAIN_PREFIX}url-list-item-buttons`

    buttons.appendChild(modeToggle)
    buttons.appendChild(removeBtn)

    urlItem.appendChild(input)
    urlItem.appendChild(buttons)

    urlList.appendChild(urlItem)

    urlItem.classList.add(`${Consts.MAIN_PREFIX}show`)

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

    AnimationUtils.addElementSmoothly(
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
      DomUtils.scrollToEnd(urlList.parentElement)
    }, 1 / AnimationUtils.EFFECTS_REFRESH_RATE_HZ)

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

  static #removeWebsiteLine (urlItem) {
    AnimationUtils.removeElementSmoothly(urlItem, 700)
    urlItem.classList.add(`${Consts.MAIN_PREFIX}removing`)
  }

  static #generateUrlListId (popupId) {
    return `#${Consts.MAIN_PREFIX}url-list-${popupId}`
  }

  static #generateOpenButton () {
    const button = document.createElement('button')
    button.id = `${Consts.MAIN_PREFIX}filtered-websites-btn`

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

    // Path is actually done in the CSS.
    const path = document.createElementNS(svgNS, 'path')

    g.appendChild(path)
    svg.appendChild(g)

    button.appendChild(svg)
    document.body.appendChild(button)
    return button
  }

  static #insertTrashIcon (container) {
    const svgNS = 'http://www.w3.org/2000/svg'
    const svg = document.createElementNS(svgNS, 'svg')

    svg.setAttribute('fill', '#FFFFFF')
    svg.setAttribute('xmlns', svgNS)
    svg.setAttribute('viewBox', '0 0 24 24')
    svg.setAttribute('width', '24px')
    svg.setAttribute('height', '24px')

    // Path is actually done in the CSS.
    svg.appendChild(document.createElementNS(svgNS, 'path'))
    container.appendChild(svg)
  }
}

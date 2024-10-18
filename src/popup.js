class Popups {
  static #closeCallbacks = {}

  static show = (() => {
    let id = 0

    return descr => {
      ++id

      const ids = {
        id,
        popupId: `${Consts.MAIN_PREFIX}popup-${id}`,
        containerId: `${Consts.MAIN_PREFIX}popup-${id}-container`,
        closeBtnId: `${Consts.MAIN_PREFIX}popup-${id}-close-btn`
      }

      Popups.#generateHtml(ids, descr)
      const popupContainer = document.querySelector(`#${ids.containerId}`)
      const closeBtn = document.querySelector(`#${ids.closeBtnId}`)

      const onClosingPopup = () => {
        closeBtn.removeEventListener('click', onClosingPopup)
        delete Popups.#closeCallbacks[id]

        document
          .querySelector(`#${ids.popupId}`)
          .classList.remove(`${Consts.MAIN_PREFIX}open`)

        popupContainer.style.pointerEvents = 'none'

        setTimeout(() => {
          popupContainer.remove()
        }, 2000)
      }

      const onPopupClosed = (isClosedManually = false) => {
        onClosingPopup()
        descr.onPopupClosed?.(id)
      }

      closeBtn.addEventListener('click', onPopupClosed)
      Popups.#closeCallbacks[id] = onClosingPopup

      // Use setTimeout(0) to ensure the CSS animation is triggered after DOM updates.
      setTimeout(() => {
        document
          .querySelector(`#${ids.popupId}`)
          .classList.add(`${Consts.MAIN_PREFIX}open`)
      }, 0)
    }
  })()

  static close (id) {
    if (!Object.hasOwn(Popups.#closeCallbacks, id)) {
      return
    }

    Popups.#closeCallbacks[id]()
  }

  static #generateHtml (ids, descr) {
    // Generate HTML using DOM node creation methods to keep our browser happy.
    // https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/Safely_inserting_external_content_into_a_page
    const mainContainer = document.querySelector(`#${Consts.MAIN_CONTAINER_ID}`)

    const popupContainer = document.createElement('div')
    popupContainer.id = ids.containerId
    popupContainer.className = `${Consts.MAIN_PREFIX}popup-container`
    mainContainer.appendChild(popupContainer)

    const popup = document.createElement('div')
    popup.id = ids.popupId
    popup.className = `${Consts.MAIN_PREFIX}popup`

    if (descr.classes) {
      popup.className += ` ${descr.classes}`
    }

    popupContainer.appendChild(popup)

    const title = descr.title || 'A Notice to Consider.'
    const titleElement = document.createElement('h2')
    titleElement.textContent = title
    popup.appendChild(titleElement)

    const popupContent = document.createElement('div')
    popupContent.className = `${Consts.MAIN_PREFIX}popup-content`

    popup.appendChild(popupContent)

    descr.onPopupFill(ids.id, popupContent)

    const popupFooter = document.createElement('div')
    popupFooter.className = `${Consts.MAIN_PREFIX}popup-footer`

    const sideButtonsContainer = document.createElement('div')
    sideButtonsContainer.className = `${Consts.MAIN_PREFIX}popup-footer-side-btns`

    if (descr.sideButtons) {
      for (const sideButtonDescr of descr.sideButtons) {
        const sideButton = document.createElement('button')

        if (sideButtonDescr.id) {
          sideButton.id = sideButtonDescr.id
        }

        sideButton.className = `${Consts.MAIN_PREFIX}popup-footer-btn ${Consts.MAIN_PREFIX}popup-footer-side-btn`

        if (sideButtonDescr.className) {
          sideButton.className += ` ${sideButtonDescr.className}`
        }

        sideButton.textContent = sideButtonDescr.label || ''

        if (sideButtonDescr.onClick) {
          sideButton.addEventListener('click', () => {
            sideButtonDescr.onClick(ids.id)
          })
        }

        sideButtonsContainer.appendChild(sideButton)
      }
    }

    popupFooter.appendChild(sideButtonsContainer)

    const closeButton = document.createElement('button')
    closeButton.id = ids.closeBtnId
    closeButton.className = `${Consts.MAIN_PREFIX}popup-footer-btn`
    closeButton.textContent = descr.closeBtnLabel || 'Dismiss'
    popupFooter.appendChild(closeButton)

    popup.appendChild(popupFooter)
    return popupContainer
  }
}

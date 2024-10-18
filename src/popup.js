function generatePopupHtml (ids, descr) {
  // Generate HTML using DOM node creation methods to keep our browser happy.
  // https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/Safely_inserting_external_content_into_a_page
  const mainContainer = document.querySelector(`#${Context.MAIN_CONTAINER_ID}`)

  const popupContainer = document.createElement('div')
  popupContainer.id = ids.containerId
  popupContainer.className = `${Context.CSS_PREFIX}popup-container`
  mainContainer.appendChild(popupContainer)

  const popup = document.createElement('div')
  popup.id = ids.popupId
  popup.className = `${Context.CSS_PREFIX}popup`

  if (descr.classes) {
    popup.className += ` ${descr.classes}`
  }

  popupContainer.appendChild(popup)

  const title = descr.title || 'A Notice to Consider.'
  const titleElement = document.createElement('h2')
  titleElement.textContent = title
  popup.appendChild(titleElement)

  const popupContent = document.createElement('div')
  popupContent.className = `${Context.CSS_PREFIX}popup-content`

  popup.appendChild(popupContent)

  descr.onPopupFill(ids.id, popupContent)

  const popupFooter = document.createElement('div')
  popupFooter.className = `${Context.CSS_PREFIX}popup-footer`

  const closeButton = document.createElement('button')
  closeButton.id = ids.closeBtnId
  closeButton.className = `${Context.CSS_PREFIX}popup-close-btn`
  closeButton.textContent = descr.closeBtnLabel || 'Dismiss'
  popupFooter.appendChild(closeButton)

  popup.appendChild(popupFooter)
  return popupContainer
}

const showPopup = (() => {
  let id = 0

  return descr => {
    ++id

    const ids = {
      id,
      popupId: `${Context.CSS_PREFIX}popup-${id}`,
      containerId: `${Context.CSS_PREFIX}popup-${id}-container`,
      closeBtnId: `${Context.CSS_PREFIX}popup-${id}-close-btn`
    }

    generatePopupHtml(ids, descr)
    const popupContainer = document.querySelector(`#${ids.containerId}`)
    const closeBtn = document.querySelector(`#${ids.closeBtnId}`)

    const onClosingPopup = () => {
      closeBtn.removeEventListener('click', onClosingPopup)

      document
        .querySelector(`#${ids.popupId}`)
        .classList.remove(`${Context.CSS_PREFIX}open`)
      descr.onPopupClosed?.(id)
      popupContainer.style.pointerEvents = 'none'

      setTimeout(() => {
        popupContainer.remove()
      }, 2000)
    }

    closeBtn.addEventListener('click', onClosingPopup)

    // Use setTimeout(0) to ensure the CSS animation is triggered after DOM updates.
    setTimeout(() => {
      document
        .querySelector(`#${ids.popupId}`)
        .classList.add(`${Context.CSS_PREFIX}open`)
    }, 0)
  }
})()

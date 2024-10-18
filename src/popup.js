function generatePopupHtml (ids, descr) {
  // Generate HTML using DOM node creation methods to keep our browser happy.
// https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/Safely_inserting_external_content_into_a_page
  const overlay = document.createElement('div')
  overlay.id = ids.overlayId
  overlay.classList.add('twp-popup-overlay')

  const popup = document.createElement('div')
  popup.id = ids.id
  popup.classList.add('twp-popup')
  overlay.appendChild(popup)

  const title = descr.title || 'Hey, you'
  const titleElement = document.createElement('h2')
  titleElement.textContent = title
  popup.appendChild(titleElement)

  const popupContent = document.createElement('div')
  popupContent.classList.add('twp-popup-content')
  popup.appendChild(popupContent)

  descr.onPopupFill(popupContent)

  const popupContainer = document.createElement('div')
  popupContainer.id = ids.containerId
  popupContainer.appendChild(overlay)

  const popupFooter = document.createElement('div')
  popupFooter.classList.add('twp-popup-footer')

  const closeButton = document.createElement('button')
  closeButton.id = ids.closeBtnId
  closeButton.classList.add('twp-popup-close-btn')
  closeButton.textContent = descr.closeBtnLabel || 'Close'
  popupFooter.appendChild(closeButton)

  popup.appendChild(popupFooter)

  return popupContainer
}

const displayPopup = (function () {
  let id = 0
  return function (descr) {
    ++id

    const ids = {
      id: `twp-popup-${id}`,
      overlayId: `twp-popup-${id}-overlay`,
      containerId: `twp-popup-${id}-container`,
      closeBtnId: `twp-popup-${id}-close-btn`,
    }

    document.body.appendChild(generatePopupHtml(ids, descr))

    document
      .querySelector(`#${ids.closeBtnId}`)
      .addEventListener('click', () => {
        document.querySelector(`#${ids.overlayId}`).classList.remove('show')
        document.querySelector(`#${ids.id}`).classList.remove('open')
        document.body.classList.remove('no-scroll')

        setTimeout(() => {
          document.body.removeChild(
            document.querySelector(`#${ids.containerId}`)
          )
        }, 2000)
      })

    document.body.classList.add('no-scroll')

    // Use setTimeout(0) to ensure the CSS animation is triggered after DOM updates.
    setTimeout(() => {
      document.querySelector(`#${ids.overlayId}`).classList.add('show')
      document.querySelector(`#${ids.id}`).classList.add('open')
    }, 0)
  }
})()

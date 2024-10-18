function startup () {
  console.log(
    `“${Context.TWP_APP_NAME}”, version ${Context.TWP_APP_VERSION}, is now in motion. Let us continue with intention. 🧙‍♂️`
  )

  setupForcedBootstrap()

  if (!isCurrentWebsiteAMatch()) {
    return
  }

  bootstrap()
}

function bootstrap () {
  if (Context.isBootstrapped) {
    return
  }

  loadCss()
  generateMainContainer()
  initFilteredWebsitesSettings()
  showGreetings()
  Context.isBootstrapped = true
}

function generateMainContainer () {
  const mainContainer = document.createElement('div')
  mainContainer.id = Context.MAIN_CONTAINER_ID

  document.body.className = `${Context.CSS_PREFIX}no-scroll`
  document.body.appendChild(mainContainer)

  // Use setTimeout(0) to ensure the CSS animation is triggered after DOM updates.
  setTimeout(() => {
    mainContainer.classList.add(`${Context.CSS_PREFIX}show`)
  }, 0)
}

function quit () {
  document.body.classList.remove(`${Context.CSS_PREFIX}no-scroll`)
  const mainContainer = document.querySelector(`#${Context.MAIN_CONTAINER_ID}`)

  const durationMs = 300
  const step = Context.EFFECTS_REFRESH_RATE_HZ
  const fadeStep = 1 / (durationMs / step)
  let fadedChildCount = 0

  Array.from(mainContainer.children).forEach(child => {
    let opacity = parseFloat(window.getComputedStyle(child).opacity)

    const fadeInterval = setInterval(() => {
      opacity -= fadeStep

      if (opacity <= 0) {
        opacity = 0
        clearInterval(fadeInterval)
        fadedChildCount++

        if (fadedChildCount === mainContainer.children.length) {
          mainContainer.remove()
        }
      }

      child.style.opacity = opacity
    }, step)
  })
}

function forceBootstrap () {
  Context.isBootstrapped = false
  bootstrap()
}

function setupForcedBootstrap () {
  let currentSequence = ''
  let lastKeyTime = Date.now()
  const maxInterval = Context.forceCodeKeyStrokeTimeout

  const checkForceCode = key => {
    const now = Date.now()

    if (now - lastKeyTime > maxInterval) {
      currentSequence = ''
    }

    lastKeyTime = now
    currentSequence += key

    if (currentSequence === Context.forceCode) {
      forceBootstrap()
      currentSequence = ''
    }

    if (currentSequence.length > Context.forceCode.length) {
      currentSequence = ''
    }
  }

  document.addEventListener('keydown', event => {
    if (/^[a-z0-9]$/i.test(event.key)) {
      checkForceCode(event.key.toLowerCase())
    }
  })
}

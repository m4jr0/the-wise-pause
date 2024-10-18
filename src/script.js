class Script {
  static #isBootstrapped = false
  static #forceCode = 'twpforce'
  static #forceCodeKeyStrokeTimeout = 5000

  static start () {
    console.log(
      `“${Consts.APP_NAME}”, version ${Consts.APP_VERSION}, is now in motion. Let us continue with intention. 🧙‍♂️`
    )

    Script.listenToForceCode()

    if (!Intro.hasIntroduced()) {
      Script.bootstrap(true)
      return
    }

    if (!FilteredSites.isCurrentFiltered()) {
      return
    }

    Script.bootstrap()
  }

  static listenToForceCode () {
    let currentSequence = ''
    let lastKeyTime = Date.now()
    const maxInterval = Script.#forceCodeKeyStrokeTimeout
    const forceCode = Script.#forceCode.trim().toLocaleLowerCase()

    const checkForceCode = key => {
      const now = Date.now()

      if (now - lastKeyTime > maxInterval) {
        currentSequence = ''
      }

      lastKeyTime = now
      currentSequence += key.toLowerCase()

      if (
        currentSequence[currentSequence.length - 1] !=
        forceCode[currentSequence.length - 1]
      ) {
        currentSequence = ''
      }

      if (currentSequence.length === forceCode.length) {
        Script.forceBootstrap()
        currentSequence = ''
      }
    }

    document.addEventListener('keydown', event => {
      if (/^[a-z0-9]$/i.test(event.key)) {
        checkForceCode(event.key.toLowerCase())
      }
    })
  }

  static forceBootstrap () {
    if (Script.#isBootstrapped) {
      return
    }

    Script.bootstrap()
  }

  static bootstrap (isIntro = false) {
    if (Script.#isBootstrapped) {
      return
    }

    Css.load()
    Script.generateContainer()
    FilteredSitesUi.init()

    if (isIntro) {
      Intro.introduce()
      Script.#isBootstrapped = true
      return
    }

    GreetingsUi.showOne()
    Script.#isBootstrapped = true
  }

  static generateContainer () {
    const mainContainer = document.createElement('div')
    mainContainer.id = Consts.MAIN_CONTAINER_ID
    mainContainer.className = `${Consts.MAIN_PREFIX}fadable`

    document.body.className = `${Consts.MAIN_PREFIX}no-scroll`
    document.body.appendChild(mainContainer)

    // Use setTimeout(0) to ensure the CSS animation is triggered after DOM updates.
    setTimeout(() => {
      mainContainer.classList.add(`${Consts.MAIN_PREFIX}show`)
    }, 0)
  }

  static quit () {
    document.body.classList.remove(`${Consts.MAIN_PREFIX}no-scroll`)
    const mainContainer = document.querySelector(`#${Consts.MAIN_CONTAINER_ID}`)
    mainContainer.style.opacity = '0'

    setTimeout(() => {
      mainContainer.remove()
      Script.#isBootstrapped = false
    }, 1000)
  }
}

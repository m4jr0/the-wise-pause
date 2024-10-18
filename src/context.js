class Context {
  static TWP_APP_NAME = GM_info.script.name
  static TWP_APP_VERSION = GM_info.script.version
  static EFFECTS_REFRESH_RATE_HZ = 60
  static CSS_PREFIX = 'the-wise-pause-' // Prevent conflicts with current page.
  static FILTERED_WEBSITES_KEY = 'the-wise-pause-filtered-websites'
  static MAIN_CONTAINER_ID = `${Context.CSS_PREFIX}main-container`
  static isBootstrapped = false
  static forceCode = 'twpforce'
  static forceCodeKeyStrokeTimeout = 5000
}

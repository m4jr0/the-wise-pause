class DomUtils {
  static clearElementChildren (element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild)
    }
  }

  static scrollToEnd (element, isVertical = true) {
    if (isVertical && element.scrollHeight > element.clientHeight) {
      element.scrollTop = element.scrollHeight
    } else if (!isVertical && element.scrollWidth > element.clientWidth) {
      element.scrollLeft = element.scrollWidth
    }
  }

  static makeAbsolute (element) {
    const computedStyle = window.getComputedStyle(element)
    const rect = element.getBoundingClientRect()

    const parent = element.offsetParent

    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft

    let parentRect = { top: 0, left: 0 }

    if (parent) {
      parentRect = parent.getBoundingClientRect()
    }

    const absoluteTop = rect.top + scrollTop - (parentRect.top + scrollTop)
    const absoluteLeft = rect.left + scrollLeft - (parentRect.left + scrollLeft)

    element.style.width = computedStyle.width
    element.style.height = computedStyle.heigth

    element.style.position = 'absolute'
    element.style.top = `${absoluteTop}px`
    element.style.left = `${absoluteLeft}px`

    element.style.margin = '0'
    element.style.transform = 'none'
    element.style.float = 'initial'
  }
}

class AnimationUtils {
  static EFFECTS_REFRESH_RATE_HZ = 60

  static addElementSmoothly (
    element,
    targetHeight,
    targetPaddingTop,
    targetPaddingBottom,
    targetMarginTop,
    targetMarginBottom,
    durationMs = 1000,
    refreshRateHz = AnimationUtils.EFFECTS_REFRESH_RATE_HZ
  ) {
    element.style.height = '0px'
    element.style.paddingTop = '0px'
    element.style.paddingBottom = '0px'
    element.style.marginTop = '0px'
    element.style.marginBottom = '0px'
    element.style.overflow = 'hidden'

    AnimationUtils.#animateElementSize(
      element,
      0,
      0,
      0,
      0,
      0,
      targetHeight,
      targetPaddingTop,
      targetPaddingBottom,
      targetMarginTop,
      targetMarginBottom,
      durationMs,
      refreshRateHz
    )
  }

  static removeElementSmoothly (
    element,
    durationMs = 1000,
    refreshRateHz = AnimationUtils.EFFECTS_REFRESH_RATE_HZ
  ) {
    const computedStyle = window.getComputedStyle(element)
    const currentHeight = parseFloat(computedStyle.height)
    const currentPaddingTop = parseFloat(computedStyle.paddingTop)
    const currentPaddingBottom = parseFloat(computedStyle.paddingBottom)
    const currentMarginTop = parseFloat(computedStyle.marginTop)
    const currentMarginBottom = parseFloat(computedStyle.marginBottom)

    AnimationUtils.#animateElementSize(
      element,
      currentHeight,
      currentPaddingTop,
      currentPaddingBottom,
      currentMarginTop,
      currentMarginBottom,
      0,
      0,
      0,
      0,
      0,
      durationMs,
      refreshRateHz
    )

    setTimeout(() => {
      element.remove()
    }, durationMs)
  }

  static #animateElementSize (
    element,
    currentHeight,
    currentPaddingTop,
    currentPaddingBottom,
    currentMarginTop,
    currentMarginBottom,
    targetHeight,
    targetPaddingTop,
    targetPaddingBottom,
    targetMarginTop,
    targetMarginBottom,
    durationMs,
    refreshRateHz
  ) {
    const intervalStep = 1 / refreshRateHz
    const stepCount = durationMs / 1000 / intervalStep

    const heightDelta = (targetHeight - currentHeight) / stepCount

    const paddingTopDelta = (targetPaddingTop - currentPaddingTop) / stepCount
    const paddingBottomDelta =
      (targetPaddingBottom - currentPaddingBottom) / stepCount

    const marginTopDelta = (targetMarginTop - currentMarginTop) / stepCount
    const marginBottomDelta =
      (targetMarginBottom - currentMarginBottom) / stepCount

    const intervalId = setInterval(() => {
      if (Math.abs(currentHeight - targetHeight) < Math.abs(heightDelta)) {
        currentHeight = targetHeight
      } else {
        currentHeight += heightDelta
      }

      element.style.height = `${currentHeight}px`

      if (
        Math.abs(currentPaddingTop - targetPaddingTop) <
        Math.abs(paddingTopDelta)
      ) {
        currentPaddingTop = targetPaddingTop
      } else {
        currentPaddingTop += paddingTopDelta
      }

      element.style.paddingTop = `${currentPaddingTop}px`

      if (
        Math.abs(currentPaddingBottom - targetPaddingBottom) <
        Math.abs(paddingBottomDelta)
      ) {
        currentPaddingBottom = targetPaddingBottom
      } else {
        currentPaddingBottom += paddingBottomDelta
      }

      element.style.paddingBottom = `${currentPaddingBottom}px`

      if (
        Math.abs(currentMarginTop - targetMarginTop) < Math.abs(marginTopDelta)
      ) {
        currentMarginTop = targetMarginTop
      } else {
        currentMarginTop += marginTopDelta
      }

      element.style.marginTop = `${currentMarginTop}px`

      if (
        Math.abs(currentMarginBottom - targetMarginBottom) <
        Math.abs(marginBottomDelta)
      ) {
        currentMarginBottom = targetMarginBottom
      } else {
        currentMarginBottom += marginBottomDelta
      }

      element.style.marginBottom = `${currentMarginBottom}px`

      if (
        currentHeight === targetHeight &&
        currentPaddingTop === targetPaddingTop &&
        currentPaddingBottom === targetPaddingBottom &&
        currentMarginTop === targetMarginTop &&
        currentMarginBottom === targetMarginBottom
      ) {
        clearInterval(intervalId)
      }
    }, intervalStep)
  }
}

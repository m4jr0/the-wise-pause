class Css {
  static isLoaded = false
}

const CSS = `
:root {
  --global-text-color: black;
  --global-background-color: lightgray;

  --global-btn-color: #007bff;
  --global-btn-hover-color: #0056b3;
}

body.no-scroll {
  overflow: hidden;
}

#twp-container,
#twp-container * {
  all: initial;
  color: var(--global-text-color);
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI",
    "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
}

#twp-container p {
  display: block;
  margin-block-end: 1em;
  margin-block-start: 1em;
  margin-inline-end: 0px;
  margin-inline-start: 0px;
  unicode-bidi: isolate;
}

#twp-container h2 {
  display: block;
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 0.83em;
  margin-left: 0;
  margin-right: 0;
}

#twp-overlay {
  all: unset;
  backdrop-filter: blur(0px);
  background: rgba(110, 110, 110, 0);
  box-sizing: border-box;
  display: block;
  height: 100vh;
  left: 0;
  margin: 0;
  padding: 0;
  position: fixed;
  top: 0;
  transition: background 0.7s ease, backdrop-filter 0.7 ease;
  width: 100vw;
  z-index: 99999 !important;
}

#twp-overlay.show {
  backdrop-filter: blur(10px);
  background: radial-gradient(circle, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
  display: block;
}

#twp-popup {
  background: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.7);
  display: block;
  margin: 10px auto;
  max-width: 600px;
  opacity: 0;
  padding: 20px;
  padding: 20px;
  transform: translateY(calc(50% - 50px));
  transition: transform 0.7s ease, opacity 0.7s ease;
}

#twp-popup.open {
  opacity: 1;
  transform: translateY(50%);
}

#twp-popup-close-btn {
  background-color: var(--global-btn-color);
  border-radius: 5px;
  border: none;
  color: white;
  cursor: pointer;
  margin-top: 10px;
  padding: 10px;
}

#twp-popup-close-btn:hover {
  background-color: var(--global-btn-hover-color);
}

#twp-popup-footer {
  all: unset;
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
}

.twp-quote {
  font-style: italic !important;
}
`

function loadCss() {
  if (Css.isLoaded) {
    return
  }

  const element = document.createElement('style')
  element.appendChild(document.createTextNode(CSS))

  document.head.appendChild(element)
  Css.isLoaded = true
}

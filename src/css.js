class Css {
  static isLoaded = false

  static data = `:root {
  --${Consts.MAIN_PREFIX}global-text-color: #212121;
  --${Consts.MAIN_PREFIX}global-background-color: #ffffff;

  --${Consts.MAIN_PREFIX}global-btn-color: #2979ff;
  --${Consts.MAIN_PREFIX}global-btn-text-color: #ffffff;
  --${Consts.MAIN_PREFIX}global-btn-hover-color: #1565c0;
  --${Consts.MAIN_PREFIX}global-remove-btn-color: #e53935;
  --${Consts.MAIN_PREFIX}global-remove-btn-hover-color: #d50000;

  --${Consts.MAIN_PREFIX}global-neutral-btn-color: #B0BEC5;
  --${Consts.MAIN_PREFIX}global-neutral-btn-text-color: #37474F;
  --${Consts.MAIN_PREFIX}global-neutral-btn-hover-color: #CFD8DC;

  --${Consts.MAIN_PREFIX}filtered-websites-btn-color: #455A64;
  --${Consts.MAIN_PREFIX}filtered-websites-btn-hover-color: #263238;

  --${Consts.MAIN_PREFIX}global-scrollbar-color: #e0e0e0;

  --${Consts.MAIN_PREFIX}global-text-input-color: #f1f1f1;

  --${Consts.MAIN_PREFIX}global-font: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI",
    "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;

  --${Consts.MAIN_PREFIX}global-scroll-behavior: smooth;
}

body.${Consts.MAIN_PREFIX}no-scroll {
  overflow: hidden;
}

/* Do not move this block—it resets all styles. */
/* The styles are reset to avoid interference from the website's existing CSS. */
#${Consts.MAIN_CONTAINER_ID} {
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
  transition: background 0.7s ease, backdrop-filter 0.7s ease, opacity 0.5s ease;
  width: 100vw;
  z-index: 99999;
}

#${Consts.MAIN_CONTAINER_ID} * {
  all: unset;
  color: var(--${Consts.MAIN_PREFIX}global-text-color);
  font-family: var(--${Consts.MAIN_PREFIX}global-font);
  scroll-behavior: var(--${Consts.MAIN_PREFIX}global-scroll-behavior);
}

#${Consts.MAIN_CONTAINER_ID} .${Consts.MAIN_PREFIX}emphasized-text {
  font-weight: bold;
}
  
#${Consts.MAIN_CONTAINER_ID} .${Consts.MAIN_PREFIX}force-code {
  background-color: black;
  color: white;
  padding: 2px 5px;
  font-family: "Courier New", Courier, monospace;
  border-radius: 3px;
}

#${Consts.MAIN_CONTAINER_ID}.${Consts.MAIN_PREFIX}show {
  backdrop-filter: blur(10px);
  background: radial-gradient(circle, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
  display: block;
}

#${Consts.MAIN_CONTAINER_ID} .${Consts.MAIN_PREFIX}text-fadable {
  transition: opacity 0.1s ease, transform 0.1s ease;
}

#${Consts.MAIN_CONTAINER_ID} .${Consts.MAIN_PREFIX}text-faded {
  opacity: 0;
  transform: scale(0.9);
}

#${Consts.MAIN_CONTAINER_ID} .${Consts.MAIN_PREFIX}fadable {
  transition: opacity 0.1s ease;
}

#${Consts.MAIN_CONTAINER_ID} .${Consts.MAIN_PREFIX}faded {
  opacity: 0 !important;
}

#${Consts.MAIN_CONTAINER_ID} #${Consts.MAIN_PREFIX}filtered-websites-btn {
  width: 25px;
  height: 25px;
  background-color: var(--${Consts.MAIN_PREFIX}filtered-websites-btn-color);
  border-radius: 50%;
  position: fixed;
  bottom: 20px;
  right: 20px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}
  
#${Consts.MAIN_CONTAINER_ID} #${Consts.MAIN_PREFIX}filtered-websites-btn:hover {
  background-color: var(--${Consts.MAIN_PREFIX}filtered-websites-btn-hover-color);
}

#${Consts.MAIN_PREFIX}filtered-websites-btn svg {
  height: 20px;
  width: 20px;
  transition: transform 0.5s ease;
}

#${Consts.MAIN_PREFIX}filtered-websites-btn svg > g > path {
  d: path("M 43.454 18.443 h -2.437 c -0.453 -1.766 -1.16 -3.42 -2.082 -4.933 l 1.752 -1.756 c 0.473 -0.473 0.733 -1.104 0.733 -1.774 c 0 -0.669 -0.262 -1.301 -0.733 -1.773 l -2.92 -2.917 c -0.947 -0.948 -2.602 -0.947 -3.545 -0.001 l -1.826 1.815 C 30.9 6.232 29.296 5.56 27.529 5.128 V 2.52 c 0 -1.383 -1.105 -2.52 -2.488 -2.52 h -4.128 c -1.383 0 -2.471 1.137 -2.471 2.52 v 2.607 c -1.766 0.431 -3.38 1.104 -4.878 1.977 l -1.825 -1.815 c -0.946 -0.948 -2.602 -0.947 -3.551 -0.001 L 5.27 8.205 C 4.802 8.672 4.535 9.318 4.535 9.978 c 0 0.669 0.259 1.299 0.733 1.772 l 1.752 1.76 c -0.921 1.513 -1.629 3.167 -2.081 4.933 H 2.501 C 1.117 18.443 0 19.555 0 20.935 v 4.125 c 0 1.384 1.117 2.471 2.501 2.471 h 2.438 c 0.452 1.766 1.159 3.43 2.079 4.943 l -1.752 1.763 c -0.474 0.473 -0.734 1.106 -0.734 1.776 s 0.261 1.303 0.734 1.776 l 2.92 2.919 c 0.474 0.473 1.103 0.733 1.772 0.733 s 1.299 -0.261 1.773 -0.733 l 1.833 -1.816 c 1.498 0.873 3.112 1.545 4.878 1.978 v 2.604 c 0 1.383 1.088 2.498 2.471 2.498 h 4.128 c 1.383 0 2.488 -1.115 2.488 -2.498 v -2.605 c 1.767 -0.432 3.371 -1.104 4.869 -1.977 l 1.817 1.812 c 0.474 0.475 1.104 0.735 1.775 0.735 c 0.67 0 1.301 -0.261 1.774 -0.733 l 2.92 -2.917 c 0.473 -0.472 0.732 -1.103 0.734 -1.772 c 0 -0.67 -0.262 -1.299 -0.734 -1.773 l -1.75 -1.77 c 0.92 -1.514 1.627 -3.179 2.08 -4.943 h 2.438 c 1.383 0 2.52 -1.087 2.52 -2.471 v -4.125 C 45.973 19.555 44.837 18.443 43.454 18.443 Z M 22.976 30.85 c -4.378 0 -7.928 -3.517 -7.928 -7.852 c 0 -4.338 3.55 -7.85 7.928 -7.85 c 4.379 0 7.931 3.512 7.931 7.85 C 30.906 27.334 27.355 30.85 22.976 30.85 Z");
  fill: var(--${Consts.MAIN_PREFIX}global-btn-text-color);
}


#${Consts.MAIN_PREFIX}filtered-websites-btn:hover svg {
  transform: rotate(90deg);
}

.${Consts.MAIN_PREFIX}greetings {
  min-width: 150px !important;
  max-width: 500px !important;
}

#${Consts.MAIN_CONTAINER_ID}::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}

#${Consts.MAIN_CONTAINER_ID}::-webkit-scrollbar-thumb {
  background-color: var(--${Consts.MAIN_PREFIX}global-scrollbar-color);
  border-radius: 10px;
}

#${Consts.MAIN_CONTAINER_ID}::-webkit-scrollbar-track {
  background: transparent;
}

#${Consts.MAIN_CONTAINER_ID}::-webkit-scrollbar-button {
  display: none;
  height: 0;
  width: 0;
}

#${Consts.MAIN_CONTAINER_ID},
#${Consts.MAIN_CONTAINER_ID} * {
  scrollbar-color: var(--${Consts.MAIN_PREFIX}global-scrollbar-color) transparent;
  scrollbar-width: thin;
}

#${Consts.MAIN_CONTAINER_ID} button {
  background-color: var(--${Consts.MAIN_PREFIX}global-btn-color);
  border-radius: 5px;
  border: none;
  color: var(--${Consts.MAIN_PREFIX}global-btn-text-color);
  cursor: pointer;
  font-size: 16px;
  padding: 10px;
  transition: background-color 0.3s ease;
}
  
#${Consts.MAIN_CONTAINER_ID} h2 {
  display: block;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 0.83em;
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
}

#${Consts.MAIN_CONTAINER_ID} button:hover {
  background-color: var(--${Consts.MAIN_PREFIX}global-btn-hover-color);
}

#${Consts.MAIN_CONTAINER_ID} p {
  display: block;
  font-size: 16px;
  margin-block-end: 1em;
  margin-block-start: 1em;
  margin-inline-end: 0px;
  margin-inline-start: 0px;
  unicode-bidi: isolate;
}

#${Consts.MAIN_CONTAINER_ID} .${Consts.MAIN_PREFIX}no-spacing {
  margin: 0;
  padding: 0;
}

#${Consts.MAIN_CONTAINER_ID} .${Consts.MAIN_PREFIX}popup {
  background: var(--${Consts.MAIN_PREFIX}global-background-color);
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.7);
  display: block;
  display: flex;
  flex-direction: column;
  left: 50%;
  opacity: 0;
  padding: 20px;
  position: fixed;
  top: 50%;
  transform: translate(-50%, calc(-50% - 50px));
  transition: transform 0.7s ease, opacity 0.7s ease;
}

@media screen and (min-width: 732px) {
  #${Consts.MAIN_CONTAINER_ID} .${Consts.MAIN_PREFIX}popup {
    max-height: 80vh;
    max-width: 50%;
    min-height: 20vh;
    min-width: 30%;
  }
}

@media screen and (min-width: 442px) and (max-width: 732px) {
  #${Consts.MAIN_CONTAINER_ID} .${Consts.MAIN_PREFIX}popup {
    max-height: 80%;
    width: 366px;
  }
}

@media screen and (max-width: 442px) {
  #${Consts.MAIN_CONTAINER_ID} .${Consts.MAIN_PREFIX}popup {
    max-height: 80%;
    min-width: 221px;
    width: 80%;
  }
}

#${Consts.MAIN_CONTAINER_ID} .${Consts.MAIN_PREFIX}popup.${Consts.MAIN_PREFIX}open {
  opacity: 1;
  transform: translate(-50%, -50%);
}

#${Consts.MAIN_CONTAINER_ID} .${Consts.MAIN_PREFIX}popup-content {
  display: block;
  flex-grow: 1;
  margin: 0;
  overflow-y: auto;
}

#${Consts.MAIN_CONTAINER_ID} .${Consts.MAIN_PREFIX}popup-footer {
  display: flex;
  flex-direction: row;
  margin-top: 12px;
  justify-content: space-between;
  width: 100%;
}

#${Consts.MAIN_CONTAINER_ID} .${Consts.MAIN_PREFIX}popup-footer-btn {
  margin-top: 10px;
  padding: 10px;
  transition: background-color 0.3s ease;
}

#${Consts.MAIN_CONTAINER_ID} .${Consts.MAIN_PREFIX}popup-footer-side-btn {
  background-color: var(--${Consts.MAIN_PREFIX}global-neutral-btn-color);
  color: var(--${Consts.MAIN_PREFIX}global-neutral-btn-text-color);
}

#${Consts.MAIN_CONTAINER_ID} .${Consts.MAIN_PREFIX}popup-footer-side-btn:hover {
  background-color: var(--${Consts.MAIN_PREFIX}global-neutral-btn-hover-color);
}

#${Consts.MAIN_CONTAINER_ID} .${Consts.MAIN_PREFIX}popup-footer-side-btns {
  display: flex;
  gap: 10px;
  justify-content: flex-start;
}

#${Consts.MAIN_CONTAINER_ID} .${Consts.MAIN_PREFIX}quote {
  font-style: italic;
}

#${Consts.MAIN_CONTAINER_ID} .${Consts.MAIN_PREFIX}url-list {
  margin-bottom: 15px;
  transition: width 0.5s ease, height 0.5s ease;
}

#${Consts.MAIN_CONTAINER_ID} .${Consts.MAIN_PREFIX}url-list-domain-input {
  background: transparent;
  border: none;
  font-size: 16px;
  padding: 5px;
  width: 70%;
}

#${Consts.MAIN_CONTAINER_ID} .${Consts.MAIN_PREFIX}url-list-item {
  align-items: center;
  background: var(--${Consts.MAIN_PREFIX}global-text-input-color);
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  opacity: 0;
  padding-top: 10px;
  padding: 15px;
  transition: opacity 0.3s;
}

#${Consts.MAIN_CONTAINER_ID}  .${Consts.MAIN_PREFIX}with-scrollbar .${Consts.MAIN_PREFIX}url-list-item {
  margin-right: 10px;
}

#${Consts.MAIN_CONTAINER_ID}  .${Consts.MAIN_PREFIX}with-scrollbar .${Consts.MAIN_PREFIX}url-list-add-section {
  margin-right: 10px;
}

#${Consts.MAIN_CONTAINER_ID} .${Consts.MAIN_PREFIX}url-list-item.${Consts.MAIN_PREFIX}show {
  opacity: 1;
}

#${Consts.MAIN_CONTAINER_ID} .${Consts.MAIN_PREFIX}url-list-item.${Consts.MAIN_PREFIX}removing {
  opacity: 0;
}

#${Consts.MAIN_CONTAINER_ID} .${Consts.MAIN_PREFIX}url-list-item-add-btn {
  background: #ECEFF1;
  border: none;
  border-radius: 5px;
  color: #263238;
  cursor: pointer;
  display: block;
  font-size: 1.3em;
  font-weight: 300;
  height: 34px;
  padding-bottom: 10px;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
  transition: background-color 0.3s ease;
  width: 100%;
}

#${Consts.MAIN_CONTAINER_ID} .${Consts.MAIN_PREFIX}url-list-item-add-btn:hover {
  background: #CFD8DC;
}

#${Consts.MAIN_CONTAINER_ID} .${Consts.MAIN_PREFIX}url-list-add-section {
  display: block;
}

#${Consts.MAIN_CONTAINER_ID} .${Consts.MAIN_PREFIX}url-list-item-buttons {
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

#${Consts.MAIN_CONTAINER_ID} .${Consts.MAIN_PREFIX}url-list-item-input-mode-toggle {
  border: none;
  border-radius: 15px;
  color: var(--${Consts.MAIN_PREFIX}global-btn-text-color);
  cursor: pointer;
  font-size: 12px;
  margin-left: 5px;
  margin-right: 10px;
  overflow: hidden;
  padding: 5px 10px;
  text-align: center;
  text-overflow: ellipsis;
  text-transform: capitalize;
  white-space: nowrap;
  width: 50px;
}

#${Consts.MAIN_CONTAINER_ID} .${Consts.MAIN_PREFIX}url-list-item-input-mode-toggle-text {
  color: var(--${Consts.MAIN_PREFIX}global-btn-text-color);
  display: inline-block;
}

#${Consts.MAIN_CONTAINER_ID} .${Consts.MAIN_PREFIX}url-list-item-remove-btn {
  align-items: center;
  background-color: var(--${Consts.MAIN_PREFIX}global-remove-btn-color);
  border-radius: 50%;
  border: none;
  color: var(--${Consts.MAIN_PREFIX}global-btn-text-color);
  cursor: pointer;
  display: flex;
  justify-content: center;
  transition: background-color 0.3s ease;
  height: 5px;
  width: 5px;
}

#${Consts.MAIN_CONTAINER_ID} .${Consts.MAIN_PREFIX}url-list-item-remove-btn svg {
  height: 13px;
  width: 13px;
}

#${Consts.MAIN_CONTAINER_ID} .${Consts.MAIN_PREFIX}url-list-item-remove-btn svg > path {
  d: path("M 10 2 L 9 3 L 4 3 L 4 5 L 7 5 L 17 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 Z M 5 7 L 5 22 L 19 22 L 19 7 L 5 7 Z");
  fill: var(--${Consts.MAIN_PREFIX}global-btn-text-color);
}

#${Consts.MAIN_CONTAINER_ID} .${Consts.MAIN_PREFIX}url-list-item-remove-btn:hover {
  background-color: var(--${Consts.MAIN_PREFIX}global-remove-btn-hover-color);
}

#${Consts.MAIN_CONTAINER_ID} .${Consts.MAIN_PREFIX}url-list-restore-defaults-btn {
  background: none;
}

#${Consts.MAIN_CONTAINER_ID} .${Consts.MAIN_PREFIX}url-list-restore-defaults-btn:hover {
  background: none;
  color: var(--${Consts.MAIN_PREFIX}global-neutral-btn-color);
}
`

  static load () {
    if (Css.isLoaded) {
      return
    }

    const element = document.createElement('style')
    element.appendChild(document.createTextNode(Css.data))

    document.head.appendChild(element)
    Css.isLoaded = true
  }
}

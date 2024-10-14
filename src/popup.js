function displayPopup() {
  const greetings = generateGreetings()
  alert(`${greetings.getIntro()}\n\n${greetings.getFullQuote()}”`)
}

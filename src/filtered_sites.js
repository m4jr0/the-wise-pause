function getFilteredWebsites() {
  // TODO(m4jr0): Retrieve list from somewhere else.
  return [
    'www.reddit.com',
    'www.youtube.com',
    'www.facebook.com',
    'www.twitter.com',
    'www.x.com',
  ]
}

function isCurrentWebsiteMatch() {
  const url = window.location.hostname
  return getFilteredWebsites().includes(url)
}

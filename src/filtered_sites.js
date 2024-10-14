function getFilteredWebsites() {
  // TODO(m4jr0): Retrieve list from somewhere else.
  return [
    'www.reddit.com',
    'www.youtube.com',
    'www.facebook.com',
    'www.twitter.com',
    'x.com',
  ]
}

function isCurrentWebsiteMatch() {
  const url = window.location.host
  return getFilteredWebsites().includes(url)
}

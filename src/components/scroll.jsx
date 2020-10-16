export function scrollToTop() {
  // if (!global.scrollTo) { global.scrollTo= (() => {}) }
  window.scrollTo(0, 0)
}

export function scrollToBottom() {
  // if (!global.scrollTo) { global.scrollTo= (() => {}) }
  window.scrollTo(0, document.body.scrollHeight)
}

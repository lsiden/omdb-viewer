export function queryFromUriPath(path) {
  const match = /\/search\/([^/?]+)/.exec(decodeURI(path))
  return match ? match[1] : ''
}

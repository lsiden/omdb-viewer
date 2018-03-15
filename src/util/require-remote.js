// Require a module from the nodejs/electron main process, not the Webpack bundle.
// This can expose the app to security risks.
// The called must be careful not to load code from untrusted sources.
// path should be to a library we have installed and trust.
// See https://electronjs.org/docs/tutorial/security

export default function(path) {
  return window.require ? window.require(path) : null
}

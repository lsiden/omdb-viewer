import { configure } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import mockFetch from "jest-fetch-mock"
import finallyPolyfill from "promise.prototype.finally"

configure({ adapter: new Adapter() })
global.fetch = mockFetch

// promise.prototoype.finally is not yet available in node.js.
// This prevents tests from breaking.
// It is a no-op when .finally() is already defined.
finallyPolyfill.shim()

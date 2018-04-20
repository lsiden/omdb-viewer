import { configure } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
// import mockFetch from "jest-fetch-mock"

// jest.mock("abort-controller", () => class {})
// jest.mock("event-target-shim", () => {})

console.log("setupTests.js")

configure({ adapter: new Adapter() })
// global.fetch = mockFetch

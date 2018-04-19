import { configure } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

configure({ adapter: new Adapter() })

jest.mock("abort-controller", () => class {})
jest.mock("event-target-shim", () => {})

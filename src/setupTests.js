Object.defineProperty(window, 'scrollTo', { value: () => {}, writable: true })

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
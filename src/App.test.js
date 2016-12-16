import React from 'react';
import ReactDOM from 'react-dom';
// import App from './components/index';
import Home from './components/Home'
// import Home from './components/Home';
import ReactTestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
// import { Link } from 'react-router'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Home />, div);
});

// it('renders without crashing', () => {
//   const wrapper = shallow(<App />);
//   expect([1, 2, 3]).to.have.length(3);
// });

// it('renders an `.HOME`', () => {
//   const wrapper = shallow(<Home />);
//   expect(wrapper.find('.container')).to.have.length(1);
// });



// const renderer = ReactTestUtils.createRenderer();
// renderer.render(<App />);
// const result = renderer.getRenderOutput();
//
// expect(result.props.children).toEqual([
//   <div className="container"></div>
// ]);

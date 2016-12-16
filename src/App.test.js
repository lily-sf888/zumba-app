import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/index';
import Home from './components/Home';
import ReactTestUtils from 'react-addons-test-utils';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

const renderer = ReactTestUtils.createRenderer();
renderer.render(<App />);
const result = renderer.getRenderOutput();
//
// expect(result.props.children).toEqual([
//   <div className="container"></div>
// ]);

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/index';
import Home from './components/Home';
import ReactTestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import Dashboard from './components/protected/Dashboard';
import Favorites from './components/protected/Favorites';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Home />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Dashboard />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Favorites />, div);
});

// test-utils.js
import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from '../redux/reducers';

const render = (
  ui,
  {
    route = '/',
    initialState,
    store = createStore(reducer, initialState),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) =>
    <Provider store={store}>
      <Router >
        {children}
      </Router>
    </Provider>

  // push state to route /
  window.history.pushState({}, '/', route)
  return rtlRender(ui, { wrapper: Wrapper, Router })
};

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }
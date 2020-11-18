import React from 'react';
import userEvent from '@testing-library/user-event'
import { render, screen } from './utils/test-utils';
import initialState from './redux/reducers/initialState';
import App from './App';
import { act } from 'react-dom/test-utils';

test('Should render Login Page', () => {
  act(() => {
    render(<App />, { initialState });
  })
  const element = screen.getByText(/sign in/i, { selector: 'h1' })
  expect(element).toBeInTheDocument();
});

test('Should change to Recovery Page', () => {
  act(() => {
    render(<App />, { initialState });
  })

  const leftClick = { button: 0 }
  userEvent.click(screen.getByText(/forgot password?/i, { selector: 'a' }), leftClick)

  const element = screen.getByText(/recover/i, { selector: 'h1' })
  expect(element).toBeInTheDocument()
})

test('Should change to SingUp Page', () => {
  act(() => {
    render(<App />, { initialState });
  })

  const leftClick = { button: 0 }
  userEvent.click(screen.getByText(/sign up/i, { selector: 'a' }), leftClick)

  const element = screen.getByText(/sign up/i, { selector: 'h1' })
  expect(element).toBeInTheDocument()
})

test('If no route matches return to Login Page as default', () => {
  act(() => {
    render(<App />, { initialState, route: '/something - that - does - not - match' });
  })

  const element = screen.getByText(/sign in/i, { selector: 'h1' })
  expect(element).toBeInTheDocument();
})

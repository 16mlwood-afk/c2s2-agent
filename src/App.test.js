import { render, screen } from '@testing-library/react';
import App from './App';

test('renders C2S2 agent interface', () => {
  render(<App />);
  const headerElement = screen.getByText(/C2S2 Expert Assistant/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders initial welcome message', () => {
  render(<App />);
  const welcomeElement = screen.getByText(/Hello! I'm your C2S2.*expert assistant/i);
  expect(welcomeElement).toBeInTheDocument();
});

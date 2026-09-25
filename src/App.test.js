import { render, screen } from '@testing-library/react';
import App from './App';

test('renders GreenCart homepage branding and headline', () => {
  render(<App />);
  const headline = screen.getByText(/Fresh groceries,/i);
  expect(headline).toBeInTheDocument();
});

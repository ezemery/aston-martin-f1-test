import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

test('renders home component with proper content', () => {
  const { getByText, getByRole } = render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  // Check for content
  expect(getByText('All the formula 1 data you need.')).toBeInTheDocument();
  expect(getByText('Get Started')).toHaveAttribute('href', '/search/race');
  expect(getByText('Data to enrich decisions')).toBeInTheDocument();
  expect(getByText('We use reliable data sources from all race events since 1950')).toBeInTheDocument();
  expect(getByText('Get started')).toBeInTheDocument();
  expect(getByText('Learn more')).toBeInTheDocument();
});

test('renders home component with proper links', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  // Check links
  expect(getByText('Get Started')).toHaveAttribute('href', '/search/race');
  expect(getByText('Learn more')).toHaveAttribute('href', '/search/race');
});

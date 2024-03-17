import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Nav from './Nav';

const navigation = [
  { name: 'Search Race', href: '/search/race' },
  { name: 'Laps Information', href: '/search/laps' }
];

test('renders navigation links correctly', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Nav />
    </MemoryRouter>
  );

  navigation.forEach(item => {
    const link = getByText(item.name);
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe(item.href);
  });
});


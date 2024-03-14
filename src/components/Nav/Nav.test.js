import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Nav from './Nav';

const navigation = [
  { name: 'Search Race', href: '/race' },
  { name: 'Laps Information', href: '/laps' }
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

test('opens and closes mobile menu correctly', () => {
  const { getByRole, getByLabelText } = render(
    <MemoryRouter>
      <Nav />
    </MemoryRouter>
  );

  // Mobile menu should initially be closed
  const mobileMenu = getByRole('dialog');
  expect(mobileMenu).not.toBeVisible();

  // Open mobile menu
  const menuToggle = getByLabelText('Open main menu');
  fireEvent.click(menuToggle);
  expect(mobileMenu).toBeVisible();

  // Close mobile menu
  const closeMenuButton = getByLabelText('Close menu');
  fireEvent.click(closeMenuButton);
  expect(mobileMenu).not.toBeVisible();
});

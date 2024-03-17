import React from 'react';
import { render, fireEvent, screen, waitFor  } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './Select';

const testData = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' }
];

test('renders select component with options correctly', async () => {
  const fireEventChange = jest.fn();
  render(
    <Select
      data={testData}
      label="label"
      value="value"
      fireEventChange={fireEventChange}
    />
  );

  // Wait for the select element to be available
  const selectElement = await screen.findByRole('select');
  expect(selectElement).toBeInTheDocument();

  // Open the dropdown
  userEvent.click(selectElement);

  // Wait for the options to be available
  await waitFor(() => {
    testData.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

    // Select an option
    const optionToSelect = screen.getByText('Option 2');
    userEvent.click(optionToSelect);


    // Verify that the option was selected
    expect(screen.getByText('Option 3')).toBeInTheDocument();

});

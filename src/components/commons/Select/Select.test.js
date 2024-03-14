import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Select } from './Select';

const testData = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' }
];

test('renders select component with options correctly', () => {
  const fireEventChange = jest.fn();
  const { getByLabelText, getByDisplayValue } = render(
    <Select
      data={testData}
      label="label"
      value="value"
      fireEventChange={fireEventChange}
    />
  );

  // Check if select element is rendered
  const selectElement = getByLabelText('event-selector');
  expect(selectElement).toBeInTheDocument();

  // Check if options are rendered correctly
  testData.forEach(option => {
    expect(getByDisplayValue(option.label)).toBeInTheDocument();
  });
});

test('fires event change correctly', () => {
  const fireEventChange = jest.fn();
  const { getByLabelText } = render(
    <Select
      data={testData}
      label="label"
      value="value"
      fireEventChange={fireEventChange}
    />
  );

  // Change the select value
  const selectElement = getByLabelText('event-selector');
  fireEvent.change(selectElement, { target: { value: 'option2' } });

  // Check if fireEventChange function is called with correct value
  expect(fireEventChange).toHaveBeenCalledWith('option2');
});

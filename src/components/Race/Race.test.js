import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Race from './Race';

// Define mock data
const mockData = {
  RACEYEARS: [{ label: '2021', value: '2021' }, { label: '2022', value: '2022' }],
  circuitQuery: {
    isFetching: false,
    data: {
      MRData: {
        RaceTable: {
          Races: [
            { raceName: 'Race 1', round: '1' },
            { raceName: 'Race 2', round: '2' }
          ]
        }
      }
    }
  },
  setSeason: jest.fn(),
  setCircuit: jest.fn()
};

// Set up mock server
const server = setupServer(
  rest.get('*', (req, res, ctx) => {
    return res(ctx.json(mockData));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders race component with data', async () => {
  const { getByText, getByLabelText } = render(
    <MemoryRouter>
      <Race renderData={mockData} />
    </MemoryRouter>
  );

  // Assert that the component renders with the provided data
  expect(getByText('Choose your race event')).toBeInTheDocument();

  // Assert that the race select options are rendered
  expect(getByLabelText('Race:')).toBeInTheDocument();
  expect(getByText('2021')).toBeInTheDocument();
  expect(getByText('2022')).toBeInTheDocument();

  // Assert that the location select options are rendered
  expect(getByLabelText('Location:')).toBeInTheDocument();
  await waitFor(() => {
    expect(getByText('Race 1')).toBeInTheDocument();
    expect(getByText('Race 2')).toBeInTheDocument();
  });
});

test('submits form with selected values', async () => {
  const { getByText, getByLabelText } = render(
    <MemoryRouter>
      <Race renderData={mockData} />
    </MemoryRouter>
  );

  // Fill out the form and submit
  fireEvent.change(getByLabelText('Race:'), { target: { value: '2022' } });
  fireEvent.change(getByLabelText('Location:'), { target: { value: '2' } });
  fireEvent.click(getByText('Search Race'));

  // Assert that the form submits with the selected values
  await waitFor(() => {
    expect(mockData.setSeason).toHaveBeenCalledWith('2022');
    expect(mockData.setCircuit).toHaveBeenCalledWith('2');
  });
});

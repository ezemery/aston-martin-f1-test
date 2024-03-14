import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import SearchRace from './SearchRace';

// Define mock data
const mockData = {
  MRData: {
    RaceTable: {
      Races: [
        {
          Circuit: { circuitName: 'Mock Circuit' },
          Results: [
            {
              Driver: { givenName: 'Mock', familyName: 'Driver' },
              position: '1',
              FastestLap: { lap: '1' },
              Time: { time: '1:00:00' },
              status: 'Finished',
              points: '25',
              Constructor: { name: 'Mock Constructor', nationality: 'Mock Nation' }
            }
          ]
        }
      ]
    }
  }
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

test('renders search race component with data', async () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/2022/circuit-id']}>
      <Route path="/:year/:circuit">
        <SearchRace />
      </Route>
    </MemoryRouter>
  );

  // Wait for the data to load
  await waitFor(() => {
    expect(getByText('Mock Circuit')).toBeInTheDocument();
    expect(getByText('Mock Driver')).toBeInTheDocument();
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('1:00:00')).toBeInTheDocument();
    expect(getByText('Finished')).toBeInTheDocument();
    expect(getByText('25')).toBeInTheDocument();
    expect(getByText('Mock Constructor')).toBeInTheDocument();
    expect(getByText('Mock Nation')).toBeInTheDocument();
  });
});

test('renders search race component with no data', async () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/2022/circuit-id']}>
      <Route path="/:year/:circuit">
        <SearchRace />
      </Route>
    </MemoryRouter>
  );

  // Wait for the component to render
  await waitFor(() => {
    expect(getByText('Oops, No data to show...')).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import jest-dom for matchers
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Import QueryClient and QueryClientProvider
import { Layout } from './Layout';

describe('Layout component', () => {
  test('renders children component correctly', async () => {
    // Mock render function
    const renderMock = jest.fn().mockReturnValue(<div data-testid="mock-child">Mock child component</div>);
    
    // Mock QueryClient
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <Layout render={renderMock} />
      </QueryClientProvider>
    );

    // Wait for the component to finish fetching data
    await waitFor(() => screen.getByTestId('mock-child'));

    // Check if the child component is rendered correctly
    expect(screen.getByTestId('mock-child')).toBeInTheDocument();
  });

  // Additional tests can be added to test other behaviors of the Layout component
});

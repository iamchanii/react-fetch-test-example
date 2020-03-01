import { render, waitForElement } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App, { RANDOM_DOG_IMAGE_URL } from './App';

test('renders random toy poodle image', async () => {
  let _resolve: any;

  fetchMock.mockResponse(request => {
    if (request.url === RANDOM_DOG_IMAGE_URL) {
      return new Promise(resolve => {
        _resolve = resolve;
      });
    }

    return Promise.resolve('');
  });

  const { getByAltText } = render(<App />);

  act(() => {
    _resolve(
      JSON.stringify({
        message: 'https://dog.jpg',
        result: 'success',
      }),
    );
  });

  const toyPoodle = await waitForElement(() => getByAltText(/toy poodle/i));

  expect(toyPoodle).toHaveAttribute('src', 'https://dog.jpg');
});

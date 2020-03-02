import { render, waitForElement } from '@testing-library/react';
import React from 'react';
import App, { RANDOM_DOG_IMAGE_URL, RandomDogImage } from './App';

interface Dummy<T> {
  create(): T;
}

class RandomDogImageDummy implements Dummy<RandomDogImage> {
  create(): RandomDogImage {
    return {
      message: 'https://dog.jpg',
      status: 'success',
    };
  }
}

function mockFetchRequest<T>(dummy: Dummy<T>) {
  let _resolve: any;

  fetchMock.mockResponse(
    () =>
      new Promise(resolve => {
        _resolve = resolve;
      }),
  );

  return (...args: any[]): T => {
    const created = dummy.create();
    _resolve(JSON.stringify(created));
    expect(fetchMock).toHaveBeenLastCalledWith(...args);

    return created;
  };
}

test('renders random toy poodle image', async () => {
  const assertFetch = mockFetchRequest(new RandomDogImageDummy());
  const { getByAltText } = render(<App />);

  const randomDogImage = assertFetch(RANDOM_DOG_IMAGE_URL);

  const toyPoodle = await waitForElement(() => getByAltText(/toy poodle/i));
  expect(toyPoodle).toHaveAttribute('src', randomDogImage.message);
});

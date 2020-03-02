import React, { useEffect, useState } from 'react';
import './App.css';

export const RANDOM_DOG_IMAGE_URL =
  'https://dog.ceo/api/breed/poodle/toy/images/random';

interface RandomDogImage {
  message: string;
  status: 'success';
}

function App() {
  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    async function fetchRandomDogImage() {
      const response = await fetch(RANDOM_DOG_IMAGE_URL);
      const randomDogImage: RandomDogImage = await response.json();
      setImageUrl(randomDogImage.message);
    }

    fetchRandomDogImage();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Random Dog Image</h1>
        {imageUrl && <img src={imageUrl} alt="Toy Poodle" />}
      </header>
    </div>
  );
}

export default App;

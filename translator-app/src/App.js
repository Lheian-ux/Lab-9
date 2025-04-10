import React, { useState } from 'react';
import './App.css';

function App() {
  const [englishWord, setEnglishWord] = useState('');
  const [tagalogTranslation, setTagalogTranslation] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState('');

  const translateWord = () => {
    setIsTranslating(true);
    setError('');

    // Simulated translation mapping
    const translations = {
      hello: 'kamusta',
      world: 'mundo',
      example: 'halimbawa',
      good: 'mabuti',
      morning: 'umaga',
      night: 'gabi',
      love: 'mahal',
      thank: 'salamat',
      water: 'tubig',
      food: 'pagkain',
    };

    // Simulate slight delay for better UX
    setTimeout(() => {
      const translation = translations[englishWord.toLowerCase()];
      if (translation) {
        setTagalogTranslation(translation);
      } else {
        setError('Translation not found');
      }
      setIsTranslating(false);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      translateWord();
    }
  };

  return (
    <div className="container">
      <h1>English to Tagalog Translator</h1>
      <div className="input-group">
        <label>English Word:</label>
        <input
          type="text"
          value={englishWord}
          onChange={(e) => setEnglishWord(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type an English word..."
        />
      </div>
      <button onClick={translateWord} disabled={isTranslating}>
        {isTranslating ? 'Translating...' : 'Translate'}
      </button>
      {tagalogTranslation && (
        <div className="result">
        <h2>TAGALOG TRANSLATION:</h2>
          <p>{tagalogTranslation}</p>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;

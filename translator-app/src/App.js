import React, { useState } from 'react';
import './App.css';
import RipplesBackground from './components/Ripplesbackground.js';

function App() {
  const [englishWord, setEnglishWord] = useState('');
  const [tagalogTranslation, setTagalogTranslation] = useState('');

  const translateWord = () => {
    // Simulated translation mapping
    const translations = {
      hello: 'kamusta',
      world: 'mundo',
      example: 'halimbawa',
      good: 'mabuti',
      morning: 'umaga',
      evening: 'gabi',
      friend: 'kaibigan',
      thank: 'salamat',
      you: 'ikaw',
      welcome: 'walang anuman',
      goodbye: 'paalam',
      yes: 'oo',
      no: 'hindi',
      please: 'pakiusap',
      sorry: 'patawad',
      love: 'pag-ibig',
      food: 'pagkain',
      water: 'tubig',
      house: 'bahay',
      family: 'pamilya'
      // Add more translations as needed
    };

    const translation = translations[englishWord.toLowerCase()];
    setTagalogTranslation(translation || 'Translation not found');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      translateWord();
    }
  };

  return (
    <div className="app">
      <RipplesBackground />
      <div className="container">
        <h1>English to Tagalog Translator</h1>
        <div className="input-group">
          <label>English Word:</label>
          <input 
            type="text" 
            value={englishWord} 
            onChange={(e) => setEnglishWord(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter an English word"
          />
        </div>
        <button onClick={translateWord}>Translate</button>
        {tagalogTranslation && (
          <div className="result">
            <h2>Tagalog Translation:</h2>
            <p className="translation">{tagalogTranslation}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

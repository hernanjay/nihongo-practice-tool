import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import KanjiCardsKanji from './Components/JavaScript/KanjiCardsKanji';
import KanjiCardsHiragana from './Components/JavaScript/KanjiCardsHiragana';
import VocabCards from './Components/JavaScript/VocabCards';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<KanjiCardsKanji />} />
          <Route path="*/kanji" element={<KanjiCardsKanji />} />
          <Route path="*/hiragana" element={<KanjiCardsHiragana />} />
          <Route path="*/vocab" element={<VocabCards />} />
        </Routes>
      </Router >
    </>
  );
}

export default App;

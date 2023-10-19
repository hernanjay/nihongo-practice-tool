import React, { useState, useEffect } from 'react'
import NavBar from './JavaScript/NavBar';
import KanjiCardsKanji from './JavaScript/KanjiCardsKanji';
import KanjiCardsHiragana from './JavaScript/KanjiCardsHiragana';
import VocabCards from './JavaScript/VocabCards';

function Home() {
    const [hasChanged, setHasChanged] = useState(false);

    const currentPath = window.location.href.split(window.location.origin)[1];

    function getPage() {
        if (currentPath === '/nihongo-practice-tool/#/kanji') {
            return <KanjiCardsKanji />;
        } else if (currentPath === '/nihongo-practice-tool/#/hiragana') {
            return <KanjiCardsHiragana />
        } else if (currentPath === '/nihongo-practice-tool/#/vocab') {
            return <VocabCards />
        } else {
            return <KanjiCardsKanji />;
        }
    }

    return (

        <>
            <NavBar
                func={function () {
                    setHasChanged(!hasChanged);
                }} />
            {getPage()}
        </>
    )
}

export default Home;
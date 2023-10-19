import React, { useState } from 'react'
import NavBar from './JavaScript/NavBar';
import KanjiCardsKanji from './JavaScript/KanjiCardsKanji';
import KanjiCardsHiragana from './JavaScript/KanjiCardsHiragana';
import VocabCards from './JavaScript/VocabCards';
import './CSS/Home.css';
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
            return <div className='home'><img
                src='https://media.tenor.com/OjBnHuXIjgwAAAAC/gudetama-sanrio.gif'
                className='position-fixed top-50 start-50 translate-middle homeImg'
            /></div>;
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
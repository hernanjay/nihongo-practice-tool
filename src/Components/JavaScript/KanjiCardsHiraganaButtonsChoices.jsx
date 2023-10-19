import React, { useState } from 'react'
import { Button, ButtonToolbar, Form } from 'react-bootstrap';
import '../CSS/Kanji.css';

function getChoices(answer, list) {
    return shuffle(checkifDuplicate(answer, list));
}

function randomValueFromList(list) {
    return list[Math.floor((Math.random() * list.length) + 0)];
}

function checkifDuplicate(answer, list) {
    let values = [answer];
    let isDone = false;

    while (!isDone) {
        let value = randomValueFromList(list);
        if (values.length < 4) {
            if (!values.includes(value)) {
                values.push(value);
            }
        } else {
            isDone = true;
        }
    }
    return values;
}

function checkChoice(choice, answer, isButtonClicked) {
    let className = "buttons m-1 flex-grow-1 mw-50 ";
    if (isButtonClicked) {
        if (choice.kanjiChar === answer.kanjiChar) {
            className += "border-success text-success";
        } else {
            className += "border-danger text-danger";
        }
    } else {
        return className;
    }

    return className;
}

function KanjiCardsHiraganaButtonsChoices(props) {
    const [answer, setAnswer] = useState(props.answer);
    const [choices, setChoices] = useState(getChoices(answer, props.list));
    const [isButtonClicked, setisButtonClicked] = useState(false);

    return (
        <>
            <Form>
                <div className="KanjiCardsHiraganaButtonsChoices">
                    <ButtonToolbar cla="d-grid gap-1">
                        <Button id={choices[0].kanjiChar} type="button" size="sm" disabled={isButtonClicked} onClick={(e) => {
                            props.func();
                            setisButtonClicked(!isButtonClicked);
                        }}
                            className={checkChoice(choices[0], answer, isButtonClicked)}>
                            {choices[0].kanjiChar}
                        </Button>

                        <Button type="button" size="sm" disabled={isButtonClicked} onClick={(e) => {
                            props.func();
                            setisButtonClicked(!isButtonClicked)
                        }}
                            className={checkChoice(choices[1], answer, isButtonClicked)}>{choices[1].kanjiChar}</Button>
                    </ButtonToolbar>

                    <ButtonToolbar class="d-grid gap-1">
                        <Button type="button" size="sm" disabled={isButtonClicked} onClick={(e) => {
                            props.func(); setisButtonClicked(!isButtonClicked)
                        }}
                            className={checkChoice(choices[2], answer, isButtonClicked)}>{choices[2].kanjiChar}</Button>
                        <Button type="button" size="sm" disabled={isButtonClicked} onClick={(e) => {
                            props.func();
                            setisButtonClicked(!isButtonClicked)
                        }}
                            className={checkChoice(choices[3], answer, isButtonClicked)}>{choices[3].kanjiChar}</Button>
                    </ButtonToolbar>
                </div>
            </Form>
        </>
    )
};

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

export default KanjiCardsHiraganaButtonsChoices;
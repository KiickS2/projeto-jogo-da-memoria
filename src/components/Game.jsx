import React, { useState } from 'react'
import Board from './Board'

const Game = () => {

    const [cards, setCards] = useState(generateCards());
    const [flippedCards, setFlippedCards] = useState([]);
    const [chance, setChance] = useState(6);

    const suffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random * (i + 1));

            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    const generateCards = () => {

        const values = ["A", "B", "C", "D", "E", "F", "G", "H"];

        const cards = values.map((value) => ({
            value,
            isFlipped: false
        }))

        const duplicatedCards = cards.map((card, index) => ({...card, index}));

        return suffleArray(duplicatedCards)
    }

    return (
        <div className='game'>
            <Board />
        </div>
    )
}

export default Game
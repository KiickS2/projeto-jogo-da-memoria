import React, { useEffect, useState } from 'react'
import Board from './Board'

const suffleArray = (array) => {

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const generateCards = () => {

    const values = ["A", "B", "C", "D", "E", "F", "G", "H"];

    const cards = values.map((value) => ({
        value,
        isFlipped: false
    }))

    const duplicatedCards = cards.concat(cards).map((card, index) => ({ ...card, id: index }));

    return suffleArray(duplicatedCards)
}

const Game = () => {

    const [cards, setCards] = useState(generateCards());
    const [flippedCards, setFlippedCards] = useState([]);
    const [chance, setChance] = useState(6);

    const result = cards.filter((card) => card.isFlipped).length;

    const handleCardClick = (clickedCard) => {
        
        if (chance === 0) return;

        if (flippedCards.length === 2) return;

        const newCards = cards.map((card) => {
            return card.id === clickedCard.id ? {...card, isFlipped: true} : card
        })

        setCards(newCards);
        setFlippedCards([...flippedCards + clickedCard]);

        if (flippedCards.length === 1){
            setTimeout(() => {
                const [firstCard] = flippedCards;

                if (firstCard !== clickedCard.value) {
                    const resetCards = cards.map((card) => {
                        card.id === firstCard.id || card.id === clickedCard.id ? {...cards, isFlipped: false} : card;
                    })

                    setCards(resetCards)
                    setChance((prev) => prev - 1)
                }

                setFlippedCards([]);
            }, 600)
        }
    }

    return (
        <div className='game'>
            <Board cards={cards} onCardClick={handleCardClick}/>
            {chance === 0 ?
                (<p>Suas tentativas acabaram.</p>) : result === cards.length ?
                    (<h2>Parabéns, você ganhou!</h2>) : (<p>Você possui {chance} tentativas.</p>)}
            <button className='btn'>Reiniciar</button>
        </div>
    )
}

export default Game
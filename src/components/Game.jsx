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

    const cards = [
        {value: "bear", img: 'src/assets/images/icons8-bear-96.png', isFlipped: false},
        {value: "beaver", img: 'src/assets/images/icons8-beaver-96.png', isFlipped: false},
        {value: "deer", img: 'src/assets/images/icons8-deer-96.png', isFlipped: false},
        {value: "fox", img: 'src/assets/images/icons8-fox-96.png', isFlipped: false},
        {value: "giraffe", img: 'src/assets/images/icons8-giraffe-96.png', isFlipped: false},
        {value: "leopard", img: 'src/assets/images/icons8-leopard-96.png', isFlipped: false},
        {value: "lion", img: 'src/assets/images/icons8-lion-96.png', isFlipped: false},
        {value: "llama", img: 'src/assets/images/icons8-llama-96.png', isFlipped: false},
    ];

    const duplicatedCards = cards
    .concat([...cards])
    .map((card, index) => ({ ...card, id: index }));

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
            return card.id === clickedCard.id ? {...card, isFlipped: true} : card;
        })

        setCards(newCards);
        setFlippedCards([...flippedCards, clickedCard]);

        if (flippedCards.length === 1){
            setTimeout(() => {
                const [firstCard] = flippedCards;

                if (firstCard.value !== clickedCard.value) {
                    const resetCards = cards.map((card) => {
                      return card.id === firstCard.id || card.id === clickedCard.id ? { ...card, isFlipped: false } : card;
                    });

                    setCards(resetCards)
                    setChance((prev) => prev - 1)
                }

                setFlippedCards([]);
            }, 600)
        }
    }

    const resetGame = () => {
        setChance(6);
        setFlippedCards([]);
        setCards(generateCards());
    }

    return (
        <div className='game'>
            <Board cards={cards} onCardClick={handleCardClick}/>
            {chance === 0 ?
                (<p>Suas tentativas acabaram.</p>) : result === cards.length ?
                    (<h2>Parabéns, você ganhou!</h2>) : (<p>Você possui {chance} tentativas.</p>)}
            <button className='btn' onClick={() => resetGame()}>Reiniciar</button>
        </div>
    )
}

export default Game
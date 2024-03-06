import React from 'react'
import Card from './Card'

const Board = ({cards, onCardClick}) => {

  return (
    <div className='board'>
        {cards.map((card) => (
            <Card key={card.id} card={card} onCLick={onCardClick}/>  
        ))}

    </div>
  )
}

export default Board
import React from 'react'

const Card = ({ card, onCardClick }) => {
  return (
    <div className={`card ${card.isFlipped === true ? "isFlipped" : ""}`} onClick={() => onCardClick(card)}>
      {card.isFlipped ? <img src={card.img}/> : "?"}
    </div>
  )
}

export default Card
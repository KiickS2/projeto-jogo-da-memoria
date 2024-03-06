import React from 'react'

const Card = ({card, onCLick}) => {
  return (
    <div className={`card ${card.isFlipped === true ? "isFlipped" : ""}`} onClick={() => onCLick(card)}>
        {card.isFlipped ? card.value : "?"}
    </div>
  )
}

export default Card
import React from 'react'

const Card = ({card}) => {
  return (
    <div className={`card ${card.isFlipped ? "isFlipped" : ""}`}>
        {card.value}
    </div>
  )
}

export default Card
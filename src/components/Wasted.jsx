import React from 'react'
import WastedCard from './WastedCard.jsx'

function Wasted({ wasted }) {
    const wastedCards = wasted.map(food => {
        return (
            <WastedCard food = {food}/>
        );
    })
  return (
    <div>
      {wastedCards}
    </div>
  )
}

export default Wasted

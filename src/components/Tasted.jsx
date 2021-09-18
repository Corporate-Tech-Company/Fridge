import React from 'react'
import TastedCard from './TastedCard.jsx'

function Tasted({ tasted }) {

    const tastedCards = tasted.map(food => {
        return (
            <TastedCard 
                food = {food}
            />
        )
    })

    return (
        <div>
          {tastedCards}
        </div>
      )
  
}

export default Tasted

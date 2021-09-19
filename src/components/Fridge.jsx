import React from 'react'
import FridgeCard from './FridgeCard.jsx'

function Fridge({ fridge, toggleAddFoodModalDisplay, handleDeleteFridge }) {


  const fridgeCards = fridge.map(food => {
    return (
      <FridgeCard 
        food={food}
        handleDeleteFridge={handleDeleteFridge}
      />
    )
  });



  return (
    <div>
      {fridgeCards}
      <button onClick = {toggleAddFoodModalDisplay}>Add New Food</button>
    </div>
  )
}

export default Fridge

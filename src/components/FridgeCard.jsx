import React from 'react';
import './fridgeCard.scss';

function FridgeCard({food, handleDeleteFridge}) {
  
  return (
    <div className="fridge-card">
      <div>{food.name}</div>
      <div>{food.quantity}</div>
      <div>{food.price}</div>
      <div>{food.datePurchased}</div>
      <div>{food.useByDate}</div>
      <button onClick={() => handleDeleteFridge(food._id)}>Delete</button>
    </div>
  )
}

export default FridgeCard

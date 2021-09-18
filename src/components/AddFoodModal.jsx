import React, { useState } from 'react'
import './addFoodModal.scss'

function AddFoodModal({ addFoodModalDisplay, toggleAddFoodModalDisplay }) {

  //div = document.querySelector(.modal-overlay)
  //div.classList.add('hidden')
  //div.classList.remove('hidden')
  const [nameInput, setNameInput] = useState('');
  const [quantityInput, setQuantityInput] = useState('')
  const [priceInput, setPriceInput] = useState('');
  const [datePurchasedInput, setDatePurchasedInput] = useState('');
  const [useByDateInput, setUseByDateInput] = useState('');

  // const handleFormInput = () => {
  //   const newFood = createNewFood(all that shit up above)
  //   addNEwFood(newFood)
  // }

  return (
    <div 
      className={`modal-overlay ${addFoodModalDisplay ? '' : 'hidden'}`}
      onClick={toggleAddFoodModalDisplay}
    >
      <div 
        className="add-container"
        onClick={(e) => e.stopPropagation()}
      >
        <input type="text" />
        <button >Add New Food</button>
        <button onClick={toggleAddFoodModalDisplay}>Cancel</button>
      </div>
    </div>
  )
}

export default AddFoodModal

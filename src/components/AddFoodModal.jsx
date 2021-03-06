import React, { useState } from 'react';
import './addFoodModal.scss';

function AddFoodModal({
	addFoodModalDisplay,
	toggleAddFoodModalDisplay,
	handleAddNewFood,
}) {
	//div = document.querySelector(.modal-overlay)
	//div.classList.add('hidden')
	//div.classList.remove('hidden')
	const [nameInput, setNameInput] = useState('');
	const [quantityInput, setQuantityInput] = useState('');
	const [priceInput, setPriceInput] = useState('');
	const [datePurchasedInput, setDatePurchasedInput] = useState('');
	const [useByDateInput, setUseByDateInput] = useState('');

	// const handleFormInput = () => {
	//   const newFood = createNewFood(all that shit up above)
	//   addNEwFood(newFood)
	// }

	const formatDate = (date) => {
		const [year, month, day] = date.split('-');
		return month + '/' + day + '/' + year;
	};

	const createNewFood = (name, quantity, price, datePurchased, useByDate) => {
		return {
			name: name,
			quantity: quantity,
			price: price,
			datePurchased: formatDate(datePurchased),
			useByDate: formatDate(useByDate),
		};
	};

	const handleFormInput = () => {
		if (
			nameInput &&
			//typeof nameInput === 'string' &&
			quantityInput &&
			priceInput &&
			//typeof priceInput === 'number' &&
			datePurchasedInput &&
			//typeof datePurchased === 'string' &&
			useByDateInput //&&
			//typeof useByDateInput === 'string'
		) {
			const newFood = createNewFood(
				nameInput,
				quantityInput.toString(),
				priceInput,
				datePurchasedInput,
				useByDateInput
			);
			handleAddNewFood(newFood);
		}
	};

	return (
		<div
			className={`modal-overlay ${addFoodModalDisplay ? '' : 'hidden'}`}
			onClick={toggleAddFoodModalDisplay}
		>
			<div className='add-container' onClick={(e) => e.stopPropagation()}>
				<h2 id='modalHeader'>Add an item to the Fridge</h2>
				<input
					type='text'
					placeholder='Name'
					onChange={(e) => setNameInput(e.target.value)}
				/>
				<input
					type='text'
					placeholder='Quantity'
					onChange={(e) => setQuantityInput(e.target.value)}
				/>
				<input
					type='text'
					placeholder='Price'
					onChange={(e) => setPriceInput(e.target.value)}
				/>
				<label htmlFor='date-purchased'>Date Purchased</label>
				<input
					type='date'
					id='date-purchased'
					onChange={(e) => setDatePurchasedInput(e.target.value)}
				/>
				<label htmlFor='use-by'>Use by</label>
				<input
					type='date'
					id='use-by'
					onChange={(e) => setUseByDateInput(e.target.value)}
				/>
				<div className='buttonContainer'>
					<button
						onClick={() => {
							handleFormInput();
							toggleAddFoodModalDisplay();
						}}
					>
						Add New Food
					</button>
					{/* <button onClick={toggleAddFoodModalDisplay}>Cancel</button> */}
				</div>
			</div>
		</div>
	);
}

export default AddFoodModal;

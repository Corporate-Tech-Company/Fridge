import React from 'react';
import './fridgeCard.scss';

function WastedCard({ food, moveWastedToFridge, handleDeleteWasted, getDifferenceInDays}) {

	const differenceInDays = getDifferenceInDays(food.useByDate);

	return (
		<div className='fridge-card'>
			<div>{food.name}</div>
			<div>{food.quantity}</div>
			<div>{food.price}</div>
			<div>{food.datePurchased}</div>
			<div>{food.useByDate}</div>
			<button onClick={() => moveWastedToFridge(food._id)}>
				Move Back to Fridge
			</button>
			<button onClick={() => handleDeleteWasted(food._id)}>Delete</button>
		</div>
	);
}

export default WastedCard;

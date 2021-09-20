import React from 'react';
import './fridgeCard.scss';

function FridgeCard({ food, handleDeleteFridge, moveToTasted, moveToWasted, getDifferenceInDays }) {

	const differenceInDays = getDifferenceInDays(food.useByDate);




	return (
		<div className='fridge-card'>
			<div>{food.name}</div>
			<div>{food.quantity}</div>
			<div>{food.price}</div>
			<div>{food.datePurchased}</div>
			<div>{food.useByDate}</div>
			<div>
				{differenceInDays < 0 ? `You wasted it!` : `Expires in ${differenceInDays} days`}
			</div>

			<button onClick={() => handleDeleteFridge(food._id)}>Delete</button>
			<button onClick={() => moveToTasted(food._id)}>Tasted!</button>
			<button onClick={() => moveToWasted(food._id)}>Wasted!</button>
		</div>
	);
}

export default FridgeCard;

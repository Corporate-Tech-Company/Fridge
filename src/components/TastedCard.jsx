import React from 'react';
import './fridgeCard.scss';

function TastedCard({ food, moveTastedToFridge }) {
	return (
		<div className='fridge-card'>
			<div>{food.name}</div>
			<div>{food.quantity}</div>
			<div>{food.price}</div>
			<div>{food.datePurchased}</div>
			<div>{food.useByDate}</div>
			<button onClick={() => moveTastedToFridge(food._id)}>
				Move Back to Fridge
			</button>
		</div>
	);
}

export default TastedCard;

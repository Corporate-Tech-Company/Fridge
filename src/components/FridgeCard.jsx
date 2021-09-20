import React from 'react';
import './fridgeCard.scss';

function FridgeCard({ food, handleDeleteFridge, moveToTasted, moveToWasted }) {
	return (
		<div className='card'>
			<div className='cardHeader'>
				<div></div>
				<h1>{food.name}</h1>
				<button
					id='deleteButton'
					onClick={() => handleDeleteFridge(food._id)}
				></button>
			</div>
			<div className='cardInfo'>
				<div>Quantity: </div>
				<div className='underlineInfo'>{food.quantity}</div>
			</div>
			<div className='cardInfo'>
				<div>Price: </div>
				<div className='underlineInfo'>{food.price}</div>
			</div>
			<div className='cardInfo'>
				<div>Date Purchased: </div>
				<div className='underlineInfo'>{food.datePurchased}</div>
			</div>
			<div className='cardInfo'>
				<div>Use By Date: </div>
				<div className='underlineInfo'>{food.useByDate}</div>
			</div>
			<div className='moveToButtons'>
				<button id='tastedButton' onClick={() => moveToTasted(food._id)}>
					Tasted
				</button>
				<button id='wastedButton' onClick={() => moveToWasted(food._id)}>
					Wasted
				</button>
			</div>
		</div>
	);
}

export default FridgeCard;

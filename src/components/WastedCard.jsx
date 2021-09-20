import React from 'react';
import './fridgeCard.scss';

function WastedCard({
	food,
	moveWastedToFridge,
	handleDeleteWasted,
	getDifferenceInDays,
}) {
	const differenceInDays = getDifferenceInDays(food.useByDate);
	return (
		<div className='card'>
			<div className='cardHeader'>
				<div></div>
				<h1>{food.name}</h1>
				<div></div>
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
			<div className='cardInfo' id='expirationInfo'>
				{differenceInDays < 0
					? `You wasted it!`
					: `Expires in ${differenceInDays} days`}
			</div>
			<div className='moveToButtons'>
				<button id='tastedButton' onClick={() => moveWastedToFridge(food._id)}>
					Move Back to Fridge
				</button>
				<button id='wastedButton' onClick={() => handleDeleteWasted(food._id)}>
					Delete
				</button>
			</div>
		</div>
	);
	// return (
	// 	<div className='card'>
	// 		<div>{food.name}</div>
	// 		<div>{food.quantity}</div>
	// 		<div>{food.price}</div>
	// 		<div>{food.datePurchased}</div>
	// 		<div>{food.useByDate}</div>
	// 		<button onClick={() => moveWastedToFridge(food._id)}>
	// 			Move Back to Fridge
	// 		</button>
	// 		<button onClick={() => handleDeleteWasted(food._id)}>Delete</button>
	// 	</div>
	// );
}

export default WastedCard;

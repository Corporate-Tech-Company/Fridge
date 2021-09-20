import React from 'react';
import FridgeCard from './FridgeCard.jsx';

function Fridge({
	fridge,
	toggleAddFoodModalDisplay,
	handleDeleteFridge,
	moveToTasted,
	moveToWasted,
	getDifferenceInDays
}) {
	const fridgeCards = fridge.map((food) => {
		return (
			<FridgeCard
				food={food}
				handleDeleteFridge={handleDeleteFridge}
				moveToTasted={moveToTasted}
				moveToWasted={moveToWasted}
				getDifferenceInDays={getDifferenceInDays}
			/>
		);
	});

	return (
		<div>
			<div className='centerCardsContainer'>
				<div className='cardsContainer'>{fridgeCards}</div>
			</div>
		</div>
	);
}

export default Fridge;

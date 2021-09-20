import React from 'react';
import FridgeCard from './FridgeCard.jsx';

function Fridge({
	fridge,
	toggleAddFoodModalDisplay,
	handleDeleteFridge,
	moveToTasted,
	moveToWasted,
}) {
	const fridgeCards = fridge.map((food) => {
		return (
			<FridgeCard
				food={food}
				handleDeleteFridge={handleDeleteFridge}
				moveToTasted={moveToTasted}
				moveToWasted={moveToWasted}
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

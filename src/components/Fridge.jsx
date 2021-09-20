import React from 'react';
import FridgeCard from './FridgeCard.jsx';

function Fridge({
	fridge,
	toggleAddFoodModalDisplay,
	handleDeleteFridge,
	moveToTasted,
	moveToWasted,
	getDifferenceInDays,
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
		<div className='main-container'>
			<div className='centerCardsContainer'>
				<div className='cardsContainer'>{fridgeCards}</div>
			</div>
			<div className='add-food-modal-button'>
				<button className='add-food-btn' onClick={toggleAddFoodModalDisplay}>
					+
				</button>
			</div>
		</div>
	);
}

export default Fridge;

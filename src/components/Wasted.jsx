import React from 'react';
import WastedCard from './WastedCard.jsx';

function Wasted({
	wasted,
	moveWastedToFridge,
	handleDeleteWasted,
	getDifferenceInDays,
}) {
	const wastedCards = wasted.map((food) => {
		return (
			<WastedCard
				food={food}
				moveWastedToFridge={moveWastedToFridge}
				handleDeleteWasted={handleDeleteWasted}
				getDifferenceInDays={getDifferenceInDays}
			/>
		);
	});
	return (
		<div>
			<div className='centerCardsContainer'>
				<div className='cardsContainer'>{wastedCards}</div>
			</div>
		</div>
	);
}

export default Wasted;

import React from 'react';
import TastedCard from './TastedCard.jsx';

function Tasted({
	tasted,
	moveTastedToFridge,
	handleDeleteTasted,
	getDifferenceInDays,
}) {
	const tastedCards = tasted.map((food) => {
		return (
			<TastedCard
				food={food}
				moveTastedToFridge={moveTastedToFridge}
				handleDeleteTasted={handleDeleteTasted}
				getDifferenceInDays={getDifferenceInDays}
			/>
		);
	});

	return (
		<div>
			<div className='centerCardsContainer'>
				<div className='cardsContainer'>{tastedCards}</div>
			</div>
		</div>
	);
}

export default Tasted;

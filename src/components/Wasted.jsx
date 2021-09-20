import React from 'react';
import WastedCard from './WastedCard.jsx';

function Wasted({ wasted, moveWastedToFridge, handleDeleteWasted, getDifferenceInDays}) {

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
	return <div>{wastedCards}</div>;
}

export default Wasted;

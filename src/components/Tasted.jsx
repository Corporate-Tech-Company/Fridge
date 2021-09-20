import React from 'react';
import TastedCard from './TastedCard.jsx';

function Tasted({ tasted, moveTastedToFridge, getDifferenceInDays }) {
	const tastedCards = tasted.map((food) => {
		return (
		<TastedCard 
			food={food} 
			moveTastedToFridge={moveTastedToFridge} 
			getDifferenceInDays={getDifferenceInDays}
		/>
	);
	});

	return <div>{tastedCards}</div>;
}

export default Tasted;

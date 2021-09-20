import React from 'react';
import TastedCard from './TastedCard.jsx';

function Tasted({ tasted, moveTastedToFridge }) {
	const tastedCards = tasted.map((food) => {
		return <TastedCard food={food} moveTastedToFridge={moveTastedToFridge} />;
	});

	return <div>{tastedCards}</div>;
}

export default Tasted;

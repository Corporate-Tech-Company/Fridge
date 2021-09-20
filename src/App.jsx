import React, { useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './app.scss';
import Fridge from './components/Fridge.jsx';
import Wasted from './components/Wasted.jsx';
import Tasted from './components/Tasted.jsx';
import { dummyData } from './dummyData';
import AddFoodModal from './components/AddFoodModal.jsx';

function App() {
	const [user, setUser] = useState('');
	const [fridge, setFridge] = useState([]); // returns an array [fride, setFridge] = [pieceOfState, functionForUPdatingThatPieceOfState]
	const [wasted, setWasted] = useState([]);
	const [tasted, setTasted] = useState([]);
	const [addFoodModalDisplay, setAddFoodModalDisplay] = useState(false);

	const handleAddNewFood = (newFood) => {
		const newFridge = [...fridge, newFood];
		fetch('/api/fridge', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: user,
				fridge: newFridge,
			}),
		})
			.then((res) => res.json())
			.then(({ fridge }) => {
				setFridge(fridge);
			});
	};

	const handleDeleteFridge = (foodId) => {
		const newFridge = fridge.filter((food) => food._id !== foodId);
		// call to DB
		/*
		// fetch('somewhere', {
		// 	method: 'Post',
		// 	body: JSON.stringify({ newFridge }),
		// 	headers: { 'Content-Type': 'application/json' },
		// })
		//   .then(res => res.json())
		//   .then((res) => {
			   	//setFridge(res);
		})
			  .catch((err) => console.log('error', err))
		*/
		setFridge(newFridge);
	};

	const handleDeleteTasted = (foodId) => {
		const newTasted = tasted.filter((food) => food._id !== foodId);
		// call to DB
		// fetch('somewhere', {
		// 	method: 'Post',
		// 	body: JSON.stringify({ newFridge }),
		// 	headers: { 'Content-Type': 'application/json' },
		// })
		//   .then(res => res.json())
		//   .then((res) => {
		//setFridge(res);
		//	})
	};
	const handleDeleteWasted = (foodId) => {
		const newWasted = wasted.filter((food) => food._id !== foodId);
		// call to DB
		setWasted(newWasted);
	};

	const moveToWasted = (foodId) => {
		const movedFood = fridge.filter((food) => food._id == foodId);

		const newWasted = [...wasted, ...movedFood];
		setWasted(newWasted);

		const newFridge = fridge.filter((food) => food._id !== foodId);
		setFridge(newFridge);
		// call to db
	};

	const moveToTasted = (foodId) => {
		const movedFood = fridge.filter((food) => food._id == foodId);

		const newTasted = [...tasted, ...movedFood];
		setTasted(newTasted);

		const newFridge = fridge.filter((food) => food._id !== foodId);
		setFridge(newFridge);

		//call to db
	};

	const moveWastedToFridge = (foodId) => {
		const movedFood = wasted.filter((food) => food._id == foodId);

		const newWasted = wasted.filter((food) => food._id != foodId);
		setWasted(newWasted);

		const newFridge = [...fridge, ...movedFood];
		setFridge(newFridge);

		// call to db
	};

	const moveTastedToFridge = (foodId) => {
		const movedFood = tasted.filter((food) => food._id == foodId);

		const newTasted = tasted.filter((food) => food._id != foodId);

		const newFridge = [...fridge, ...movedFood];

		setTasted(newTasted);
		setFridge(newFridge);

		// call to db
	};

	const toggleAddFoodModalDisplay = () => {
		setAddFoodModalDisplay(!addFoodModalDisplay);
	};

	// added function to get total price of food array (tasted, wasted, fridge)
	const getTotalPrice = (foodArray) => {
		const arrayOfPrices = foodArray.map(
			(foodItem) => foodItem.price
			// * Number(foodItem.quantity.replace(/\D/g, ''))
		);

		return arrayOfPrices
			.reduce((acc, currValue) => {
				return acc + currValue;
			}, 0)
			.toFixed(2);
	};

	// added function to get total quantity
	const getTotalQuantity = (foodArray) => {
		return foodArray.length;
		// const arrayOfQuantities = foodArray.map((foodItem) =>
		// 	Number(foodItem.quantity.replace(/\D/g, ''))
		// );
		// return arrayOfQuantities.reduce((acc, currVal) => {
		// 	return acc + currVal;
		// }, 0);
	};

	//function to calculate percentage wasted
	const calcPercentageWasted = (wasted, tasted, fridge) => {
		return (
			(wasted.length / (wasted.length + tasted.length + fridge.length)) * 100
		);
	};

	//componenDidMount
	// run this function once when the componenet mounts
	//componenetDidUpdate
	// run this function every time there's an update to the component
	//componentWillUnmount

	useEffect(() => {
		// fetch('/wasted')
		//   .then(res => res.json())
		//   .then(stuff => console.log(stuff));
		// get /user --> everything
		// post /user -->
		// username in body
		const { username, fridge, wasted, tasted } = dummyData;

		//app.get('/user)

		// req.query = { username: test1 }

		try {
			fetch('/user/?username=test2')
				.then((res) => res.json())
				.then(({ username, fridge, wasted, tasted }) => {
					console.log('from fetch', username);
					setUser(username);
					setFridge(fridge);
					setWasted(wasted);
					setTasted(tasted);
				});
		} catch (error) {
			console.log(error);
		}

		// test cases
		// console.log(calcPercentageWasted(wasted, tasted, fridge));
	}, []);

	console.log('current user', user);
	return (
		<div className='test'>
			<div>
				Your food waste accounted for{' '}
				{calcPercentageWasted(wasted, tasted, fridge)}% of your groceries.
			</div>
			<div>
				The cost of your food waste totaled to {getTotalPrice(wasted)} dollars.
			</div>
			<div style={{ border: '1px solid red' }}>
				<Link to='/wasted'>Wasted</Link>
				<Link to='/tasted'>Tasted</Link>
				<Link to='/fridge'>Fridge</Link>
				<button onClick={toggleAddFoodModalDisplay}>Add New Food</button>
			</div>
			<Switch>
				<Route exact path='/fridge'>
					<div>Fridge</div>
					<Fridge
						fridge={fridge}
						toggleAddFoodModalDisplay={toggleAddFoodModalDisplay}
						handleDeleteFridge={handleDeleteFridge}
						moveToTasted={moveToTasted}
						moveToWasted={moveToWasted}
					/>
				</Route>
				<Route exact path='/wasted'>
					<div>Wasted</div>
					<Wasted
						wasted={wasted}
						moveWastedToFridge={moveWastedToFridge}
						handleDeleteWasted={handleDeleteWasted}
					/>
				</Route>
				<Route exact path='/tasted'>
					<div>Tasted</div>
					<Tasted
						tasted={tasted}
						moveTastedToFridge={moveTastedToFridge}
						handleDeleteTasted={handleDeleteTasted}
					/>
				</Route>
			</Switch>
			<AddFoodModal
				addFoodModalDisplay={addFoodModalDisplay}
				toggleAddFoodModalDisplay={toggleAddFoodModalDisplay}
				handleAddNewFood={handleAddNewFood}
			/>
		</div>
	);
}

export default App;

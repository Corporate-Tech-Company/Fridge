import React, { useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './app.scss';
import Fridge from './components/Fridge.jsx';
import Wasted from './components/Wasted.jsx';
import Tasted from './components/Tasted.jsx';
import { dummyData } from './dummyData';
import AddFoodModal from './components/AddFoodModal.jsx';
import differenceInDays from 'date-fns/differenceInDays';

function App() {
	const [user, setUser] = useState('');
	const [fridge, setFridge] = useState([]); 
	// firdge = [], setFridge = function -> 
	// returns an array [fride, setFridge] = [pieceOfState, functionForUPdatingThatPieceOfState]
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
			})
			.catch((err)=>console.log('error in handleAddNewFood', err));
	};

	const handleDeleteFridge = (foodId) => {
		const newFridge = fridge.filter((food) => food._id !== foodId);
		// call to DB
		
		fetch('/api/fridge', {
			method: 'DELETE',
			body: JSON.stringify({ username: user, fridge: newFridge }),
			headers: { 'Content-Type': 'application/json' },
		})
		.then(res => res.json())
		.then(({fridge}) => {
			setFridge(fridge);
		})
		.catch((err) => console.log('error in handleDeleteFridge', err));
	};

	const handleDeleteTasted = (foodId) => {
		const newTasted = tasted.filter((food) => food._id !== foodId);
		// call to DB
		fetch('/api/tasted', {
			method: 'DELETE',
			body: JSON.stringify({ username: user, tasted: newTasted }),
			headers: { 'Content-Type': 'application/json' },
		})
		.then(res => res.json())
		.then(({fridge}) => {
			setFridge(fridge);
		})
		.catch((err) => console.log('error in handleDeleteTasted', err));
	};

	const handleDeleteWasted = (foodId) => {
		const newWasted = wasted.filter((food) => food._id !== foodId);
		// call to DB
		fetch('/api/wasted', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username: user,
				wasted: newWasted
			})
		})
		.then(res => res.json())
		.then(({ wasted }) => {
			setWasted(wasted);
		})
		.catch((err) => console.log('error in handleDeleteWasted', err));
	};

	const moveToWasted = (foodId) => {
		const movedFood = fridge.filter((food) => food._id == foodId);

		const newWasted = [...wasted, ...movedFood];

		const newFridge = fridge.filter((food) => food._id !== foodId);
		// call to db
		fetch('/api/wasted', {
			method: 'DELETE',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				username: user,
				wasted: newWasted, 
				fridge: newFridge
			})
		})
		.then(res => res.json())
		.then(({ wasted, fridge }) => {
			setWasted(wasted);
			setFridge(fridge);
		})
		.catch((err) => console.log('error in moveToWasted', err));
	};

	const moveToTasted = (foodId) => {
		const movedFood = fridge.filter((food) => food._id == foodId);
		const newTasted = [...tasted, ...movedFood];
		const newFridge = fridge.filter((food) => food._id !== foodId);

		fetch('/api/tasted', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: user,
				fridge: newFridge,
				tasted: newTasted
			}),
		})
			.then((res) => res.json())
			.then(({ fridge, tasted }) => {
				setFridge(fridge);
				setTasted(tasted);	
			})
			.catch((err)=>console.log('error in moveToTasted', err));

	};

	const moveWastedToFridge = (foodId) => {
		const movedFood = wasted.filter((food) => food._id == foodId);
		const newWasted = wasted.filter((food) => food._id != foodId);
		const newFridge = [...fridge, ...movedFood];

		fetch('/api/fridge', {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				username: user,
				wasted: newWasted, 
				fridge: newFridge
			})
		})
		.then(res => res.json())
		.then(({ wasted, fridge }) => {
			setWasted(wasted);
			setFridge(fridge);
		})
		.catch((err) => console.log('error in moveWastedToFridge', err));
		// call to db
	};

	const moveTastedToFridge = (foodId) => {
		const movedFood = tasted.filter((food) => food._id == foodId);

		const newTasted = tasted.filter((food) => food._id != foodId);

		const newFridge = [...fridge, ...movedFood];

		fetch('/api/fridge', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: user,
				fridge: newFridge,
				tasted: newTasted
			}),
		})
			.then((res) => res.json())
			.then(({ fridge, tasted }) => {
				setFridge(fridge);
				setTasted(tasted);	
			})
			.catch((err)=>console.log('error in moveTastedToFridge', err));
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
		let result = wasted.length / (wasted.length + tasted.length + fridge.length);
		return result.toFixed(2);
	};

	//componenDidMount
	// run this function once when the componenet mounts
	//componenetDidUpdate
	// run this function every time there's an update to the component
	//componentWillUnmount

	const getDifferenceInDays = (useBy) => {
		const [useByMonth, useByDay, useByYear] = useBy.split('/');

		const zeroIndexUseByMonth = parseInt(useByMonth) - 1;

		const useByDate = new Date(useByYear, zeroIndexUseByMonth, useByDay);

		const today = new Date();

		const difference = differenceInDays(useByDate, today);
		return difference;
		
	}

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
			fetch('/user/?username=test1')
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
			</div>
			<Switch>
				<Route exact path='/fridge'>
					<div>fridge</div>
					<Fridge
						fridge={fridge}
						toggleAddFoodModalDisplay={toggleAddFoodModalDisplay}
						handleDeleteFridge={handleDeleteFridge}
						moveToTasted={moveToTasted}
						moveToWasted={moveToWasted}
						getDifferenceInDays={getDifferenceInDays}
					/>
				</Route>
				<Route exact path='/wasted'>
					<div>Wasted</div>
					<Wasted
						wasted={wasted}
						moveWastedToFridge={moveWastedToFridge}
						handleDeleteWasted={handleDeleteWasted}
						getDifferenceInDays={getDifferenceInDays}
					/>
				</Route>
				<Route exact path='/tasted'>
					<div>Tasted</div>
					<Tasted
						tasted={tasted}
						moveTastedToFridge={moveTastedToFridge}
						handleDeleteTasted={handleDeleteTasted}						
						getDifferenceInDays={getDifferenceInDays}
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

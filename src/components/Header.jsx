import React from 'react';
import './header.scss';
import { Link } from 'react-router-dom';

function Header({ toggleAddFoodModalDisplay }) {
	return (
		<div className='header-container'>
			<div className='header-content'>
				<div className='nav-links'>
					<div>
						<Link to='/fridge'>Fridge</Link>
					</div>
					<div>
						<Link to='/tasted'>Tasted</Link>
					</div>
					<div>
						<Link to='/wasted'>Wasted</Link>
					</div>
				</div>
				<div className='logo'>Fridge</div>
				{/* <button className='add-food-button' onClick={toggleAddFoodModalDisplay}>
					Add New Food
				</button> */}
			</div>
		</div>
	);
}

export default Header;

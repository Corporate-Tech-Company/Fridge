import React from 'react';
import './footer.scss';

function Footer({ percentageWasted, totalPriceWasted }) {
	return (
		<div className='footer'>
			<div className='footer-content'>
				<div>
					Food Wasted: <span>{percentageWasted} %</span>
				</div>
				<div>
					Money Wasted: <span>${totalPriceWasted}</span>
				</div>
			</div>
		</div>
	);
}

export default Footer;

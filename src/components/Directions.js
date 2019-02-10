import React from 'react';

let Directions = () => {
	return (
		<div>
			<p>Directions:</p>
			<p>
				This app is a simple drinking game. Set the Drunkenness level (default is 6.5) and click beer me. If the returned beer has
				a lower ABV level than your Drunkenness setting ya got to take a sip!! Remember the higher the Drunkenness
				level the more sips ya got to take!!
			</p>
			<p style={{ textAlign: 'center' }}>Please Drink Responsibly!</p>
		</div>
	);
};

export default Directions;

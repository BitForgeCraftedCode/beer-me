import React from 'react';

let Directions = () => {
	return (
		<div>
			<p>Directions:</p><br/>
			<p>
				This is a simple drinking game. Set the Drunkenness level (default is 6.5) and click the "Beer Me"
				button on the home page. If the returned beer has a lower ABV than your Drunkenness level you got to
				take a sip!! Remember the higher the Drunkenness level the more sips ya got to take!!
			</p><br/>
			<p>
				This app makes use of the free <a href="https://punkapi.com/documentation/v2">PUNK API</a> and
				rate limits are appled. Additionally, I throttled the "Beer Me" button to only
				allow one beer every 30 seconds. So constantly clicking the button does nothing!
			</p><br/>
			<p style={{ textAlign: 'center' }}>Please Drink Responsibly!</p><br/>
		</div>
	);
};

export default Directions;

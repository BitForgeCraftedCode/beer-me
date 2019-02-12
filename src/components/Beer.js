import React from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

import { fetchBeerData } from '../redux/actions';

class Beer extends React.Component {
	takeSip = () => {
		toast.success('Take a sip!!', {
			position: toast.POSITION.TOP_CENTER
		});
	};
	//not really an error just a taunt
	bigBaby = () => {
		toast.error('You wimp! This beer is too strong for ya!!', {
			position: toast.POSITION.TOP_CENTER
		});
	};
	render() {
		const beerData = this.props.beerData;
		// console.log(beerData);
		const drunkLevel = this.props.drunkLevel;
		const error = beerData[0].error;
		const loaded = beerData[0].loaded;
		const beer = beerData[0].beer[0];
		// console.log(beer);
		// console.log(Array.isArray(beer));
		// console.log(typeof beer === 'object' && beer.constructor === Object);

		let myBeer;
		//build beer UI
		if (Array.isArray(beer)) {
			let foodPairing = beer[0].food_pairing.map((food, index) => {
				return <li key={index}>{food}</li>;
			});

			myBeer = (
				<div>
					<p>{beer[0].name}</p>
					<p>{beer[0].tagline}</p>
					<p>First Brewed: {beer[0].first_brewed}</p>
					<p>ABV: {beer[0].abv}</p>
					<div className="beer__img-div">
						<img className="beer__img" src={beer[0].image_url} alt="beer" />
					</div>
					<p>{beer[0].description}</p>
					<p />
					<ul className="beer__food" style={{ listStyleType: 'none' }}>
						<li>
							<b>Food Parings</b>
							<ul>{foodPairing}</ul>
						</li>
					</ul>
				</div>
			);
			//alert sip status
			if (beer[0].abv <= drunkLevel) {
				this.takeSip();
			}
			if (beer[0].abv > drunkLevel) {
				this.bigBaby();
			}
		}
		if (error || (typeof beer === 'object' && beer.constructor === Object)) {
			return (
				<div className="beer">
					<p>
						Sorry an error has occured. Perhaps we are drinking too many beers and went over the api limit!
						Slow down!
					</p>
					<div className="appBtnContainer">
						<button className="appBtn" onClick={() => this.props.fetchBeerData()}>
							Beer Me
						</button>
					</div>
				</div>
			);
		} else if (!loaded) {
			return (
				<div className="beer">
					<div className="appBtnContainer">
						<button className="appBtn" onClick={() => this.props.fetchBeerData()}>
							Beer Me
						</button>
					</div>
				</div>
			);
		} else if (loaded && Array.isArray(beer)) {
			return (
				<div className="beer">
					{myBeer}
					<div className="appBtnContainer">
						<button className="appBtn" onClick={() => this.props.fetchBeerData()}>
							Beer Me
						</button>
					</div>
				</div>
			);
		}
	}
}

const mapStateToProps = state => {
	return {
		beerData: state.beerData,
		drunkLevel: state.drunkLevel
	};
};
const mapDispatchToProps = {
	fetchBeerData: fetchBeerData
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Beer);

// https://api.punkapi.com/v2/beers?abv_gt=20

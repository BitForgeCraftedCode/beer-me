import React from 'react';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
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

	renderError = () => {
		return (
			<div className="beer">
				<p>
					Sorry an error has occured. Perhaps we are drinking too many beers and went over the api limit! Slow
					down!
				</p>
				<div className="appBtnContainer">
					<button
						className="appBtn"
						onClick={() => {
							this.props.fetchBeerData();
						}}
					>
						Beer Me
					</button>
				</div>
			</div>
		);
	};

	renderInitial = () => {
		return (
			<div className="beer">
				<div className="appBtnContainer">
					<button
						className="appBtn"
						onClick={() => {
							this.props.fetchBeerData();
						}}
					>
						Beer Me
					</button>
				</div>
			</div>
		);
	};

	renderLoader = () => {
		return (
			<div className="beer">
				<div className="beer__loader">
					<div>
						<p>Getting Beer!</p>
						<Loader type="Puff" color="#00BFFF" height="100" width="100" />
					</div>
				</div>
			</div>
		);
	};

	render() {
		const beerData = this.props.beerData;
		const drunkLevel = this.props.drunkLevel;
		const error = beerData[0].error;
		const loaded = beerData[0].loaded;
		const btnClicked = beerData[0].btnClicked;
		const beer = beerData[0].beer;
		//PUNK API will return an error object or an array with beer data
		// console.log('Beer Data: ', beerData);
		// console.log('loaded: ', loaded);
		// console.log('btnClicked: ', btnClicked);
		// console.log(beer);
		// console.log(Array.isArray(beer));
		// console.log(typeof beer === 'object' && beer.constructor === Object);

		function buildBeerUI() {
			let foodPairing = beer[0].food_pairing.map((food, index) => {
				return <li key={index}>{food}</li>;
			});

			let myBeer = (
				<div>
					<p>{beer[0].name}</p>
					<p>{beer[0].tagline}</p>
					<p>First Brewed: {beer[0].first_brewed}</p>
					<p>ABV: {beer[0].abv}</p>
					<div className="beer__img-div">
						<img className="beer__img" src={beer[0].image_url} alt="beer" />
					</div>
					<p>{beer[0].description}</p>
					<br />
					<ul className="beer__food" style={{ listStyleType: 'none' }}>
						<li>
							<b>Food Parings</b>
							<ul>{foodPairing}</ul>
						</li>
					</ul>
				</div>
			);
			return myBeer;
		}

		//PUNK API will return an error object if we go over the request limit
		//or if we try to fetch from a wrong end point. Otherwise the fetch API
		//will return an error if one occurred
		if (error || (typeof beer === 'object' && beer.constructor === Object)) {
			return this.renderError();
		}
		//initial state loaded is false and btnClicked is false
		//I want to display the Beer Me button for initial state
		else if (!loaded && !btnClicked) {
			return this.renderInitial();
		}
		//Once Beer Me button is clicked loaded is false and bntClicked is true
		//I want to display loading indicator here
		else if (btnClicked && !loaded) {
			return this.renderLoader();
		}
		//Once fetch is a success loaded is true and the beer will be an array
		//of length one. I want to display the beer UI here
		else if (loaded && Array.isArray(beer) && beer.length !== 0) {
			return (
				<div className="beer">
					{buildBeerUI()}
					{beer[0].abv <= drunkLevel ? this.takeSip() : this.bigBaby()}
					<div className="appBtnContainer">
						<button
							className="appBtn"
							onClick={() => {
								this.props.fetchBeerData();
							}}
						>
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

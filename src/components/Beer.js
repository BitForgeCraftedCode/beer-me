import React from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

import { fetchBeerData } from '../redux/actions';

class Beer extends React.Component {
	takeSip = () => {
		toast.success('Take a sip!!', {
			position: toast.POSITION.BOTTOM_CENTER
		});
	};
	//not really an error just a taunt
	bigBaby = () => {
		toast.error('You wimp! This beer is too strong for ya!!', {
			position: toast.POSITION.BOTTOM_CENTER
		});
	};
	render() {
		const beerData = this.props.beerData;
		const drunkLevel = this.props.drunkLevel;
		console.log(beerData);
		let myBeer;
		//build beer UI
		if (beerData.length === 1) {
			let foodPairing = beerData[0].food_pairing.map((food, index) => {
				return <li key={index}>{food}</li>;
			});

			myBeer = (
				<div>
					<p>{beerData[0].name}</p>
					<p>{beerData[0].tagline}</p>
					<p>First Brewed: {beerData[0].first_brewed}</p>
					<p>ABV: {beerData[0].abv}</p>
					<div className="beer__img-div">
						<img className="beer__img" src={beerData[0].image_url} alt="beer" />
					</div>
					<p>{beerData[0].description}</p>
					<p></p>
					<ul className="beer__food" style={{listStyleType: 'none'}}>
						<li>
							<b>Food Parings</b>
							<ul>{foodPairing}</ul>
						</li>
					</ul>
				</div>
			);
		}
		//alert sip status
		if (beerData.length === 1) {
			if (beerData[0].abv <= drunkLevel) {
				this.takeSip();
			}
			if (beerData[0].abv > drunkLevel) {
				this.bigBaby();
			}
		}
		return (
			<div className="beer">
				{myBeer}
				<div className="appBtnContainer">
					<button className="appBtn" onClick={() => this.props.fetchBeerData()}>Beer Me</button>
				</div>
			</div>
		);
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

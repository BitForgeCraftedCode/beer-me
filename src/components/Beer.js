import React from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

import { fetchBeerData } from '../redux/actions';

class Beer extends React.Component {
	componentDidMount() {
		//this.props.fetchBeerData();
	}
	takeSip = () => {
		toast.success('Take a sip!!', {
			position: toast.POSITION.BOTTOM_CENTER
		});
	};
	bigBaby = () => {
		toast.warn('You wimp this beer is too strong for Ya!!', {
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
				<div style={{ textAlign: 'center' }}>
					<p>{beerData[0].name}</p>
					<p>ABV: {beerData[0].abv}</p>
					<img src={beerData[0].image_url} alt="beer" style={{ height: '300px' }} />
					<p>{beerData[0].description}</p>
					<p>Food Parings</p>
					<ul>{foodPairing}</ul>
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
			<div>
				{myBeer}
				<button onClick={() => this.props.fetchBeerData()}>Beer Me</button>
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

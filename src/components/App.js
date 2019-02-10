import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchBeerData } from '../redux/actions';

import Directions from './Directions';

import beer from '../images/beer.svg';

class App extends Component {
    componentDidMount() {
        this.props.fetchBeerData();
    }
    render() {
        const beerData = this.props.beerData;
        console.log(beerData);
        let myBeer;
        if (beerData.length === 1) {
            let foodPairing = beerData[0].food_pairing.map((food, index) => {
                return <li key={index}>{food}</li>;
            });

            myBeer = (
                <div style={{ textAlign: 'center' }}>
                    <p>{beerData[0].name}</p>
                    <p>abv: {beerData[0].abv}</p>
                    <img src={beerData[0].image_url} alt="beer" style={{ height: '300px' }} />
                    <p>{beerData[0].description}</p>
                    <p>Food Parings</p>
                    <ul>{foodPairing}</ul>
                </div>
            );
        }
        return (
            <div className="App">
                <header className="header">
                    <h1>Beer Me Drinking Game!</h1>
                    <h2>Discover new beers and drink some too!!</h2>
                    <img className="header__img" src={beer} alt="beer" />
                </header>
                <main className="main" role="main">
                    <Directions />
                    
                    {myBeer}
                    <button onClick={() => this.props.fetchBeerData()}>Beer Me</button>
                </main>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        beerData: state.beerData
    };
};
const mapDispatchToProps = {
    fetchBeerData: fetchBeerData
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

// https://api.punkapi.com/v2/beers?abv_gt=20

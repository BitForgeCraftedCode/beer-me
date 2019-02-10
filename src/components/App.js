import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchBeerData } from '../redux/actions';

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
                    <p>
                        This app is a simple drinking game. Set the Drunkeness level and click beer me. If the returned
                        beer has a higher abv level than your Drunkeness setting ya got to take a sip!! Remember the
                        lower the Drunkeness level the more sips ya got to take!!
                    </p>
                    <p style={{ textAlign: 'center' }}>Please Drink Responsibly!</p>
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

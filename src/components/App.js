import React, { Component } from 'react';
import beer from '../images/beer.svg';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            beerData: [],
            drunkeness: 10
        };
    }
    getMyBeer() {
        fetch('https://api.punkapi.com/v2/beers/random')
            .then(res => res.json())
            .then(
                result => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        beerData: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                error => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }
    componentDidMount() {
        this.getMyBeer();
    }
    render() {
        const { error, isLoaded, beerData } = this.state;

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
                    <button onClick={() => this.getMyBeer()}>Beer Me</button>
                </main>
            </div>
        );
    }
}

export default App;

// https://api.punkapi.com/v2/beers?abv_gt=20

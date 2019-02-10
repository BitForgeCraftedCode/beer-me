import React, { Component } from 'react';


import Directions from './Directions';
import Beer from './Beer';

import beer from '../images/beer.svg';

class App extends Component {
    
    render() {
       
        return (
            <div className="App">
                <header className="header">
                    <h1>Beer Me Drinking Game!</h1>
                    <h2>Discover new beers and drink some too!!</h2>
                    <img className="header__img" src={beer} alt="beer" />
                </header>
                <main className="main" role="main">
                    <Directions />
                    <Beer />

                </main>
            </div>
        );
    }
}



export default App;

// https://api.punkapi.com/v2/beers?abv_gt=20

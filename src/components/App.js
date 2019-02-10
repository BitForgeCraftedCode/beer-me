import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Directions from './Directions';
import Beer from './Beer';
import DrunkennessLevel from './DrunkennessLevel';

import beer from '../images/beer.svg';

class App extends Component {
    render() {
        return (
            <div className="App">
                <nav className="nav">
                    <Link to="/" className="nav__link">
                        Home
                    </Link>
                    <Link to="/settings" className="nav__link">
                        Settings and Directions
                    </Link>
                </nav>
                <header className="header">
                    <h1>Beer Me Drinking Game!</h1>
                    <h2>Discover new beers and drink some too!!</h2>
                    <img className="header__img" src={beer} alt="beer" />
                </header>
                <main className="main" role="main">
                    <Route exact path="/" render={() => <Beer />} />
                    <Route
                        path="/settings"
                        render={() => (
                            <div>
                                <Directions />
                                <DrunkennessLevel />
                            </div>
                        )}
                    />
                    <ToastContainer />
                </main>
            </div>
        );
    }
}

export default withRouter((App));

// https://api.punkapi.com/v2/beers?abv_gt=20

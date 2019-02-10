import throttle from 'lodash/throttle';
/*4sec throttle
define the throttled fetch outside the action creator otherwise
everytime the action creator gets called it will retrun a new throttle function
and throttle will not work as intended
*/

const fetchMyBeer = throttle(dispatch => {
	fetch('https://api.punkapi.com/v2/beers/random')
		.then(res => res.json())
		.then(
			result => {
				dispatch({
					type: 'FETCH_BEERDATA',
					payload: {
						result: result,
						loaded: true
					}
				});
			},
			error => {
				dispatch({
					type: 'FETCH_ERROR',
					payload: {
						error: error,
						loaded: false
					}
				});
			}
		);
}, 4000);

/*
export const fetchBeerData = () => dispatch => fetchMyBeer(dispatch);
'https://jsonplaceholder.typicode.com/users'

action creator returns a function with dispatch which then returns the outer fetchMyBeer function
with dispatch and the arguments (thunk can now execute this throttled function properly).

Alt short hand syntax above as well as a test json placeholder endpoint
see https://gist.github.com/krstffr/245fe83885b597aabaf06348220c2fe9
*/
export const fetchBeerData = () => {
	return dispatch => {
		return fetchMyBeer(dispatch);
	};
};

export const setDrunkLevel = drunkLevel => {
	return {
		type: 'SET_DRUNKLEVEL',
		payload: drunkLevel
	};
};

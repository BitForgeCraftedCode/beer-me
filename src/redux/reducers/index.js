import { combineReducers } from 'redux';

const initialState = {
	beerData: [{error: null, loaded: false, beer: []}],
	drunkLevel: 6.5
};

const beerData = (beerData = initialState.beerData, action) => {
	switch (action.type) {
		case 'FETCH_BEERDATA':
			return [{error: null, loaded: true, beer: [action.payload.result]}];
		case 'FETCH_ERROR':
			return [{error: action.payload.error, loaded: true, beer: []}];
		default:
			return beerData;
	}
};

const drunkLevel = (drunkLevel = initialState.drunkLevel, action) => {
	switch (action.type) {
		case 'SET_DRUNKLEVEL':
			console.log(action.payload);
			return action.payload;
		default:
			console.log(drunkLevel);
			return drunkLevel;
	}
};

export default combineReducers({
	beerData: beerData,
	drunkLevel: drunkLevel
});

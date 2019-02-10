import { combineReducers } from 'redux';

const initialState = {
	beerData: [],
	loaded: true,
	drunkLevel: 6.5
};

const beerData = (beerData = initialState.beerData, action) => {
	switch (action.type) {
		case 'FETCH_BEERDATA':
			return action.payload.result;
		default:
			return beerData;
	}
};

const loaded = (loaded = initialState.loaded, action) => {
	switch (action.type) {
		case 'FETCH_ERROR':
			console.log(action.payload.error);
			return action.payload.loaded;
		default:
			return loaded;
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
	loaded: loaded,
	drunkLevel: drunkLevel
});

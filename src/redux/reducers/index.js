import { combineReducers } from 'redux';

const initialState = {
	beerData: [],
	loaded: true
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

export default combineReducers({
	beerData: beerData,
	loaded: loaded,
});

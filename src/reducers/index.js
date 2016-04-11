import { combineReducers } from 'redux';
import main from './main';
import { routeReducer } from 'redux-simple-router';

const rootReducer = combineReducers({
	main,
	routing: routeReducer
});


export default rootReducer;

import {combineReducers} from 'redux';
import signInReducer from './singIn'
import loaderReducer from './loader';
import locationReducer from './location';
import destinationLocationReducer from './destinationLocation';
import vehicleListReducer from './vehicleList';

export default combineReducers({
  signin: signInReducer,
  loaderReducer: loaderReducer,
  locationReducer: locationReducer,
  destinationLocationReducer:destinationLocationReducer,
  vehicleListReducer : vehicleListReducer
});

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import EncryptedStorage from 'react-native-encrypted-storage';
import rootReducer from '../reducers';

const persistConfig = {
  key: 'rootReducer',
  storage: EncryptedStorage,
};

const middleware = applyMiddleware(thunk);
const store = createStore(rootReducer, middleware);

export {persistConfig, store};

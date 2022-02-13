import {createStore, combineReducers} from 'redux'
import Reducers from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'; // 리덕스 개발자 도구
const RootReducers = combineReducers({
 // reducers
 Reducers,
});

export const store = createStore(RootReducers,composeWithDevTools());
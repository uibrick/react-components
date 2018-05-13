import { createStore } from 'redux'
import rootReducer from './reducers'

declare var window: any;

function configureStore() {
    let store = window.react_redux_store || createStore(rootReducer);
    window.react_redux_store = store;
    return store;
}

let store = configureStore();

export default store;
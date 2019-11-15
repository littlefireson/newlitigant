import { createStore,applyMiddleware} from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import watchAsync from './sagas'
import rootReducer from './reduces'
const sagaMiddleware = createSagaMiddleware();
let store;

const getStore = () => {
    if (!store) {
        store = createStore(
            rootReducer,
            applyMiddleware(sagaMiddleware)
        );
        store.runSaga = sagaMiddleware.run;
        store.runSaga(watchAsync);
        store.close = () => store.dispatch(END);
    }
    return store;
};
store = getStore();
export default store;
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';

import createRootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, createRootReducer());
const logger = createLogger();
// Redux: Store
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware, logger)),
);
// Middleware: Redux Persist Persister
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default store;

import { applyMiddleware, compose, createStore } from "redux";
import sages from '../Saga'
import logger from 'redux-logger'
import AppReducer from '../redux';
import CreateSagaMiddleware from 'redux-saga'

const sagamiddleware = CreateSagaMiddleware()
const store = createStore(AppReducer,applyMiddleware(logger, sagamiddleware));
// const store = createStore(AppReducer, applyMiddleware(sagamiddleware));
sagamiddleware.run(sages);

export default store
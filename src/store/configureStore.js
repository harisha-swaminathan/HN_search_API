import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import searchTermsReducer from '../reducers/searchTerms';



export default () => {
  const store = createStore(searchTermsReducer,devToolsEnhancer());

  return store;
};
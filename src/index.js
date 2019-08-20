import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import './style.css'
import LoadData from './components/LoadData';
import * as serviceWorker from './serviceWorker';
const store = configureStore();
const jsx=(
    <Provider store={store}>
        <LoadData/>
    </Provider>
    
);
ReactDOM.render(jsx, document.getElementById('root'));


serviceWorker.unregister();

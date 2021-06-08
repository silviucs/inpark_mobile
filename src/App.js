/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Homepage from './pages/homepage';
import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from './redux/reducers';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer);
let persistor = persistStore(store);

const prefix = 'inpark://'

const App: () => React$Node = () => {
    // persistStore(store).purge(); // reset initial state
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Homepage uriPrefix={prefix} />
            </PersistGate>
        </Provider>
    );
};


export default App;

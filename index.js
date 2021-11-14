import React from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';
import store, { persistor } from './src/store';
import App from './src/App';
import { navigationRef } from 'utils/navigation';
import { name as appName } from './app.json';

import axios from 'api/client';
import { removeItem } from 'storage';
import { replace } from 'utils/navigation';
import { logout } from 'pages/Auth/actions/auth.actions';

const Component = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <FlashMessage position="top" />
      <NavigationContainer ref={navigationRef}>
        <App />
      </NavigationContainer>
    </PersistGate>
  </Provider>
);

const { dispatch } = store;
axios.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.response !== undefined) {
      if (error.response.status === 401) {
        await removeItem('X-AuthToken');
        dispatch(logout());
        replace('Login');
      }
      const throwableError = {
        code: error.response.status,
        text: error.response.data.message,
      };

      throw throwableError;
    } else {
      throw error;
    }
  },
);

AppRegistry.registerComponent(appName, () => Component);

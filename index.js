import React from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import store from './src/store';
import App from './src/App';
import { name as appName } from './app.json';

const Component = () => (
  <Provider store={store}>
    <FlashMessage position="top" />
    <NavigationContainer>
      <App />
    </NavigationContainer>
  </Provider>
);

AppRegistry.registerComponent(appName, () => Component);

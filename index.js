/**
 * @format
 */
import React from 'react';
import { AppRegistry, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store';
import App from './src/App';
import { name as appName } from './app.json';

const Component = () => (
  <View>
    <Provider store={store}>
      <App />
    </Provider>
  </View>
);

AppRegistry.registerComponent(appName, () => Component);

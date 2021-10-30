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
  <View style={{  flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center', }}>
    <Provider store={store}>
      <App />
    </Provider>
  </View>
);

AppRegistry.registerComponent(appName, () => Component);

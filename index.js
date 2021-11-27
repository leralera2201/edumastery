import React from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';
import PushNotification from 'react-native-push-notification';
import store, { persistor } from './src/store';
import App from './src/App';
import { navigationRef } from 'utils/navigation';
import { name as appName } from './app.json';

import axios from 'api/client';
import { removeItem } from 'storage';
import { logout } from 'pages/Auth/actions/auth.actions';
import Device from 'device';

PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
  },
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);
  },
  requestPermissions: Device.isIOS,
});

PushNotification.createChannel(
  {
    channelId: 'notification-channel',
    channelName: 'notification name',
    channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

PushNotification.getChannels((details) => console.log(details));

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
        // replace('Login');
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

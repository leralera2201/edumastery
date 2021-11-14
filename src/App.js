import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from 'pages/Auth/components/Login';
import Registration from 'pages/Auth/components/Registration';
import ForgotPassword from 'pages/Auth/components/ForgotPassword';
import SetPassword from 'pages/Auth/components/SetPassword';
import SetUserInfo from 'pages/Auth/components/SetUserInfo';
import { getItem } from 'storage';
import Loader from 'components/Loader';
import { logout } from 'pages/Auth/actions/auth.actions';
import { replace } from 'utils/navigation';

function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const backgroundStyle = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  };

  const handleLogout = () => {
    dispatch(logout());
    navigation.replace('Login');
  };

  return (
    <View style={backgroundStyle}>
      <Text>Home Screen</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>handleLogout</Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createNativeStackNavigator();

const App = () => {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const getToken = async () => {
      const token = await getItem('X-AuthToken');
      if (!token) {
        dispatch(logout());
      }
      setToken(token);
      setLoading(false);
    };
    getToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loading && !token) {
      replace('Login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <Stack.Navigator>
          <Stack.Group>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Registration" component={Registration} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="SetPassword" component={SetPassword} />
          </Stack.Group>
          <Stack.Group
            screenOptions={{
              presentation: 'fullScreenModal',
              title: 'Set Info',
            }}>
            <Stack.Screen name="SetUserInfo" component={SetUserInfo} />
          </Stack.Group>
        </Stack.Navigator>
      )}
    </>
  );
};

export default App;

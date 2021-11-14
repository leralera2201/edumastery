import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from 'pages/Auth/components/Login';
import Registration from 'pages/Auth/components/Registration';
import ForgotPassword from 'pages/Auth/components/ForgotPassword';
import SetPassword from 'pages/Auth/components/SetPassword';
import SetUserInfo from 'pages/Auth/components/SetUserInfo';
import Profile from 'pages/Profile';
import { getItem } from 'storage';
import Loader from 'components/Loader';
import NavBarButton from 'components/NavBarButton';
import { logout } from 'pages/Auth/actions/auth.actions';
import { navigate, navigationRef, replace } from 'utils/navigation';
import Config from 'config/colors';
import { removeItem } from 'storage';

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
const Tab = createBottomTabNavigator();

const HomeTabs = ({ navigation }) => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    dispatch(logout());
    await removeItem('X-AuthToken');
    navigation.replace('Login');
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Config.secondary },
        headerTitleStyle: { textTransform: 'uppercase' },
        headerRight: () => (
          <NavBarButton
            onPress={handleLogout}
            icon={require('./assets/logout.png')}
          />
        ),
      }}>
      <Tab.Screen name="Tests" component={HomeScreen} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

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
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Config.secondary },
          }}>
          <Stack.Group>
            <Stack.Screen
              name="Home"
              component={HomeTabs}
              options={{
                headerShown: false,
              }}
            />
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

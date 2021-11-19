import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Login from 'pages/Auth/components/Login';
import Registration from 'pages/Auth/components/Registration';
import ForgotPassword from 'pages/Auth/components/ForgotPassword';
import SetPassword from 'pages/Auth/components/SetPassword';
import SetUserInfo from 'pages/Auth/components/SetUserInfo';
import Profile from 'pages/Auth/components/Profile';
import EditProfile from 'pages/Auth/components/EditProfile';
import Loader from 'components/Loader';
import NavBarButton from 'components/NavBarButton';
import { logout } from 'pages/Auth/actions/auth.actions';
import { goBack } from 'utils/navigation';
import Config from 'config/colors';
import { removeItem } from 'storage';
import { getAuth } from 'pages/Auth/selectors/auth.selectors';
import EditPassword from 'pages/Auth/components/EditPassword';

function HomeScreen() {
  const backgroundStyle = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  };

  return (
    <View style={backgroundStyle}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();
const StackProfile = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ProfileStack = () => {
  const handleGoBack = () => {
    goBack();
  };

  return (
    <StackProfile.Navigator>
      <StackProfile.Group
        screenOptions={{
          headerShown: false,
        }}>
        <StackProfile.Screen name="Profile" component={Profile} />
      </StackProfile.Group>
      <StackProfile.Group
        screenOptions={{
          presentation: 'fullScreenModal',
          headerStyle: {
            backgroundColor: Config.secondary,
          },
          headerTitleStyle: { color: Config.white },
        }}>
        <StackProfile.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            title: 'EDIT PROFILE',
            headerLeft: () => (
              <TouchableOpacity onPress={handleGoBack}>
                <MaterialCommunityIcons
                  name="close"
                  size={25}
                  color={Config.white}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <StackProfile.Screen
          name="EditPassword"
          component={EditPassword}
          options={{
            title: 'CHANGE PASSWORD',
            headerLeft: () => (
              <TouchableOpacity onPress={handleGoBack}>
                <MaterialCommunityIcons
                  name="close"
                  size={25}
                  color={Config.white}
                />
              </TouchableOpacity>
            ),
          }}
        />
      </StackProfile.Group>
    </StackProfile.Navigator>
  );
};

const HomeTabs = () => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    dispatch(logout());
    await removeItem('X-AuthToken');
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Config.secondary },
        headerTitleStyle: { color: Config.white, textTransform: 'uppercase' },
        tabBarShowLabel: false,
        tabBarActiveTintColor: Config.secondary,
      }}>
      <Tab.Screen
        name="Tests"
        component={HomeScreen}
        options={{
          headerRight: () => (
            <View style={styles.icons}>
              <MaterialCommunityIcons
                name="filter-outline"
                size={25}
                color={Config.white}
                style={styles.filterIcon}
              />
              <NavBarButton onPress={handleLogout} />
            </View>
          ),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="book-open-variant"
              color={color}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          headerRight: () => <NavBarButton onPress={handleLogout} />,
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icons: {
    display: 'flex',
    flexDirection: 'row',
  },
  filterIcon: {
    marginRight: 15,
  },
});

const App = () => {
  const [loading, setLoading] = useState(true);
  const { token } = useSelector(getAuth) || {};
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      dispatch(logout());
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // useEffect(() => {
  //   if (!loading && !token) {
  //     replace('Login');
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [loading]);

  return (
    <>
      {loading && <Loader />}
      {!loading &&
        (token ? (
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: Config.secondary },
              headerTitleStyle: {
                color: Config.white,
              },
            }}>
            <Stack.Group>
              <Stack.Screen
                name="Home"
                component={HomeTabs}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Group>
            <Stack.Group
              screenOptions={{
                presentation: 'fullScreenModal',
                title: 'Set Info',
              }}>
              <Stack.Screen name="SetUserInfo" component={SetUserInfo} />
            </Stack.Group>
          </Stack.Navigator>
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: Config.secondary },
              headerTitleStyle: {
                color: Config.white,
              },
            }}>
            <Stack.Group>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Registration" component={Registration} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
              <Stack.Screen name="SetPassword" component={SetPassword} />
            </Stack.Group>
          </Stack.Navigator>
        ))}
    </>
  );
};

export default App;

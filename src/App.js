import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
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
import { getAuth } from 'pages/Auth/selectors/auth.selectors';
import EditPassword from 'pages/Auth/components/EditPassword';
import { logout } from 'pages/Auth/actions/auth.actions';
import Tests from 'pages/Tests/components/Tests';
import TestsFilter from 'pages/Tests/components/TestsFilter';
import CompletedTestsFilter from 'pages/Tests/components/CompletedTestsFilter';
import TestDetails from 'pages/Tests/components/TestDetails';
import MyTests from 'pages/Tests/components/MyTests';
import TestCompleting from 'pages/Tests/components/TestCompleting';
import Loader from 'components/Loader';
import NavBarButton from 'components/NavBarButton';
import Config from 'config/colors';
import { goBack, navigate } from 'utils/navigation';
import { removeItem } from 'storage';

function HomeScreen() {
  const dispatch = useDispatch();
  const handleGoBack = () => {
    goBack();
  };

  const handleLogout = async () => {
    dispatch(logout());
    await removeItem('X-AuthToken');
  };

  const handleNavigate = () => {
    navigate('TestsFilter');
  };

  return (
    <StackHome.Navigator>
      <StackHome.Group
        screenOptions={{
          headerStyle: {
            backgroundColor: Config.secondary,
          },
          headerTitleStyle: { color: Config.white },
        }}>
        <StackHome.Screen
          name="Tests"
          component={Tests}
          options={{
            title: 'Tests',
            headerRight: () => (
              <View style={styles.icons}>
                <TouchableOpacity onPress={handleNavigate}>
                  <MaterialCommunityIcons
                    name="filter-outline"
                    size={25}
                    color={Config.white}
                    style={styles.filterIcon}
                  />
                </TouchableOpacity>
                <NavBarButton onPress={handleLogout} />
              </View>
            ),
          }}
        />
        <StackHome.Screen
          name="TestDetails"
          component={TestDetails}
          options={{
            title: 'Test Details',
            headerLeft: () => (
              <TouchableOpacity onPress={handleGoBack}>
                <MaterialCommunityIcons
                  name="arrow-left"
                  size={25}
                  color={Config.white}
                />
              </TouchableOpacity>
            ),
          }}
        />
      </StackHome.Group>
      <StackHome.Group
        screenOptions={{
          presentation: 'fullScreenModal',
          headerStyle: {
            backgroundColor: Config.secondary,
          },
          headerTitleStyle: { color: Config.white },
        }}>
        <StackHome.Screen
          name="TestsFilter"
          component={TestsFilter}
          options={{
            title: 'Filter',
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
        <StackHome.Screen
          name="TestCompleting"
          component={TestCompleting}
          options={{
            title: 'Test',
          }}
        />
      </StackHome.Group>
    </StackHome.Navigator>
  );
}

const Stack = createNativeStackNavigator();
const StackHistory = createNativeStackNavigator();
const StackProfile = createNativeStackNavigator();
const StackHome = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ProfileStack = () => {
  const dispatch = useDispatch();
  const handleGoBack = () => {
    goBack();
  };

  const handleLogout = async () => {
    dispatch(logout());
    await removeItem('X-AuthToken');
  };

  return (
    <StackProfile.Navigator>
      <StackProfile.Group
        screenOptions={{
          headerRight: () => <NavBarButton onPress={handleLogout} />,
          title: 'Profile',
          headerStyle: { backgroundColor: Config.secondary },
          headerTitleStyle: {
            color: Config.white,
          },
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
            title: 'Edit Profile',
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
            title: 'Change password',
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

const HistoryStack = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logout());
    await removeItem('X-AuthToken');
  };

  const handleNavigate = () => {
    navigate('CompletedTestsFilter');
  };

  const handleGoBack = () => {
    goBack();
  };

  return (
    <StackHistory.Navigator>
      <StackHistory.Group
        screenOptions={{
          headerRight: () => (
            <View style={styles.icons}>
              <TouchableOpacity onPress={handleNavigate}>
                <MaterialCommunityIcons
                  name="filter-outline"
                  size={25}
                  color={Config.white}
                  style={styles.filterIcon}
                />
              </TouchableOpacity>
              <NavBarButton onPress={handleLogout} />
            </View>
          ),
          title: 'History',
          headerStyle: { backgroundColor: Config.secondary },
          headerTitleStyle: {
            color: Config.white,
          },
        }}>
        <StackHistory.Screen name="History" component={MyTests} />
      </StackHistory.Group>
      <StackHistory.Group
        screenOptions={{
          presentation: 'fullScreenModal',
          headerStyle: {
            backgroundColor: Config.secondary,
          },
          headerTitleStyle: { color: Config.white },
        }}>
        <StackHistory.Screen
          name="CompletedTestsFilter"
          component={CompletedTestsFilter}
          options={{
            title: 'Filter',
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
      </StackHistory.Group>
    </StackHistory.Navigator>
  );
};

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: Config.secondary,
        headerShown: false,
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
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
        name="MyTests"
        component={HistoryStack}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="folder-account"
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

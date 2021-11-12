import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from 'pages/Auth/components/Login';
import Registration from 'pages/Auth/components/Registration';
import ForgotPassword from 'pages/Auth/components/ForgotPassword';
import SetPassword from 'pages/Auth/components/SetPassword';

function HomeScreen({ navigation }) {
  const backgroundStyle = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  };

  const handlePress = () => {
    navigation.replace('Login');
  };

  return (
    <View style={backgroundStyle}>
      <Text>Home Screen</Text>
      <TouchableOpacity onPress={handlePress}>
        <Text>Move to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="SetPassword" component={SetPassword} />
    </Stack.Navigator>
  );
};

export default App;

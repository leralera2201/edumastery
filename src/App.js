import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from 'pages/Login';
import Registration from 'pages/Registration';
import ForgotPassword from 'pages/ForgotPassword';
import SetPassword from 'pages/SetPassword';

function HomeScreen({ navigation }) {
  const backgroundStyle = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  };

  const handlePress = () => {
    navigation.navigate('Login');
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

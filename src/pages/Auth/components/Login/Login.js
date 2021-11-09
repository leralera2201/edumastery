import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Config from 'config/colors';
import TextInput from 'components/TextInput';
import Device from 'device';
import {
  minLength,
  required,
  validateEmail,
  validateForm,
} from 'utils/validate';

const Login = ({ navigation }) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: {
      validators: [required, validateEmail],
      messages: [],
    },
    password: {
      validators: [required, minLength(6)],
      messages: [],
    },
  });

  const handleEmailChange = (text) => {
    setValues((prevValues) => ({
      ...prevValues,
      email: text,
    }));
  };

  const handlePasswordChange = (text) => {
    setValues((prevValues) => ({
      ...prevValues,
      password: text,
    }));
  };

  const handleNavigateRegistration = () => {
    navigation.navigate('Registration');
  };

  const handleNavigateToForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleLogin = () => {
    //replace entries with reduce
    const { newErrors, isValid } = validateForm(values, errors);
    setErrors(newErrors);
    if (isValid) {
      // do login
    }
  };

  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        style={styles.image}
        source={require('assets/logo.png')}
      />
      <TextInput
        inputStyle={styles.textInput}
        inputViewStyle={styles.inputView}
        placeholder="Email"
        placeholderTextColor="#003f5c"
        onChangeText={handleEmailChange}
        value={values.email}
        errors={errors.email.messages}
      />
      <TextInput
        inputStyle={styles.textInput}
        inputViewStyle={styles.inputView}
        placeholder="Password"
        placeholderTextColor="#003f5c"
        secureTextEntry={true}
        value={values.password}
        onChangeText={handlePasswordChange}
        errors={errors.password.messages}
      />
      <TouchableOpacity onPress={handleNavigateToForgotPassword}>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNavigateRegistration}>
        <Text style={styles.forgot_button}>Do not have an account?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  image: {
    flex: 1,
    alignSelf: 'stretch',
    width: Device.width,
    maxHeight: 200,
  },

  inputView: {
    backgroundColor: Config.secondary,
    borderRadius: 30,
    width: '70%',
    height: 45,
    alignItems: 'center',
  },

  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
  },

  forgot_button: {
    height: 30,
  },

  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: Config.primary,
  },
  loginText: {
    color: '#ffffff',
  },
});

export default Login;

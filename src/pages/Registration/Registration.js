import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import TextInput from 'components/TextInput';
import Config from 'config/colors';
import {
  maxLength,
  minLength,
  required,
  validateEmail,
  validateForm,
  equal,
} from 'utils/validate';

import Device from 'device';

const Registration = ({ navigation }) => {
  const [values, setValues] = useState({
    email: '',
    name: '',
    surname: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    email: {
      validators: [required, validateEmail],
      messages: [],
    },
    name: {
      validators: [required, minLength(2), maxLength(30)],
      messages: [],
    },
    surname: {
      validators: [required, minLength(2), maxLength(30)],
      messages: [],
    },
    password: {
      validators: [required, minLength(6)],
      messages: [],
    },
    confirmPassword: {
      validators: [required],
      messages: [],
    },
  });

  const handleEmailChange = (text) => {
    setValues((prevValues) => ({
      ...prevValues,
      email: text,
    }));
  };

  const handleNameChange = (text) => {
    setValues((prevValues) => ({
      ...prevValues,
      name: text,
    }));
  };

  const handleSurnameChange = (text) => {
    setValues((prevValues) => ({
      ...prevValues,
      surname: text,
    }));
  };

  const handleConfirmPasswordChange = (text) => {
    setValues((prevValues) => ({
      ...prevValues,
      confirmPassword: text,
    }));
  };

  const handlePasswordChange = (text) => {
    setValues((prevValues) => ({
      ...prevValues,
      password: text,
    }));
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleRegister = () => {
    //replace entries with reduce
    const { newErrors, isValid } = validateForm(values, errors);
    let errorsCopy = { ...newErrors };
    const confirmPasswordError = equal(
      values.confirmPassword,
      values.password,
      'password',
    );
    if (confirmPasswordError) {
      errorsCopy = {
        ...errorsCopy,
        confirmPassword: {
          ...errorsCopy.confirmPassword,
          messages: [
            ...errorsCopy.confirmPassword.messages,
            confirmPasswordError,
          ],
        },
      };
    }
    setErrors(errorsCopy);
    if (isValid && !confirmPasswordError) {
      // do registration
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
        placeholder="Name"
        placeholderTextColor="#003f5c"
        onChangeText={handleNameChange}
        value={values.name}
        errors={errors.name.messages}
      />
      <TextInput
        inputStyle={styles.textInput}
        inputViewStyle={styles.inputView}
        placeholder="Surname"
        placeholderTextColor="#003f5c"
        onChangeText={handleSurnameChange}
        value={values.surname}
        errors={errors.surname.messages}
      />
      <TextInput
        inputStyle={styles.textInput}
        inputViewStyle={styles.inputView}
        placeholder="Password"
        placeholderTextColor="#003f5c"
        secureTextEntry={true}
        onChangeText={handlePasswordChange}
        value={values.password}
        errors={errors.password.messages}
      />
      <TextInput
        inputStyle={styles.textInput}
        inputViewStyle={styles.inputView}
        placeholder="Confirm password"
        placeholderTextColor="#003f5c"
        secureTextEntry={true}
        onChangeText={handleConfirmPasswordChange}
        value={values.confirmPassword}
        errors={errors.confirmPassword.messages}
      />
      <TouchableOpacity onPress={handleGoBack}>
        <Text style={styles.forgot_button}>Already have an account?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn} onPress={handleRegister}>
        <Text style={styles.loginText}>Register</Text>
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

export default Registration;

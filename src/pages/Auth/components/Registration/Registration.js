import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import TextInput from 'components/TextInput';
import Loader from 'components/Loader';
import Config from 'config/colors';
import {
  maxLength,
  minLength,
  required,
  validateEmail,
  validateForm,
  equal,
} from 'utils/validate';
import { isLoading } from 'utils/isLoading';

import Device from 'device';
import { resetAuth, registerStart } from 'pages/Auth/actions/auth.actions';
import { getAuthStatus } from 'pages/Auth/selectors/auth.selectors';
import { ACTION_STATUS } from 'constants';

const Registration = ({ navigation, register, status, resetRegister }) => {
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
      showError: false,
    },
    name: {
      validators: [required, minLength(2), maxLength(30)],
      messages: [],
      showError: false,
    },
    surname: {
      validators: [required, minLength(2), maxLength(30)],
      messages: [],
      showError: false,
    },
    password: {
      validators: [required, minLength(6)],
      messages: [],
      showError: false,
    },
    confirmPassword: {
      validators: [required],
      messages: [],
      showError: false,
    },
  });

  useEffect(() => {
    if (status === ACTION_STATUS.SUCCESS) {
      navigation.replace('Login');
    }

    return () => {
      resetRegister();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const loading = isLoading(status);

  const handleEmailChange = (text) => {
    setValues((prevValues) => ({
      ...prevValues,
      email: text,
    }));
  };

  const handleBlur = (name) => {
    let messages = errors[name].validators
      .reduce((acc, validate) => {
        acc.push(validate(values[name]));
        return acc;
      }, [])
      .filter((msg) => !!msg);

    if (name === 'confirmPassword') {
      const isEqualPasswords = equal(
        values.confirmPassword,
        values.password,
        'password',
      );
      if (isEqualPasswords) {
        messages = [...messages, isEqualPasswords];
      }
    }
    setErrors((prevValues) => ({
      ...prevValues,
      [name]: {
        ...prevValues[name],
        showError: true,
        messages,
      },
    }));
  };

  const handleFocus = (name) => {
    setErrors((prevValues) => ({
      ...prevValues,
      [name]: {
        ...prevValues[name],
        showError: false,
      },
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
    navigation.replace('Login');
  };

  const handleRegister = () => {
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
    const { confirmPassword, ...otherValues } = values;
    if (isValid && !confirmPasswordError) {
      register(otherValues);
    }
  };

  return (
    <View style={styles.container}>
      {loading && <Loader />}
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
        errors={errors.email.showError ? errors.email.messages : []}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        onBlur={() => handleBlur('email')}
        onFocus={() => handleFocus('email')}
      />
      <TextInput
        inputStyle={styles.textInput}
        inputViewStyle={styles.inputView}
        placeholder="Name"
        placeholderTextColor="#003f5c"
        onChangeText={handleNameChange}
        value={values.name}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        errors={errors.name.showError ? errors.name.messages : []}
        onBlur={() => handleBlur('name')}
        onFocus={() => handleFocus('name')}
      />
      <TextInput
        inputStyle={styles.textInput}
        inputViewStyle={styles.inputView}
        placeholder="Surname"
        placeholderTextColor="#003f5c"
        onChangeText={handleSurnameChange}
        value={values.surname}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        errors={errors.surname.showError ? errors.surname.messages : []}
        onBlur={() => handleBlur('surname')}
        onFocus={() => handleFocus('surname')}
      />
      <TextInput
        inputStyle={styles.textInput}
        inputViewStyle={styles.inputView}
        placeholder="Password"
        placeholderTextColor="#003f5c"
        secureTextEntry={true}
        onChangeText={handlePasswordChange}
        value={values.password}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        errors={errors.password.showError ? errors.password.messages : []}
        onBlur={() => handleBlur('password')}
        onFocus={() => handleFocus('password')}
      />
      <TextInput
        inputStyle={styles.textInput}
        inputViewStyle={styles.inputView}
        placeholder="Confirm password"
        placeholderTextColor="#003f5c"
        secureTextEntry={true}
        onChangeText={handleConfirmPasswordChange}
        value={values.confirmPassword}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        errors={
          errors.confirmPassword.showError
            ? errors.confirmPassword.messages
            : []
        }
        onBlur={() => handleBlur('confirmPassword')}
        onFocus={() => handleFocus('confirmPassword')}
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
    marginBottom: 20,
    backgroundColor: Config.primary,
  },
  loginText: {
    color: '#ffffff',
  },
});

const mapStateToProps = (state) => ({
  status: getAuthStatus(state),
});

const mapDispatchToProps = {
  register: registerStart,
  resetRegister: resetAuth,
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);

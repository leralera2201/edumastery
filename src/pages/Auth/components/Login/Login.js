import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Config from 'config/colors';
import TextInput from 'components/TextInput';
import Loader from 'components/Loader';
import { ACTION_STATUS } from 'constants';
import { isLoading } from 'utils/isLoading';
import { loginUserStart } from '../../actions/auth.actions';
import { getAuth, getAuthStatus } from '../../selectors/auth.selectors';
import Device from 'device';
import {
  minLength,
  required,
  validateEmail,
  validateForm,
} from 'utils/validate';

const Login = ({ navigation, status, login, data }) => {
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

  useEffect(() => {
    if (status === ACTION_STATUS.SUCCESS) {
      if (!data?.nickname) {
        navigation.replace('SetUserInfo');
      } else {
        navigation.replace('Home');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const handleBlur = (name) => {
    const messages = errors[name].validators
      .reduce((acc, validate) => {
        acc.push(validate(values[name]));
        return acc;
      }, [])
      .filter((msg) => !!msg);

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
    navigation.replace('Registration');
  };

  const handleNavigateToForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleLogin = () => {
    const { newErrors, isValid } = validateForm(values, errors);
    setErrors(newErrors);
    if (isValid) {
      login(values);
    }
  };

  const loading = isLoading(status);

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
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        errors={errors.email.showError ? errors.email.messages : []}
        onBlur={() => handleBlur('email')}
        onFocus={() => handleFocus('email')}
      />
      <TextInput
        inputStyle={styles.textInput}
        inputViewStyle={styles.inputView}
        placeholder="Password"
        placeholderTextColor="#003f5c"
        secureTextEntry={true}
        value={values.password}
        onChangeText={handlePasswordChange}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        errors={errors.password.showError ? errors.password.messages : []}
        onBlur={() => handleBlur('password')}
        onFocus={() => handleFocus('password')}
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
    marginBottom: 20,
  },
  loginText: {
    color: '#ffffff',
  },
});

const mapStateToProps = (state) => ({
  status: getAuthStatus(state),
  data: getAuth(state),
});

const mapDispatchToProps = {
  login: loginUserStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

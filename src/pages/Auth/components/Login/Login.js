import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import Config from 'config/colors';
import TextInput from 'components/TextInput';
import Loader from 'components/Loader';
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

const Login = ({ navigation, status, login }) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: {
      validators: [required, validateEmail],
      messages: [],
      showError: false,
      isFocused: false,
    },
    password: {
      validators: [required, minLength(6)],
      messages: [],
      showError: false,
      isFocused: false,
    },
  });

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
        isFocused: false,
      },
    }));
  };

  const handleFocus = (name) => {
    setErrors((prevValues) => ({
      ...prevValues,
      [name]: {
        ...prevValues[name],
        showError: false,
        isFocused: true,
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
    <KeyboardAvoidingView
      behavior={Device.isIOS ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={styles.container}>
            {loading && <Loader />}
            <Image
              resizeMode="contain"
              style={styles.image}
              source={require('assets/Edumastery.png')}
            />
            <TextInput
              inputStyle={styles.textInput}
              inputViewStyle={[
                styles.inputView,
                errors.email.isFocused && styles.inputViewFocused,
              ]}
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
              inputViewStyle={[
                styles.inputView,
                errors.password.isFocused && styles.inputViewFocused,
              ]}
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
            {/* <TouchableOpacity onPress={handleNavigateToForgotPassword}>
              <Text style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={handleNavigateRegistration}>
              <Text style={styles.forgot_button}>Do not have an account?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: Device.height - 40,
  },

  image: {
    flex: 1,
    alignSelf: 'stretch',
    marginTop: 20,
    width: Device.width,
    maxHeight: 200,
    marginBottom: 50,
  },

  inputView: {
    borderRadius: 5,
    borderColor: Config.darkGray,
    borderWidth: 1,
    width: '70%',
    height: 45,
  },
  inputViewFocused: {
    borderColor: Config.secondary,
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
    width: '70%',
    borderRadius: 5,
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

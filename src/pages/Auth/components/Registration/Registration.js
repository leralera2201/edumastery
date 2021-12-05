import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
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
    mailing: true,
  });
  const [errors, setErrors] = useState({
    email: {
      validators: [required, validateEmail],
      messages: [],
      showError: false,
      isFocused: false,
    },
    name: {
      validators: [required, minLength(2), maxLength(30)],
      messages: [],
      showError: false,
      isFocused: false,
    },
    surname: {
      validators: [required, minLength(2), maxLength(30)],
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
    confirmPassword: {
      validators: [required],
      messages: [],
      showError: false,
      isFocused: false,
    },
  });

  useEffect(() => {
    if (status === ACTION_STATUS.SUCCESS) {
      navigation.replace('Login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    return () => {
      resetRegister();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loading = isLoading(status);

  const handleEmailChange = (text) => {
    setValues((prevValues) => ({
      ...prevValues,
      email: text,
    }));
  };

  const handleMailingChange = (value) => {
    setValues((prevValues) => ({
      ...prevValues,
      mailing: value,
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
    const { mailing, ...otherValues } = values;
    const { newErrors, isValid } = validateForm(otherValues, errors);
    let errorsCopy = { ...newErrors };
    const confirmPasswordError = equal(
      otherValues.confirmPassword,
      otherValues.password,
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
    const { confirmPassword, ...rest } = values;
    if (isValid && !confirmPasswordError) {
      register(rest);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Device.isIOS ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView>
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={Device.isIOS ? styles.paddingBottom : {}}>
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
              errors={errors.email.showError ? errors.email.messages : []}
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect={false}
              onBlur={() => handleBlur('email')}
              onFocus={() => handleFocus('email')}
            />
            <TextInput
              inputStyle={styles.textInput}
              inputViewStyle={[
                styles.inputView,
                errors.name.isFocused && styles.inputViewFocused,
              ]}
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
              inputViewStyle={[
                styles.inputView,
                errors.surname.isFocused && styles.inputViewFocused,
              ]}
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
              inputViewStyle={[
                styles.inputView,
                errors.password.isFocused && styles.inputViewFocused,
              ]}
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
              inputViewStyle={[
                styles.inputView,
                errors.confirmPassword.isFocused && styles.inputViewFocused,
              ]}
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
            <View style={styles.checkboxWrapper}>
              <CheckBox
                boxType={'square'}
                disabled={false}
                style={styles.checkbox}
                value={values.mailing}
                onValueChange={handleMailingChange}
              />
              <Text style={styles.checkboxText}>
                I would like to receive emails
              </Text>
            </View>
            <TouchableOpacity onPress={handleGoBack} style={styles.spaceTop}>
              <Text style={styles.forgot_button}>Already have an account?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} onPress={handleRegister}>
              <Text style={styles.loginText}>Register</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
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
  },
  spaceTop: {
    marginTop: 30,
  },
  image: {
    flex: 1,
    marginTop: 20,
    alignSelf: 'stretch',
    width: Device.width,
    maxHeight: 200,
    minHeight: 200,
    marginBottom: 30,
  },
  checkboxWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
  },
  checkbox: {
    width: 20,
    height: 20,
  },
  checkboxText: {
    marginLeft: 10,
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
    marginTop: 30,
    marginBottom: 20,
    backgroundColor: Config.primary,
  },
  loginText: {
    color: '#ffffff',
  },
  paddingBottom: {
    paddingBottom: 50,
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

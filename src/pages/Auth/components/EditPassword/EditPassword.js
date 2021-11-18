import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import TextInput from 'components/TextInput';
import Config from 'config/colors';
import {
  getAuth,
  getAuthStatus,
  getAuthError,
} from 'pages/Auth/selectors/auth.selectors';
import { minLength, required, validateForm, equal } from 'utils/validate';
import { isLoading } from 'utils/isLoading';
import Loader from 'components/Loader';
import { updateAccountStart } from 'pages/Auth/actions/auth.actions';
import { ACTION_STATUS } from 'constants';

const EditPassword = ({ data, navigation, status, updateAccount, error }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [values, setValues] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
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
    if (isSubmitted && status === ACTION_STATUS.SUCCESS) {
      navigation.goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitted, status]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSave}>
          <MaterialCommunityIcons name="check" size={25} color={Config.white} />
        </TouchableOpacity>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = () => {
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
    errorsCopy(newErrors);

    if (isValid) {
      // updateAccount({ password: values.password });
      // setIsSubmitted(true);
    }
  };

  const loading = isLoading(status);

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

  return (
    <View style={styles.container}>
      {loading && <Loader />}
      <View style={styles.center}>
        <MaterialCommunityIcons size={200} name="lock" color={Config.primary} />
      </View>
      <View style={styles.wrapper}>
        {!!error && (
          <View>
            <Text style={styles.error}>{error}</Text>
          </View>
        )}
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Config.white,
    height: '100%',
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 70,
    marginBottom: 30,
  },
  imageBox: {
    width: 200,
    height: 200,
  },
  error: {
    color: Config.error,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    marginHorizontal: 10,
  },
  divider: {
    borderBottomColor: Config.darkGray,
    borderBottomWidth: 1,
  },
  wrapperText: {
    fontSize: 20,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  wrapper: {
    marginVertical: 20,
  },
  fieldContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  fieldText: {
    fontSize: 20,
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
});

const mapStateToProps = (state) => ({
  data: getAuth(state),
  status: getAuthStatus(state),
  error: getAuthError(state),
});

const mapDispatchToProps = {
  updateAccount: updateAccountStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPassword);

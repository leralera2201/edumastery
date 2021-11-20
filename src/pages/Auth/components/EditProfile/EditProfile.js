import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ImagePicker from 'components/ImagePicker';
import TextInput from 'components/TextInput';
import Config from 'config/colors';
import Device from 'device';
import {
  getAuth,
  getAuthStatus,
  getAuthError,
} from 'pages/Auth/selectors/auth.selectors';
import {
  maxLength,
  minLength,
  required,
  validateEmail,
  validateForm,
} from 'utils/validate';
import { isLoading } from 'utils/isLoading';
import Loader from 'components/Loader';
import { updateAccountStart } from 'pages/Auth/actions/auth.actions';
import { ACTION_STATUS } from 'constants';
import Divider from 'components/Divider';

const EditProfile = ({ data, navigation, status, updateAccount, error }) => {
  const [imageSource, setImageSource] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [values, setValues] = useState({
    email: '',
    name: '',
    surname: '',
    nickname: '',
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
    nickname: {
      validators: [required, minLength(2), maxLength(30)],
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
  }, [values]);

  useEffect(() => {
    setValues({
      email: data?.email,
      name: data?.name,
      surname: data?.surname,
      nickname: data?.nickname,
    });
  }, [data]);

  const handleSave = () => {
    const { newErrors, isValid } = validateForm(values, errors);
    setErrors(newErrors);
    const form = new FormData();
    if (isValid) {
      if (imageSource) {
        form.append('photo', {
          name: imageSource.fileName,
          uri: Device.isAndroid
            ? imageSource.uri
            : imageSource.uri.replace('file://', ''),
          type: imageSource.type,
        });
      }
      form.append('nickname', values.nickname);
      form.append('name', values.name);
      form.append('surname', values.surname);
      form.append('email', values.email);
      updateAccount(form);
      setIsSubmitted(true);
    }
  };

  const loading = isLoading(status);

  const handleEmailChange = (text) => {
    setValues((prevValues) => ({
      ...prevValues,
      email: text,
    }));
  };

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

  const handleNicknameChange = (text) => {
    setValues((prevValues) => ({
      ...prevValues,
      nickname: text,
    }));
  };

  return (
    <View style={styles.container}>
      {loading && <Loader />}
      <ImagePicker
        setImageSource={setImageSource}
        imageSource={imageSource?.uri}
      />
      <Divider />
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
            errors.nickname.isFocused && styles.inputViewFocused,
          ]}
          placeholder="Nickname"
          placeholderTextColor="#003f5c"
          onChangeText={handleNicknameChange}
          value={values.nickname}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          errors={errors.nickname.showError ? errors.nickname.messages : []}
          onBlur={() => handleBlur('nickname')}
          onFocus={() => handleFocus('nickname')}
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
  error: {
    color: Config.error,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    marginHorizontal: 10,
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';

import ImagePicker from 'components/ImagePicker';
import TextInput from 'components/TextInput';
import Loader from 'components/Loader';
import { maxLength, minLength, required, validateForm } from 'utils/validate';
import { getAuthStatus } from 'pages/Auth/selectors/auth.selectors';
import { updateAccountStart } from 'pages/Auth/actions/auth.actions';
import { isLoading } from 'utils/isLoading';

import Config from 'config/colors';
import Device from 'device';
import { ACTION_STATUS } from 'constants';

const SetUserInfo = ({ status, updateAccount, navigation }) => {
  const [imageSource, setImageSource] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [values, setValues] = useState({
    nickname: '',
  });
  const [errors, setErrors] = useState({
    nickname: {
      validators: [required, minLength(2), maxLength(30)],
      messages: [],
      showError: false,
    },
  });

  useEffect(() => {
    if (isSubmitted && status === ACTION_STATUS.SUCCESS) {
      navigation.replace('Home');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitted, status]);

  const loading = isLoading(status);

  const handleNicknameChange = (text) => {
    setValues((prevValues) => ({
      ...prevValues,
      nickname: text,
    }));
  };

  const handleBlur = (name) => {
    let messages = errors[name].validators
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

  const handleUpdateAccount = () => {
    const { newErrors, isValid } = validateForm(values, errors);
    const form = new FormData();
    setErrors(newErrors);
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
      if (values.nickname) {
        form.append('nickname', values.nickname);
      }
      updateAccount(form);
      setIsSubmitted(true);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        {loading && <Loader />}
        <ImagePicker
          imageSource={imageSource}
          setImageSource={setImageSource}
        />
        <TextInput
          inputStyle={styles.textInput}
          inputViewStyle={styles.inputView}
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
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.loginBtn} onPress={handleUpdateAccount}>
          <Text style={styles.btnText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '100%',
  },
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  inputView: {
    backgroundColor: Config.secondary,
    borderRadius: 30,
    width: '70%',
    height: 45,
    alignItems: 'center',
    marginTop: 40,
  },

  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
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
  btnText: {
    color: '#ffffff',
  },
});

const mapStateToProps = (state) => ({
  status: getAuthStatus(state),
});

const mapDispatchToProps = {
  updateAccount: updateAccountStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(SetUserInfo);

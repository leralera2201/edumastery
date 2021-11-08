import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import TextInput from 'components/TextInput';
import Config from 'config/colors';
import { required, validateEmail, validateForm } from 'utils/validate';

import Device from 'device';

const ForgotPassword = ({ navigation }) => {
  const [values, setValues] = useState({
    email: '',
  });
  const [errors, setErrors] = useState({
    email: {
      validators: [required, validateEmail],
      messages: [],
    },
  });

  const handleEmailChange = (text) => {
    setValues((prevValues) => ({
      ...prevValues,
      email: text,
    }));
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleForgot = () => {
    //replace entries with reduce
    const { newErrors, isValid } = validateForm(values, errors);
    setErrors(newErrors);
    if (isValid) {
      // do forgot password
      navigation.navigate('SetPassword');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        style={styles.image}
        source={require('assets/logo.png')}
      />
      <View style={styles.bottomSpace}>
        <TextInput
          inputStyle={styles.textInput}
          inputViewStyle={styles.inputView}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={handleEmailChange}
          value={values.email}
          errors={errors.email.messages}
        />
      </View>

      <TouchableOpacity onPress={handleGoBack}>
        <Text style={styles.forgot_button}>Return to login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn} onPress={handleForgot}>
        <Text style={styles.loginText}>Confirm</Text>
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
  bottomSpace: {
    width: '100%',
    marginBottom: 60,
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

export default ForgotPassword;

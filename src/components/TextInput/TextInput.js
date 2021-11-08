import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import Config from 'config/colors';

const Input = ({ errors, inputViewStyle, inputStyle, ...props }) => (
  <View style={styles.wrapper}>
    <View style={inputViewStyle}>
      <TextInput style={inputStyle} {...props} />
    </View>
    <View style={errors.length ? styles.errorWrapper : styles.extraSpace}>
      {!!errors.length && <Text style={styles.error}>{errors[0]}</Text>}
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  extraSpace: {
    marginBottom: 16,
  },
  errorWrapper: {
    width: '70%',
    paddingLeft: 5,
  },
  error: {
    color: Config.error,
    alignSelf: 'flex-start',
  },
});

export default Input;

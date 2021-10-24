import * as React from 'react';
import { Text, StyleSheet } from 'react-native';

// todo: add fonts
const styles = StyleSheet.create({
  text: {
    // fontFamily: Config.fonts.family,
  },
});

const CiviText = ({ style, children, ...otherProps } = {}) => (
  <Text style={[styles.text, style]} allowFontScaling={false} {...otherProps}>
    {children}
  </Text>
);

export default CiviText;

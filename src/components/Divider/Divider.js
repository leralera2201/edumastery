import React from 'react';
import { View, StyleSheet } from 'react-native';
import Config from 'config/colors';

const Divider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  divider: {
    borderBottomColor: Config.darkGray,
    borderBottomWidth: 1,
  },
});

export default Divider;

import React from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';

import Config from 'config/colors';

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Config.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    opacity: 0.7,
    backgroundColor: 'white',
  },
});

export default Loader;

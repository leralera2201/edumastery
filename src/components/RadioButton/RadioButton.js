import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Config from 'config/colors';

const RadioButton = ({ selected, title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.radioButtonWrapper}>
      <View style={styles.radioButton}>
        {selected ? <View style={styles.radioButtonSelected} /> : null}
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  radioButton: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Config.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: Config.secondary,
  },
  title: {
    fontSize: 18,
    marginLeft: 10,
    flex: 1,
  },
});

export default RadioButton;

import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

import Config from 'config/colors';
import { difficultyObj } from 'constants';

const TestItem = ({ onPress, title, difficulty, categoryName }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
      <View style={[styles.bottomWrapper, styles.extraTopSpace]}>
        <View style={styles.categoryWrapper}>
          <Text style={styles.category}>{categoryName}</Text>
        </View>
        <View style={styles.difficultyWrapper}>
          <View style={styles.circle} />
          <Text style={styles.difficulty}>{difficultyObj[difficulty]}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
  difficultyWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginVertical: 15,
    fontStyle: 'italic',
  },
  bottomWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  categoryWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
    backgroundColor: Config.primary,
  },
  circle: {
    width: 10,
    height: 10,
    backgroundColor: Config.darkGray,
    borderRadius: 50,
  },
  category: {
    color: Config.white,
    fontSize: 16,
  },
  difficulty: {
    color: Config.darkGray,
    marginLeft: 5,
    fontSize: 14,
  },
  extraTopSpace: {
    marginTop: 10,
  },
});

export default TestItem;

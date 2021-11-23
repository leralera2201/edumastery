import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Config from 'config/colors';
import { difficultyObj } from 'constants';

const TestItem = ({ title, difficulty, categoryName, maxMark, mark }) => {
  const percent = (mark * 100) / maxMark;

  return (
    <View style={styles.wrapper}>
      <View style={[styles.bottomWrapper, styles.extraBottomSpace]}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.difficultyWrapper}>
          <View style={styles.circle} />
          <Text style={styles.difficulty}>{difficultyObj[difficulty]}</Text>
        </View>
      </View>
      <View style={styles.bottomWrapper}>
        <View style={styles.categoryWrapper}>
          <Text style={styles.category}>{categoryName}</Text>
        </View>
        <View
          style={[
            styles.totalScoreWrapper,
            {
              backgroundColor:
                percent < 50
                  ? Config.error
                  : percent < 75
                  ? Config.warning
                  : Config.success,
            },
          ]}>
          <Text style={styles.totalScore}>
            {mark}/{maxMark}
          </Text>
        </View>
      </View>
    </View>
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
  totalScoreWrapper: {
    width: 70,
    paddingVertical: 10,
    borderRadius: 50,
  },
  totalScore: {
    fontSize: 16,
    color: Config.white,
    textAlign: 'center',
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
  extraBottomSpace: {
    marginBottom: 10,
  },
});

export default TestItem;

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Config from 'config/colors';
import { difficultyObj } from 'constants';

const TestDetails = ({ route, navigation }) => {
  const { test } = route.params;
  const handlePress = () => {
    navigation.navigate('TestCompleting', {
      test,
    });
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.info}>
        <Text style={styles.title}>{test.name}</Text>
        <View style={styles.flex}>
          <Text style={styles.text}>Category:</Text>
          <Text style={styles.subtitle}>{test.categoryName}</Text>
        </View>
        <View style={styles.flex}>
          <Text style={styles.text}>Difficulty:</Text>
          <Text style={styles.subtitle}>{difficultyObj[test.difficulty]}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontStyle: 'italic',
    marginVertical: 10,
  },
  subtitle: {
    marginLeft: 10,
    fontSize: 20,
  },
  text: {
    fontSize: 18,
    color: Config.darkGray,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  info: {
    alignSelf: 'flex-start',
    marginHorizontal: 10,
    marginVertical: 20,
  },
  button: {
    width: '90%',
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 20,
    backgroundColor: Config.primary,
  },
  buttonText: {
    color: Config.white,
    fontSize: 16,
  },
});

export default TestDetails;

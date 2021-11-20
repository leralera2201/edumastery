import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNPickerSelect from 'react-native-picker-select';

import Device from 'device';
import TextInput from 'components/TextInput';
import RadioButton from 'components/RadioButton';
import Divider from 'components/Divider';
import Config from 'config/colors';

import { categories } from '../../dummyData';

const TestsFilter = ({ navigation }) => {
  const [values, setValues] = useState({
    search: '',
    difficulty: {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
    },
    category: '',
  });

  const [focused, setFocused] = useState({
    search: false,
  });

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleFilter}>
          <MaterialCommunityIcons name="check" size={25} color={Config.white} />
        </TouchableOpacity>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilter = () => {
    navigation.goBack();
  };

  const handleBlur = (name) => {
    setFocused((prevValues) => ({
      ...prevValues,
      [name]: false,
    }));
  };

  const handleFocus = (name) => {
    setFocused((prevValues) => ({
      ...prevValues,
      [name]: true,
    }));
  };

  const handleSearch = (text) => {
    setValues((prevValues) => ({
      ...prevValues,
      search: text,
    }));
  };

  const handleCategoryChange = (value) => {
    setValues((prevValues) => ({
      ...prevValues,
      category: value,
    }));
  };

  const handleDifficultyChange = (prop) => {
    setValues((prevValues) => ({
      ...prevValues,
      difficulty: {
        ...prevValues.difficulty,
        [prop]: !prevValues.difficulty[prop],
      },
    }));
  };

  const placeholder = {
    label: 'Select category...',
    value: null,
  };

  return (
    <View style={styles.wrapper}>
      <TextInput
        inputStyle={styles.textInput}
        inputViewStyle={[
          styles.inputView,
          focused.search && styles.inputViewFocused,
        ]}
        placeholder="Search"
        placeholderTextColor="#003f5c"
        onChangeText={handleSearch}
        value={values.search}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        onBlur={() => handleBlur('search')}
        onFocus={() => handleFocus('search')}
      />
      <Divider />
      <View style={styles.selectWrapper}>
        <RNPickerSelect
          placeholder={placeholder}
          style={pickerSelectStyles}
          value={values.category}
          onValueChange={handleCategoryChange}
          items={categories.map((category) => ({
            label: category.name,
            value: category.id,
          }))}
        />
      </View>
      <Divider />
      <View style={styles.radioWrapper}>
        <RadioButton
          title="Beginner"
          selected={values.difficulty[1]}
          onPress={() => handleDifficultyChange('1')}
        />
        <RadioButton
          title="Easy"
          selected={values.difficulty[2]}
          onPress={() => handleDifficultyChange('2')}
        />
        <RadioButton
          title="Normal"
          selected={values.difficulty[3]}
          onPress={() => handleDifficultyChange('3')}
        />
        <RadioButton
          title="Hard"
          selected={values.difficulty[4]}
          onPress={() => handleDifficultyChange('4')}
        />
        <RadioButton
          title="Extremely hard"
          selected={values.difficulty[5]}
          onPress={() => handleDifficultyChange('5')}
        />
      </View>
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    width: Device.width * 0.9,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Config.darkGray,
    borderRadius: 5,
    color: 'black',
    paddingRight: 30,
    marginVertical: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    width: Device.width * 0.9,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Config.darkGray,
    borderRadius: 5,
    color: 'black',
    paddingRight: 30,
    marginVertical: 20,
  },
  placeholder: {
    color: Config.darkGray,
  },
});

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 30,
  },
  selectWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  radioWrapper: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  inputView: {
    borderRadius: 5,
    borderColor: Config.darkGray,
    borderWidth: 1,
    width: '90%',
    height: 45,
  },
  inputViewFocused: {
    borderColor: Config.secondary,
  },
  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
  },
});

export default TestsFilter;

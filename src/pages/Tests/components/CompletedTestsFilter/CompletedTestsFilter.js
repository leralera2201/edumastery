import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNPickerSelect from 'react-native-picker-select';

import Device from 'device';
import {
  applyCompletedFilter,
  fetchCompletedTestsStart,
} from 'pages/Tests/actions/tests.actions';
import {
  getCategories,
  getCategoriesStatus,
  getCompletedTestsFilter,
  getCompletedTestsStatus,
} from 'pages/Tests/selectors/tests.selectors';
import { fetchCategoriesStart } from 'pages/Tests/actions/categories.actions';
import TextInput from 'components/TextInput';
import RadioButton from 'components/RadioButton';
import Divider from 'components/Divider';
import Loader from 'components/Loader';
import Config from 'config/colors';
import { isLoading } from 'utils/isLoading';

const diff = [1, 2, 3, 4, 5];

const TestsFilter = ({
  navigation,
  filterTests,
  status,
  fetchTests,
  fetchCategories,
  categories,
  categoriesStatus,
  filter,
}) => {
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

  useEffect(() => {
    const newFilter = {};

    if (filter.searchWord) {
      newFilter.search = filter.searchWord;
    }
    if (filter.categoryId) {
      newFilter.category = filter.categoryId;
    }
    if (filter.difficulties) {
      const difference = diff.filter(
        (item) => !filter.difficulties.includes(item),
      );
      const falsyValues = difference.reduce((acc, curVal) => {
        acc[curVal] = false;
        return acc;
      }, {});
      const truthValues = filter.difficulties.reduce((acc, curVal) => {
        acc[curVal] = true;
        return acc;
      }, {});
      newFilter.difficulty = {
        ...falsyValues,
        ...truthValues,
      };
    }
    Object.keys(newFilter).length && setValues(newFilter);
  }, [filter]);

  const [focused, setFocused] = useState({
    search: false,
  });

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleFilter}>
          <MaterialCommunityIcons name="check" size={25} color={Config.white} />
        </TouchableOpacity>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const handleFilter = () => {
    filterTests({
      searchWord: values.search,
      categoryId: values.category,
      difficulties: Object.keys(values.difficulty)
        .filter((item) => !!values.difficulty[item])
        .map((dif) => +dif),
    });
    fetchTests({ page: 1 });
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

  const loading = isLoading(status, categoriesStatus);

  return (
    <View style={styles.wrapper}>
      {loading && <Loader />}
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
            value: category._id,
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

const mapStateToProps = (state) => ({
  status: getCompletedTestsStatus(state),
  categories: getCategories(state),
  categoriesStatus: getCategoriesStatus(state),
  filter: getCompletedTestsFilter(state),
});

const mapDispatchToProps = {
  filterTests: applyCompletedFilter,
  fetchTests: fetchCompletedTestsStart,
  fetchCategories: fetchCategoriesStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(TestsFilter);

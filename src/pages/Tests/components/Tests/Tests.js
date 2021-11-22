import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, VirtualizedList, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Divider from 'components/Divider';
import Config from 'config/colors';
import { fetchTestsStart } from 'pages/Tests/actions/tests.actions';
import {
  getTests,
  getTestsFilter,
  getTestsStatus,
  getTestsTotal,
} from 'pages/Tests/selectors/tests.selectors';
import { ACTION_STATUS } from 'constants';
import { isLoading } from 'utils/isLoading';

import TestItem from './TestItem';
import Loader from 'components/Loader';

const Tests = ({ tests, fetchTests, filter, status, total, navigation }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  useEffect(() => {
    fetchTests({ page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status !== ACTION_STATUS.IN_PROGRESS && isRefreshing) {
      setIsRefreshing(false);
    }
  }, [isRefreshing, status]);

  const onPress = (test) => {
    navigation.push('TestDetails', {
      test,
    });
  };
  const renderItem = ({ item }) => {
    return (
      <TestItem
        title={item.name}
        categoryName={item.category.name}
        onPress={() => onPress(item)}
        difficulty={item.difficulty}
      />
    );
  };

  const getItem = (data, index) => {
    return data[index];
  };

  const getTotal = () => total;

  const onEndReached = () => {
    if (filter.page * filter.pageSize < total) {
      fetchTests({ page: filter.page + 1 });
    }
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchTests({ page: 1 });
  };

  const loading = isLoading(status);

  const renderNoFilteredData = () => (
    <View style={[styles.container, styles.center]}>
      <View style={styles.center}>
        <MaterialCommunityIcons
          name="alert-circle-outline"
          size={150}
          color={Config.secondary}
        />
        <Text style={styles.text}>No data available for these filters. </Text>
      </View>
    </View>
  );

  const renderNoData = () => (
    <View style={[styles.container, styles.center]}>
      <View style={styles.center}>
        <MaterialCommunityIcons
          name="alert-circle-outline"
          size={160}
          color={Config.secondary}
        />
        <Text style={styles.text}>No data available (yet).</Text>
      </View>
    </View>
  );

  if (!total && !loading) {
    if (
      !filter.searchWord &&
      !filter.difficulties?.length &&
      !filter.categoryId
    ) {
      return renderNoData();
    }
    return renderNoFilteredData();
  }

  return (
    <View style={styles.container}>
      {loading && !isRefreshing && <Loader />}
      <VirtualizedList
        data={tests}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        getItem={getItem}
        ItemSeparatorComponent={Divider}
        onEndReached={onEndReached}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        getItemCount={getTotal}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  filter: getTestsFilter(state),
  tests: getTests(state),
  status: getTestsStatus(state),
  total: getTestsTotal(state),
});

const mapDispatchToProps = {
  fetchTests: fetchTestsStart,
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  text: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 20,
    maxWidth: 200,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Tests);

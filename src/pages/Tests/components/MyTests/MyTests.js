import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, VirtualizedList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  getCompletedTests,
  getCompletedTestsFilter,
  getCompletedTestsStatus,
  getCompletedTestsTotal,
} from 'pages/Tests/selectors/tests.selectors';
import { fetchCompletedTestsStart } from 'pages/Tests/actions/tests.actions';
import Loader from 'components/Loader';
import Divider from 'components/Divider';
import { isLoading } from 'utils/isLoading';
import { ACTION_STATUS } from 'constants';
import Config from 'config/colors';
import TestItem from './TestItem';

const MyTests = ({ fetchTests, tests, filter, status, total }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  useEffect(() => {
    fetchTests({ page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status !== isLoading(status) && isRefreshing) {
      setIsRefreshing(false);
    }
  }, [isRefreshing, status]);

  const renderItem = ({ item }) => {
    return (
      <TestItem
        title={item.testResultSummary.name}
        categoryName={item.testResultSummary.category.name}
        difficulty={item.testResultSummary.difficulty}
        mark={item.mark}
        maxMark={item.maxMark}
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

  if (!total && !loading && status === ACTION_STATUS.SUCCESS) {
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
  status: getCompletedTestsStatus(state),
  total: getCompletedTestsTotal(state),
  tests: getCompletedTests(state),
  filter: getCompletedTestsFilter(state),
});

const mapDispatchToProps = {
  fetchTests: fetchCompletedTestsStart,
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

export default connect(mapStateToProps, mapDispatchToProps)(MyTests);

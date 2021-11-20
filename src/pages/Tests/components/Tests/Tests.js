import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, VirtualizedList } from 'react-native';

import Divider from 'components/Divider';
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

const Tests = ({ tests, fetchTests, filter, status, total }) => {
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

  const onPress = () => {};
  const renderItem = ({ item }) => {
    return (
      <TestItem
        title={item.name}
        categoryName={item.categoryName}
        onPress={onPress}
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

  return (
    <View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Tests);

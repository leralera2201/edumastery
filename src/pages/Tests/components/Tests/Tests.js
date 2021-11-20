import React from 'react';
import { View, VirtualizedList } from 'react-native';

import Divider from 'components/Divider';

import { tests } from '../../dummyData';
import TestItem from './TestItem';

const total = 2;

const Tests = () => {
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

  const onEndReached = () => {};
  const onRefresh = () => {};

  return (
    <View>
      <VirtualizedList
        data={tests}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        getItem={getItem}
        ItemSeparatorComponent={Divider}
        onEndReached={onEndReached}
        onRefresh={onRefresh}
        refreshing={false}
        getItemCount={() => 2}
      />
    </View>
  );
};

export default Tests;

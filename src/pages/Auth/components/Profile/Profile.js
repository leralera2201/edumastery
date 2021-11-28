import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import ImagePicker from 'components/ImagePicker';
import Divider from 'components/Divider';
import Loader from 'components/Loader';
import Config from 'config/colors';
import { getAuth } from 'pages/Auth/selectors/auth.selectors';
import { fetchMarkStart } from 'pages/Tests/actions/tests.actions';
import { getMark, getMarkStatus } from 'pages/Tests/selectors/tests.selectors';
import { isLoading } from 'utils/isLoading';

const getRank = (number = 0) => Math.floor(number / 20) + 1;

const Profile = ({ data, navigation, markData, markStatus, fetchMark }) => {
  useEffect(() => {
    fetchMark();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = () => {
    navigation.navigate('EditProfile');
  };

  const handlePasswordChange = () => {
    navigation.navigate('EditPassword');
  };

  return (
    <View style={styles.container}>
      {isLoading(markStatus) && <Loader />}
      <ImagePicker onEdit={handleEdit} imageSource={data?.photo} />
      <Divider />
      <View style={styles.rankContainer}>
        <View style={styles.rank}>
          <Text style={styles.rankText}>{getRank(markData?.exp)} Rank</Text>
        </View>
      </View>
      <Divider />
      <View style={styles.wrapper}>
        <Text style={styles.wrapperText}>Your personal data:</Text>
        <View style={styles.fieldContainer}>
          <MaterialCommunityIcons
            size={25}
            name="email"
            color={Config.secondary}
          />
          <Text style={styles.fieldText}>{data?.email}</Text>
        </View>
        <View style={styles.fieldContainer}>
          <MaterialCommunityIcons
            size={25}
            name="account-circle"
            color={Config.secondary}
          />
          <Text style={styles.fieldText}>
            {data?.surname} {data?.name}
          </Text>
        </View>
        <View style={[styles.fieldContainer, styles.fieldContainerBottomSpace]}>
          <MaterialCommunityIcons
            size={25}
            name="account-edit-outline"
            color={Config.secondary}
          />
          <Text style={styles.fieldText}>{data?.nickname}</Text>
        </View>
        <Divider />
        <View style={[styles.fieldContainer, styles.fieldContainerPassword]}>
          <MaterialCommunityIcons
            size={25}
            name="cog"
            color={Config.secondary}
          />
          <TouchableOpacity onPress={handlePasswordChange}>
            <Text style={styles.fieldText}>Change password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  rank: {
    padding: 10,
    marginVertical: 10,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: Config.primary,
    borderRadius: 50,
    width: 100,
  },
  rankContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  rankText: {
    fontSize: 18,
    color: Config.white,
  },
  wrapperText: {
    fontSize: 20,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  wrapper: {
    marginVertical: 20,
  },
  fieldContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  fieldText: {
    fontSize: 20,
    marginLeft: 10,
  },
  fieldContainerBottomSpace: {
    marginBottom: 20,
  },
  fieldContainerPassword: {
    marginTop: 20,
  },
});

const mapStateToProps = (state) => ({
  data: getAuth(state),
  markStatus: getMarkStatus(state),
  markData: getMark(state),
});

const mapDispatchToProps = {
  fetchMark: fetchMarkStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

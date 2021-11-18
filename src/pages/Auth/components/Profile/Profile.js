import React from 'react';
import { connect } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import ImagePicker from 'components/ImagePicker';
import Config from 'config/colors';
import { getAuth } from 'pages/Auth/selectors/auth.selectors';

const Profile = ({ data, navigation }) => {
  const handleEdit = () => {
    navigation.navigate('EditProfile');
  };

  const handlePasswordChange = () => {
    navigation.navigate('EditPassword');
  };

  return (
    <View style={styles.container}>
      <ImagePicker onEdit={handleEdit} imageSource={data?.photo} />
      <View style={styles.divider} />
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
        <View style={styles.divider} />
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
    backgroundColor: Config.white,
    height: '100%',
  },
  divider: {
    borderBottomColor: Config.darkGray,
    borderBottomWidth: 1,
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
});

export default connect(mapStateToProps)(Profile);

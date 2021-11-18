import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Config from 'config/colors';

const NavBarButton = ({ icon, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.iconWrapper}>
      <MaterialCommunityIcons name="logout" size={25} color={Config.white} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    marginRight: 10,
  },
});

export default NavBarButton;

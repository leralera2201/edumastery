import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const NavBarButton = ({ icon, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.iconWrapper}>
      <Image source={icon} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    marginRight: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default NavBarButton;

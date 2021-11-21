import React from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Config from 'config/colors';

const NavBarButton = ({ icon, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialCommunityIcons name="logout" size={25} color={Config.white} />
    </TouchableOpacity>
  );
};

export default NavBarButton;

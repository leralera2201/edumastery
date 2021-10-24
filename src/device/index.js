import { Dimensions, Platform } from 'react-native';

const size = Dimensions.get('window');
const isAndroid = Platform.OS === 'android';
const isIOS = Platform.OS === 'ios';

const Device = {
  width: size.width,
  height: size.height,
  isIOS,
  isAndroid,
};

export default Device;

import Toast from 'react-native-toast-message';

export const notify = (message, type) => {
  message &&
    Toast.show({
      type,
      text1: message,
    });
};

export const clearNotification = () => {
  Toast.hide();
};

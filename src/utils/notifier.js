import { showMessage, hideMessage } from 'react-native-flash-message';

export const notify = (message, type) => {
  message &&
    showMessage({
      message,
      type,
      icon: type,
      duration: 3000,
    });
};

export const clearNotification = () => {
  hideMessage();
};

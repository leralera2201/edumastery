import PushNotificationIOS from '@react-native-community/push-notification-ios';

export const showNotification = (details) => {
  PushNotificationIOS.addNotificationRequest(details);
};

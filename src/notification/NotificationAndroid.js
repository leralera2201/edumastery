import PushNotification from 'react-native-push-notification';

export const showNotification = (details) => {
  PushNotification.localNotificationSchedule(details);
};

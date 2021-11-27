import Device from 'device';

import * as NotificationAndroid from './NotificationAndroid';
import * as NotificationIOS from './NotificationIos';

const moduleToExport = Device.isIOS ? NotificationIOS : NotificationAndroid;

export default moduleToExport;

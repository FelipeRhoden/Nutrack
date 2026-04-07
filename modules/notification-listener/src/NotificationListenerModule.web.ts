import { registerWebModule, NativeModule } from 'expo';

import { NotificationListenerModuleEvents } from './NotificationListener.types';

class NotificationListenerModule extends NativeModule<NotificationListenerModuleEvents> {
  hello() {
    return 'Hello from NotificationListener! 👋';
  }
}

export default registerWebModule(NotificationListenerModule, 'NotificationListenerModule');

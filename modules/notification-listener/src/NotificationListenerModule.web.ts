import { registerWebModule, NativeModule } from 'expo';

import { NotificationListenerModuleEvents } from './NotificationListener.types';

class NotificationListenerModule extends NativeModule<NotificationListenerModuleEvents> {
  hasPermission(): boolean {
    return false;
  }
  requestPermission(): void {}
}

export default registerWebModule(NotificationListenerModule, 'NotificationListenerModule');

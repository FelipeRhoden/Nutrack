import { NativeModule, requireNativeModule } from 'expo';

import { NotificationListenerModuleEvents } from './NotificationListener.types';

declare class NotificationListenerModule extends NativeModule<NotificationListenerModuleEvents> {
  hasPermission(): boolean;
  requestPermission(): void;
}

export default requireNativeModule<NotificationListenerModule>('NotificationListener');

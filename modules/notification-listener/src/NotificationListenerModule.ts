import { NativeModule, requireNativeModule } from 'expo';

import { NotificationListenerModuleEvents } from './NotificationListener.types';

declare class NotificationListenerModule extends NativeModule<NotificationListenerModuleEvents> {
  hello(): string;
}

export default requireNativeModule<NotificationListenerModule>('NotificationListener');

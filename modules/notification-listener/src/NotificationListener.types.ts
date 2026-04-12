export type NotificationPayload = {
  packageName: string;
  title: string | null;
  text: string | null;
  timestamp: number;
};

export type NotificationListenerModuleEvents = {
  onNotificationReceived: (payload: NotificationPayload) => void;
};

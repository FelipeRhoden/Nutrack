package expo.modules.notificationlistener

import android.app.Notification
import android.service.notification.NotificationListenerService
import android.service.notification.StatusBarNotification

class NutrackNotificationListenerService : NotificationListenerService() {

  override fun onNotificationPosted(sbn: StatusBarNotification) {
    val extras = sbn.notification.extras
    val title = extras.getString(Notification.EXTRA_TITLE)
    val text = extras.getCharSequence(Notification.EXTRA_TEXT)?.toString()

    NotificationListenerModule.instance?.onNotificationReceived(
      packageName = sbn.packageName,
      title = title,
      text = text,
      timestamp = sbn.postTime,
    )
  }
}

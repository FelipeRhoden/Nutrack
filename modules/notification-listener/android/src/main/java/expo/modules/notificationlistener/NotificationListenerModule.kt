package expo.modules.notificationlistener

import android.content.Intent
import android.provider.Settings
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class NotificationListenerModule : Module() {

  companion object {
    var instance: NotificationListenerModule? = null
  }

  fun onNotificationReceived(packageName: String, title: String?, text: String?, timestamp: Long) {
    sendEvent("onNotificationReceived", mapOf(
      "packageName" to packageName,
      "title" to title,
      "text" to text,
      "timestamp" to timestamp,
    ))
  }

  override fun definition() = ModuleDefinition {
    Name("NotificationListener")

    Events("onNotificationReceived")

    OnCreate {
      instance = this@NotificationListenerModule
    }

    OnDestroy {
      instance = null
    }

    Function("hasPermission") {
      val enabledListeners = Settings.Secure.getString(
        appContext.reactContext?.contentResolver,
        "enabled_notification_listeners"
      ) ?: ""
      val pkg = appContext.reactContext?.packageName ?: ""
      enabledListeners.contains(pkg)
    }

    Function("requestPermission") {
      val intent = Intent(Settings.ACTION_NOTIFICATION_LISTENER_SETTINGS).apply {
        flags = Intent.FLAG_ACTIVITY_NEW_TASK
      }
      appContext.reactContext?.startActivity(intent)
    }
  }
}

import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import NotificationListenerModule, { NotificationPayload } from './modules/notification-listener';
import { sendMockNotification } from './src/utils/sendNotification';

export default function App() {
  const [hasPermission, setHasPermission] = useState(false);
  const [notifications, setNotifications] = useState<NotificationPayload[]>([]);

  useEffect(() => {
    setHasPermission(NotificationListenerModule.hasPermission());

    const subscription = NotificationListenerModule.addListener(
      'onNotificationReceived',
      (payload) => {
        setNotifications((prev) => [payload, ...prev]);
      }
    );

    return () => subscription.remove();
  }, []);

  const checkPermission = () => {
    setHasPermission(NotificationListenerModule.hasPermission());
  };

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Permissão necessária</Text>
        <Text style={styles.subtitle}>
          O app precisa de acesso às notificações para funcionar.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => NotificationListenerModule.requestPermission()}
        >
          <Text style={styles.buttonText}>Conceder permissão</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSecondary} onPress={checkPermission}>
          <Text style={styles.buttonSecondaryText}>Já concedi, verificar novamente</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificações capturadas</Text>
      <TouchableOpacity style={styles.button} onPress={sendMockNotification}>
        <Text style={styles.buttonText}>Enviar Notificação</Text>
      </TouchableOpacity>
      <FlatList
        data={notifications}
        keyExtractor={(_, index) => String(index)}
        style={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhuma notificação capturada ainda.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardApp}>{item.packageName}</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardText}>{item.text}</Text>
          </View>
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#820AD1',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonSecondary: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonSecondaryText: {
    color: '#820AD1',
    fontSize: 14,
  },
  list: {
    width: '100%',
  },
  empty: {
    textAlign: 'center',
    color: '#999',
    marginTop: 16,
  },
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    gap: 4,
  },
  cardApp: {
    fontSize: 11,
    color: '#999',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  cardText: {
    fontSize: 13,
    color: '#444',
  },
});

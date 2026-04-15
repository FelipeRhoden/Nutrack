import { render, screen, fireEvent } from '@testing-library/react-native';
import App from '../App';

jest.mock('expo-notifications', () => ({
  setNotificationHandler: jest.fn(),
  requestPermissionsAsync: jest.fn().mockResolvedValue({ status: 'granted' }),
  scheduleNotificationAsync: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('../modules/notification-listener', () => ({
  __esModule: true,
  default: {
    hasPermission: jest.fn(),
    requestPermission: jest.fn(),
    addListener: jest.fn().mockReturnValue({ remove: jest.fn() }),
  },
}));

const NotificationListenerModule =
  jest.requireMock('../modules/notification-listener').default;

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    NotificationListenerModule.addListener.mockReturnValue({ remove: jest.fn() });
  });

  it('shows permission screen when permission is not granted', () => {
    NotificationListenerModule.hasPermission.mockReturnValue(false);
    render(<App />);
    expect(screen.getByText('Permissão necessária')).toBeTruthy();
    expect(screen.getByText('Conceder permissão')).toBeTruthy();
  });

  it('calls requestPermission when button is pressed', () => {
    NotificationListenerModule.hasPermission.mockReturnValue(false);
    render(<App />);
    fireEvent.press(screen.getByText('Conceder permissão'));
    expect(NotificationListenerModule.requestPermission).toHaveBeenCalled();
  });

  it('shows notifications screen when permission is granted', () => {
    NotificationListenerModule.hasPermission.mockReturnValue(true);
    render(<App />);
    expect(screen.getByText('Notificações capturadas')).toBeTruthy();
    expect(screen.getByText('Enviar Notificação')).toBeTruthy();
  });

  it('shows empty state when no notifications received', () => {
    NotificationListenerModule.hasPermission.mockReturnValue(true);
    render(<App />);
    expect(screen.getByText('Nenhuma notificação capturada ainda.')).toBeTruthy();
  });

  it('navigates to notifications screen after revalidating permission', () => {
    NotificationListenerModule.hasPermission
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);

    render(<App />);
    expect(screen.getByText('Permissão necessária')).toBeTruthy();

    fireEvent.press(screen.getByText('Já concedi, verificar novamente'));

    expect(screen.getByText('Notificações capturadas')).toBeTruthy();
  });
});

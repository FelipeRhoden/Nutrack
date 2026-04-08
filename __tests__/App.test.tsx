import { render, screen } from '@testing-library/react-native';
import App from '../App';

jest.mock('../modules/notification-listener', () => ({
  __esModule: true,
  default: {
    hello: () => 'Hello from NotificationListener! 👋',
  },
}));

it('displays the hello message from the native module', () => {
  render(<App />);
  expect(screen.getByText('Hello from NotificationListener! 👋')).toBeTruthy();
});

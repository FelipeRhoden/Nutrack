const MERCHANTS = [
  'MERCADO LIVRE',
  'IFOOD',
  'AMAZON',
  'UBER',
  'NETFLIX',
  'SPOTIFY',
  'RAPPI',
  'AMERICANAS',
  'STEAM',
  'MAGAZINE LUIZA',
];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomAmount(): string {
  const amount = (Math.random() * 990 + 10).toFixed(2).replace('.', ',');
  return `R$ ${amount}`;
}

export function generateMockNotification(): string {
  const merchant = randomItem(MERCHANTS);
  const amount = randomAmount();
  return `Compra de ${amount} no Cartão de Crédito em ${merchant}`;
}

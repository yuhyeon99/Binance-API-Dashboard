import axios from 'axios';

interface Ticker {
  symbol: string;
  price: number;
  changePercent: number;
  volume: number;
}

export const fetchCryptoData = async () => {
  const response = await axios.get('https://api.binance.com/api/v3/ticker/24hr');

  if (response.status !== 200) {
    const error = new Error(`Error fetching crypto data: ${response.status}`);
    throw error;
  }

  const data = response.data;

  // USDT로 거래되는 코인만 필터링
  const usdtCoins = data.filter((ticker: Ticker) => {
    // symbol에 'USDT'로 끝나는 항목만 필터링
    return ticker.symbol.endsWith('USDT');
  });

  return usdtCoins;
};
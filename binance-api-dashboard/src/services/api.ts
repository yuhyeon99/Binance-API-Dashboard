import axios from 'axios';

interface Ticker {
  symbol: string;
  price: number;
  changePercent: number;
  volume: number;
}

interface TickerResponse {
  data: Ticker[];
}

export const fetchCryptoData = async () => {
  const response = await axios.get('https://api.binance.com/api/v3/ticker/24hr');

  if (response.status !== 200) {
    const error = new Error(`Error fetching crypto data: ${response.status}`);
    throw error;
  }

  const data = response.data;
  
  return data;
};
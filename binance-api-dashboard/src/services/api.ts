import axios from 'axios';

const binanceAPI = axios.create({
  baseURL: 'https://api.binance.com/api/v3',
});

export const fetchCryptoData = () => {
  return binanceAPI.get('/ticker/price');
};
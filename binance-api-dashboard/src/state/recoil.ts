import { atom } from 'recoil';

// 암호화폐 데이터 상태
export const cryptoDataState = atom({
  key: 'cryptoDataState',
  default: [] as any[],
});

// 정렬 기준 상태
export const sortKeyState = atom({
  key: 'sortKeyState',
  default: '' as string,
});
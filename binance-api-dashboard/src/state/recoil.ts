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

// 정렬 방향을 관리하는 atom
export const sortDirectionState = atom<{ [key: string]: 'asc' | 'desc' }>({
  key: 'sortDirectionState',
  default: {
    lastPrice: 'asc',
    priceChangePercent: 'asc',
    volume: 'asc',
  }, // 초기에는 빈 객체로 시작
});
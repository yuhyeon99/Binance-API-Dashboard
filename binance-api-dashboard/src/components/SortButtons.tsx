
import React from 'react';
import {Button, ButtonGroup} from '@mui/material';
import { useRecoilState, useSetRecoilState  } from 'recoil';
import { sortKeyState, sortDirectionState, cryptoDataState  } from '../state/recoil';

const SortButtons = () => {
  const [sortKey, setSortKey] = useRecoilState(sortKeyState);
  const [sortDirection, setSortDirection] = useRecoilState(sortDirectionState); // 새로 추가
  const setCryptoData = useSetRecoilState(cryptoDataState);
  
  const handleSort = (key: string) => {
    // 현재 정렬 상태 확인
    const currentSortDirection = sortDirection[key];

    // 정렬 키 업데이트
    setSortKey(key);

    // 정렬 방향 업데이트
    setSortDirection((prevSortDirection) => ({
      ...prevSortDirection,
      [key]: currentSortDirection === 'asc' ? 'desc' : 'asc',
    }));

    // cryptoDataState 업데이트
    setCryptoData((prevCryptoData) => {
      const sortedData = [...prevCryptoData].sort((a, b) => {
        const aValue = parseFloat(a[key]);
        const bValue = parseFloat(b[key]);

        if (currentSortDirection === 'desc') {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
      });

      return sortedData;
    });
  };

  return (
    <ButtonGroup>
      <Button 
        variant={sortKey === 'lastPrice' ? 'contained' : 'outlined'}
        onClick={() => handleSort('lastPrice')}
      >
        가격 {sortKey === 'lastPrice' ? (sortDirection['lastPrice'] == 'asc' ? '▲' : '▼') : ''}
      </Button>
      <Button 
        variant={sortKey === 'priceChangePercent' ? 'contained' : 'outlined'}
        onClick={() => handleSort('priceChangePercent')}
      >
        상승률 {sortKey === 'priceChangePercent' ? (sortDirection['priceChangePercent'] == 'asc' ? '▲' : '▼') : ''}
      </Button>
      <Button 
        variant={sortKey === 'volume' ? 'contained' : 'outlined'}
        onClick={() => handleSort('volume')}
      >
        거래량 {sortKey === 'volume' ? (sortDirection['volume'] == 'asc' ? '▲' : '▼') : ''}
      </Button>
    </ButtonGroup>
  );
};

export default SortButtons;
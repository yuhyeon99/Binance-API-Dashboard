import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { useRecoilState } from 'recoil';
import { sortKeyState } from '../state/recoil';

const SortButtons = () => {
  const [sortKey, setSortKey] = useRecoilState(sortKeyState);

  const handleSort = (key: string) => {
    setSortKey(key);
  };

  return (
    <ButtonGroup>
      <Button
        variant={sortKey === 'price' ? 'contained' : 'outlined'}
        onClick={() => handleSort('price')}
      >
        가격 정렬
      </Button>
      <Button
        variant={sortKey === 'changePercent' ? 'contained' : 'outlined'}
        onClick={() => handleSort('changePercent')}
      >
        상승률 정렬
      </Button>
      <Button
        variant={sortKey === 'volume' ? 'contained' : 'outlined'}
        onClick={() => handleSort('volume')}
      >
        거래량 정렬
      </Button>
    </ButtonGroup>
  );
};

export default SortButtons;
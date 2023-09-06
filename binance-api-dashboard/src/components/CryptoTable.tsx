import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
  Select,
  MenuItem,
  Pagination,
  Grid,
  SelectChangeEvent 
} from '@mui/material';
import { useRecoilState } from 'recoil';
import { cryptoDataState, sortKeyState, sortDirectionState } from '../state/recoil';
import { fetchCryptoData } from '../services/api';
import SortButtons from './SortButtons';

type ItemType = {
    symbol: string;
    lastPrice: number;
    priceChangePercent: number;
    volume: number;
};

const itemsPerPageOptions = [10, 30, 50, 100]; // 옵션 값들
const CryptoTable = () => {
  const [cryptoData, setCryptoData] = useRecoilState(cryptoDataState);
  const [sortKey, setSortKey] = useRecoilState(sortKeyState);
  const [sortDirection, setSortDirection] = useRecoilState(sortDirectionState);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
    const newValue = Number(event.target.value);
    setItemsPerPage(newValue);
  };
  const [isLoading, setIsLoading] = useState(true); // 데이터 로딩 상태

  useEffect(() => {
    // Binance API에서 데이터 가져오기
    fetchCryptoData()
      .then((response) => {
        // 데이터를 cryptoData 상태에 저장
        console.log(response);
        setCryptoData(response);
        setIsLoading(false); // 데이터 로딩 완료 후 상태 변경
      })
      .catch((error) => {
        console.error('Error fetching crypto data:', error);
        setIsLoading(false); // 데이터 로딩 실패 시 상태 변경
      });
  }, []); // 컴포넌트 마운트 시 한 번만 호출

  // 데이터 정렬 함수
  const sortByKey = (key: string) => {
    // 현재 정렬 상태 확인
    const currentSortDirection = sortDirection[key];
  
    // 정렬 키 업데이트
    setSortKey(key);

    // 데이터 정렬
    const sortedData = [...cryptoData].sort((a, b) => {
      const aValue = parseFloat(a[key]); 
      const bValue = parseFloat(b[key]);

      if (currentSortDirection === 'desc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    // 정렬 방향 업데이트
    setSortDirection((prevSortDirection) => ({
      ...prevSortDirection,
      [key]: currentSortDirection === 'asc' ? 'desc' : 'asc',
    }));

    // 정렬된 데이터로 업데이트
    setCryptoData(sortedData);
  };

  // 현재 페이지의 데이터 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(cryptoData.length / itemsPerPage);

  // 페이지 변경 함수
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  // 데이터 로딩 중인 경우 로딩 화면 표시
  if (isLoading) {
    return <CircularProgress />;
  }

  const currentData = cryptoData.slice(startIndex, endIndex);

  return (
    <div style={{marginTop:'30px'}}>
      <Grid container alignItems="center">
        <Grid item xs={6}>
          <SortButtons />
        </Grid>
        <Grid item xs={6}>
          {/* 이곳에 Select 컴포넌트 추가 */}
          <Select
            label="표시 항목 수"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            style={{float:'right', height:'36px'}}
          >
            {itemsPerPageOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}개
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell >심볼</TableCell>
              <TableCell align="center">
                <Button onClick={() => sortByKey('lastPrice')}>
                  가격 {sortKey === 'lastPrice' ? (sortDirection['lastPrice'] == 'asc' ? '▲' : '▼') : ''}
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button onClick={() => sortByKey('priceChangePercent')}>
                  상승률 {sortKey === 'priceChangePercent' ? (sortDirection['priceChangePercent'] == 'asc' ? '▲' : '▼') : ''}
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button onClick={() => sortByKey('volume')}>
                  거래량 {sortKey === 'volume' ? (sortDirection['volume'] == 'asc' ? '▲' : '▼') : ''}
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentData.map((item: ItemType, index: number) => (
              <TableRow key={index}>
                <TableCell>{item.symbol}</TableCell>
                <TableCell align="center">{item.lastPrice}</TableCell>
                <TableCell align="center">
                  {
                    item.priceChangePercent > 0 ? (
                      <span style={{color: 'red'}}>{Math.round(item.priceChangePercent * 10) / 10}%</span>
                    ) : (
                      <span style={{color: 'blue'}}>{Math.round(item.priceChangePercent * 10) / 10}%</span>
                    )
                  }
                </TableCell>
                <TableCell align="center">{item.volume}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 페이징 컴포넌트 */}
      <div className="" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px'}}>
        <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
        />
      </div>
    </div>
  );
};

export default CryptoTable;
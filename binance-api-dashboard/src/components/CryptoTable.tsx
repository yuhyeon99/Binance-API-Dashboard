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
  Pagination,
} from '@mui/material';
import { useRecoilState } from 'recoil';
import { cryptoDataState, sortKeyState } from '../state/recoil';
import { fetchCryptoData } from '../services/api';

type ItemType = {
    symbol: string;
    price: number;
    changePercent: number;
    volume: number;
    // 기타 필요한 속성들...
};

const CryptoTable = () => {
  const [cryptoData, setCryptoData] = useRecoilState(cryptoDataState);
  const [sortKey, setSortKey] = useRecoilState(sortKeyState);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 페이지당 항목 수
  const [isLoading, setIsLoading] = useState(true); // 데이터 로딩 상태

  useEffect(() => {
    // Binance API에서 데이터 가져오기
    fetchCryptoData()
      .then((response) => {
        const data = response.data;
        // 데이터를 cryptoData 상태에 저장
        setCryptoData(data);
        setIsLoading(false); // 데이터 로딩 완료 후 상태 변경
      })
      .catch((error) => {
        console.error('Error fetching crypto data:', error);
        setIsLoading(false); // 데이터 로딩 실패 시 상태 변경
      });
  }, []); // 컴포넌트 마운트 시 한 번만 호출

  // 데이터 정렬 함수
  const sortByKey = (key: string) => {
    // key를 기준으로 데이터를 정렬
    const sortedData = [...cryptoData].sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });

    setSortKey(key);
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
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>심볼</TableCell>
              <TableCell>
                <Button onClick={() => sortByKey('price')}>
                  가격 {sortKey === 'price' ? '▲' : ''}
                </Button>
              </TableCell>
              <TableCell>
                <Button onClick={() => sortByKey('changePercent')}>
                  상승률 {sortKey === 'changePercent' ? '▲' : ''}
                </Button>
              </TableCell>
              <TableCell>
                <Button onClick={() => sortByKey('volume')}>
                  거래량 {sortKey === 'volume' ? '▲' : ''}
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentData.map((item: ItemType, index: number) => (
              <TableRow key={index}>
                <TableCell>{item.symbol}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.changePercent}</TableCell>
                <TableCell>{item.volume}</TableCell>
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
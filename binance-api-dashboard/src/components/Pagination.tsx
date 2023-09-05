import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { cryptoDataState } from '../state/recoil';

const Pagination = () => {
  const cryptoData = useRecoilValue(cryptoDataState);
  const setCryptoData = useSetRecoilState(cryptoDataState);

  const itemsPerPage = 10; // 페이지당 항목 수
  const totalPages = Math.ceil(cryptoData.length / itemsPerPage);

  const handlePageChange = (_: any, page: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = cryptoData.slice(startIndex, endIndex);
    setCryptoData(currentPageData);
  };

  return (
    <MuiPagination
      count={totalPages}
      color="primary"
      onChange={handlePageChange}
    />
  );
};

export default Pagination;
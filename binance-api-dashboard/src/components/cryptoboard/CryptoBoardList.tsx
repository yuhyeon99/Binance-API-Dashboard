import React, { useState } from 'react';
import {
  Typography,
  Grid,
  List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	IconButton,
	Pagination,
} from '@mui/material';

interface CryptoBoardListProps {
  posts: string[]; // 게시물 목록
  itemsPerPage: number; // 페이지당 아이템 수
  searchText: string; // 검색어
  isEditing: boolean; // 편집 모드 여부
  selectedPostIndex: number | null; // 선택된 게시물 인덱스
	handleCancelEdit: () => void;
  handleEditClick: (index: number) => void; // 게시물 편집 클릭 핸들러
  handleDeletePost: (index: number) => void; // 게시물 삭제 핸들러
}

const CryptoBoardList = (props: CryptoBoardListProps) => {

	const {
		posts,
		itemsPerPage,
		searchText,
		isEditing,
		selectedPostIndex,
		handleCancelEdit,
		handleEditClick,
		handleDeletePost,
	} = props;

	const [currentPage, setCurrentPage] = useState(1);

  // 현재 페이지에서 표시할 게시물 목록 계산
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;

  // 검색 결과에 따라 게시물 필터링
  const filteredPosts = posts.filter((post) =>
    post.toLowerCase().includes(searchText.toLowerCase())
  );

  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

	return(
		<>
			{filteredPosts.length === 0 ? (
        <Typography
          variant="body1"
          color="textSecondary"
          style={{ marginTop: '20px' }}
        >
          검색된 데이터가 없습니다.
        </Typography>
      ) : (
        <>
          <List>
            {currentPosts.map((post, index) => (
              <ListItem key={index}>
                <Grid container alignItems="center">
                  <Grid item xs={10}>
                    <ListItemText primary={post} />
                  </Grid>
                  <Grid item xs={2}>
                    <ListItemSecondaryAction>
                      {isEditing && selectedPostIndex === index ? (
                        <IconButton
                          edge="end"
                          aria-label="cancel"
                          onClick={handleCancelEdit}
                        >
                          취소
                        </IconButton>
                      ) : (
                        <div>
                          <IconButton
                            edge="end"
                            aria-label="edit"
                            onClick={() => handleEditClick(index)}
                          >
                            수정
                          </IconButton>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleDeletePost(index)}
                          >
                            삭제
                          </IconButton>
                        </div>
                      )}
                    </ListItemSecondaryAction>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
          {/* Pagination 컴포넌트 사용 */}
          {filteredPosts.length > itemsPerPage && (
            <Pagination
              count={Math.ceil(filteredPosts.length / itemsPerPage)}
              page={currentPage}
              onChange={(_, page) => paginate(page)}
              color="primary"
              style={{ marginTop: '20px', textAlign: 'center' }}
            />
          )}
        </>
      )}
		</>
	)
}

export default CryptoBoardList;
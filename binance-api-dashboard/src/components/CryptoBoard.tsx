import React, { useEffect, useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
	Grid,
  Pagination,
} from '@mui/material';

const buttonStyle = {width: '100%', height: '100%', fontSize: '0.8rem'};
const itemsPerPageOptions = [5, 10, 20]; // 페이지당 표시할 아이템 수 옵션

const CryptoBoard = () => {
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState<string[]>([]);
  const [selectedPostIndex, setSelectedPostIndex] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);

  // 게시물 로드 (localStorage에서)
  useEffect(() => {
    const savedPosts = localStorage.getItem('cryptoPosts');
    if (savedPosts && JSON.parse(savedPosts).length > 0) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  // 게시물 저장 (localStorage에)
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('cryptoPosts', JSON.stringify(posts));
    }
  }, [posts]);

  const handleAddPost = () => {
    if (newPost.trim() !== '') {
      setPosts([newPost, ...posts]);
      setNewPost('');
    }
  };

	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (isEditing) {
        handleEditPost();
      } else {
        handleAddPost();
      }
    }
  };

  const handleEditPost = () => {
    if (selectedPostIndex !== null && newPost.trim() !== '') {
      const updatedPosts = [...posts];
      updatedPosts[selectedPostIndex] = newPost;
      setPosts(updatedPosts);
      setNewPost('');
      setSelectedPostIndex(null);
      setIsEditing(false);
    }
  };

  const handleDeletePost = (index: number) => {
    const updatedPosts = [...posts];
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);
  };

  const handleEditClick = (index: number) => {
    setSelectedPostIndex(index);
    setIsEditing(true);
    setNewPost(posts[index]);
  };

  const handleCancelEdit = () => {
    setSelectedPostIndex(null);
    setIsEditing(false);
    setNewPost('');
  };

  // 현재 페이지에서 표시할 게시물 목록 계산
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{marginBottom:'50px'}}>
      <Typography variant="h5" gutterBottom>
        익명 게시판
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={11}> {/* 80% 너비 */}
          <TextField
            label="새 글 작성"
            variant="outlined"
            fullWidth
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </Grid>
        <Grid item xs={1}> {/* 20% 너비 */}
          {isEditing ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleEditPost}
								style={buttonStyle}
              >
                수정 완료
              </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddPost}
							style={buttonStyle}
            >
              추가
            </Button>
          )}
        </Grid>
      </Grid>
      {posts.length === 0 ? (
        <Typography variant="body1" color="textSecondary" style={{ marginTop: '20px' }}>
          새로운 글을 추가해보세요!
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
          {posts.length > itemsPerPage && (
            <Pagination
              count={Math.ceil(posts.length / itemsPerPage)}
              page={currentPage}
              onChange={(_, page) => paginate(page)}
              color="primary"
              style={{ marginTop: '20px', textAlign: 'center' }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CryptoBoard;
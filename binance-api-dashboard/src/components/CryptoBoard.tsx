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
  InputAdornment,
  Pagination,
} from '@mui/material';
import CryptoBoardForm from './cryptoboard/CryptoBoardForm';
import CryptoBoardList from './cryptoboard/CryptoBoardList';

const buttonStyle = {width: '100%', height: '100%', fontSize: '0.8rem'};
const itemsPerPageOptions = [5, 10, 20]; // 페이지당 표시할 아이템 수 옵션

const CryptoBoard = () => {
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState<string[]>([]);
  const [selectedPostIndex, setSelectedPostIndex] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
  const [searchText, setSearchText] = useState(''); // 검색어 상태

  // 게시물 로드
  useEffect(() => {
    const savedPosts = localStorage.getItem('cryptoPosts');
    if (savedPosts && JSON.parse(savedPosts).length > 0) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  // 게시물 저장
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('cryptoPosts', JSON.stringify(posts));
    }
  }, [posts]);

  const handleAddPost = () => {
    if (newPost.trim() !== '') {
      setPosts([newPost, ...posts]);
      setNewPost('');
    }else{
      alert('내용을 입력해주세요.');
      return false;
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
    }else{
      alert('내용을 입력해주세요.');
      return false;
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

  const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setCurrentPage(1); // 검색 시 페이지 초기화
  };

  return (
    <div style={{marginBottom:'50px'}}>
      <Typography variant="h5" gutterBottom>
        메모장
      </Typography>
      <CryptoBoardForm
        handleAddPost={handleAddPost}
        isEditing={isEditing}
        newPost = {newPost}
        handleKeyPress = {handleKeyPress}
        setNewPost = {setNewPost}
        handleEditPost = {handleEditPost}
        buttonStyle = {buttonStyle}
      />
      <TextField
        label="게시글 검색"
        variant="outlined"
        fullWidth
        value={searchText}
        onChange={handleSearchTextChange}
        style={{ margin: '20px 0' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <span role="img" aria-label="Search">
                🔍
              </span>
            </InputAdornment>
          ),
        }}
      />
      <CryptoBoardList
        posts={posts}
        itemsPerPage={itemsPerPage}
        searchText={searchText}
        isEditing={isEditing}
        selectedPostIndex={selectedPostIndex}
        handleCancelEdit={handleCancelEdit}
        handleEditClick={handleEditClick}
        handleDeletePost={handleDeletePost}
      />
    </div>
  );
};

export default CryptoBoard;
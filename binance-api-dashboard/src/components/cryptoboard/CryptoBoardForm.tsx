import React, { useState } from 'react';
import {
  Typography,
  Grid,
  TextField,
  Button,
} from '@mui/material';

// props interface 정의
interface CryptoBoardFormProps{
  handleAddPost: () => void;
  isEditing: boolean;
  newPost: string;
  handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  setNewPost: React.Dispatch<React.SetStateAction<string>>;
  handleEditPost: () => void;
  buttonStyle: React.CSSProperties;
}

const CryptoBoardForm = (props: CryptoBoardFormProps) => {

    // props 구조 분해 할당
    const {
      handleAddPost,
      isEditing,
      newPost,
      handleKeyPress,
      setNewPost,
      handleEditPost,
      buttonStyle,
    } = props;

    return(
        <>
          <Grid container spacing={1}>
            <Grid item xs={11}>
              <TextField
                label="새 글 작성"
                variant="outlined"
                fullWidth
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </Grid>
            <Grid item xs={1}>
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
        </>
    )
}

export default CryptoBoardForm;
import React from 'react';
import { RecoilRoot } from 'recoil'; // RecoilRoot 추가
import { CssBaseline, Container, AppBar, Toolbar, Typography, Grid } from '@mui/material';
import CryptoTable from './components/CryptoTable';
import CryptoBoard from './components/CryptoBoard';

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">CryptoBoard</Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <CryptoTable />
            </Grid>
            <Grid item xs={12}>
              <CryptoBoard />
            </Grid>
          </Grid>
        </Container>
      </div>
    </RecoilRoot>
  );
}

export default App;
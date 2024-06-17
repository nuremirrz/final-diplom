import React, { useState } from 'react';
import { redirect } from 'react-router-dom'; // Добавляем импорт Redirect
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom'; 
import BackToMainMenuButton from '../components/BackToMainBtn';

function SignInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // Добавляем состояние для редиректа

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      email: username,
      password: password
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    };

    setLoading(true);

    try {      
      const response = await fetch('http://80.72.180.130:8581/api/user/login', requestOptions);      
      if (!response.ok) {
        throw new Error('Неверные учетные данные');
      }

      const data = await response.json(); // Извлекаем данные из Response
      console.log('Успешный вход:', data);

      setUsername('');
      setPassword('');
      setError('');
      setLoading(false);

      // Устанавливаем состояние для редиректа
      setLoggedIn(true);

      // Здесь может быть редирект или другие действия после успешного входа
    } catch (error) {
      console.error('Ошибка входа:', error.message);
      setError('Неверные учетные данные');
      setLoading(false);
    }
  };

  // Редирект после успешного входа
  if (loggedIn) {
    return redirect("/");
  }

  return (
    <>  
      <BackToMainMenuButton/>
      <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Вход
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={username}
              autoFocus
              onChange={(event) => setUsername(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              value={password}
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Вход...' : 'Войти'}
            </Button>
            <Grid container>
              <Grid item>
                <RouterLink to="/sign-up" variant="body2">
                  {"Нет аккаунта? Зарегистрируйтесь"}
                </RouterLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </>
  );
}

export default SignInPage;

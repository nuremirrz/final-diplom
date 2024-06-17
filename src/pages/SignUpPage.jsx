import React, { useState } from 'react';
import axios from 'axios';
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


const defaultTheme = createTheme();

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://80.72.180.130:8581/api/user/register", {
        name,
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.token);
        window.location.href = "/";
      } else {
        setError("Ошибка регистрации");
      }
    } catch (error) {
      setError("Ошибка при отправке запроса");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BackToMainMenuButton />
      <ThemeProvider theme={defaultTheme}>
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
              Регистрация
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Имя"
                    autoFocus
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </Grid>              
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Адрес"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Пароль"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </Grid>              
              </Grid>
              {error && <Typography color="error">{error}</Typography>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? 'Регистрация...' : 'Регистрация'}
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <RouterLink to="/sign-in" variant="body2">
                    {"У вас уже есть аккаунт? Войти"}
                  </RouterLink>                
                </Grid>
              </Grid>
            </Box>
          </Box>        
        </Container>
      </ThemeProvider>
    </>
  );
};

export default SignUpPage;
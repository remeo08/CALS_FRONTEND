import React, { useEffect, useState } from 'react';
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
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.css';
import { useCookies } from 'react-cookie';
import { SignInApi } from '../../API';

// function Copyright(props) {
//     return (
//         <Typography variant="body2" color="text.secondary" align="center" {...props}>
//             {'Copyright © '}
//             <Link color="inherit" href="https://mui.com/">
//                 Your Website
//             </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }

const defaultTheme = createTheme();

function SignIn() {
    const navigate = useNavigate();

    const [cookies, setCookie] = useCookies(['access_token']);
    const [refresh, setRefresh] = useCookies(['refresh_token']);
    const accessToken = cookies.access_token;

    useEffect(() => {
        // 여기서 accessToken을 사용하여 로그인 상태를 확인하고 원하는 작업을 수행합니다.
        // 예를 들어, 유효한 토큰이 없다면 로그아웃 처리를 수행할 수 있습니다.
        if (accessToken) {
            navigate('/main');
        }
    }, [accessToken]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const loginData = {
            email: data.get('email'),
            password: data.get('password'),
        };

        // axios
        //     .post(`http://127.0.0.1:8000/api/v1/users/login/token`, loginData)
        //     .then(function (response) {
        //         console.log(response, '성공');
        //         // JWT 토큰을 쿠키에 저장합니다.
        //         setCookie('access_token', response.access, { path: '/' });

        //         // "main" 컴포넌트로 리디렉션합니다.
        //         navigate('/main', { replace: true });
        //     })
        //     .catch(function (err) {
        //         console.error(err);
        //         setSignInError('로그인에 실패하였습니다. 다시한번 확인해 주세요.');
        //     });

        SignInApi(loginData)
            .then((responseData) => {
                // JWT 토큰을 쿠키에 저장합니다.
                setCookie('access_token', responseData.access, { path: '/' });
                setRefresh('refresh_token', responseData.refresh, { path: '/' });

                //"main" 컴포넌트로 리디렉션합니다.
                navigate('/main', { replace: true });
            })
            .catch((error) => {
                // 오류 발생 시 실행할 코드
                console.error(error);
                alert('로그인에 실패하였습니다. 다시 한번 확인해 주세요.');
            });
    };

    return (
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
                    <Avatar style={{ margin: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        로그인
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="이메일 주소"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="비밀번호"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        {/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" /> */}
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 5, mb: 2 }}>
                            로그인
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                {/* <Link href="#" variant="body2">
                                    비밀번호 찾기
                                </Link> */}
                            </Grid>
                            <Grid item>
                                <Link to="/register">{'회원가입'}</Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {/* <Copyright style={{ marginTop: 8, marginBottom: 4 }} /> */}
            </Container>
        </ThemeProvider>
    );
}

export default SignIn;

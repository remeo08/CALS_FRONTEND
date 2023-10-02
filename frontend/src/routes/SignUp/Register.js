import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import {
    Avatar,
    Button,
    ButtonGroup,
    InputLabel,
    MenuItem,
    CssBaseline,
    TextField,
    FormControl,
    FormControlLabel,
    Checkbox,
    FormHelperText,
    Grid,
    Box,
    Typography,
    Container,
    Select,
    SelectChangeEvent,
    Input,
} from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';
import { RegisterApi } from '../../API';

// mui의 css 우선순위가 높기때문에 important를 설정 - 실무하다 보면 종종 발생 우선순위 문제
const FormHelperTexts = styled(FormHelperText)`
    width: 100%;
    padding-left: 16px;
    font-weight: 700 !important;
    color: #d32f2f !important;
`;

const Boxs = styled(Box)`
    padding-bottom: 40px !important;
`;

const Register = () => {
    const theme = createTheme();
    const [checked, setChecked] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordState, setPasswordState] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');
    const [registerError, setRegisterError] = useState('');
    const [activity, setActivity] = useState('');
    const [selectedGender, setSelectedGender] = useState(false);

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

    const handleGenderClick = (gender) => {
        // 선택된 성별을 상태 변수에 업데이트
        setSelectedGender(gender);
    };

    const handleChange = (event) => {
        setActivity(event.target.value);
    };

    const handleAgree = (event) => {
        setChecked(event.target.checked);
    };

    const onhandlePost = (data) => {
        const { email, username, password, height, weight, age } = data;
        const postData = { email, username, password, gender: selectedGender, height, weight, age, activity };
        console.log('data 으악', data);
        console.log('postData 젠장', postData);

        // axios
        //     .post(
        //         `http://127.0.0.1:8000/api/v1/users/signup`,
        //         postData
        //         // {
        //         // headers: {
        //         //     Authorization: `Bearer ${cookies.access_token}`,
        //         // },
        //         // withCredentials: true,
        //         // }
        //     )
        //     .then(function (response) {
        //         console.log(response, '성공');
        //         // JWT 토큰을 쿠키에 저장합니다.
        //         setCookie('access_token', response.data.access_token, { path: '/' });

        //         // "main" 컴포넌트로 리디렉션합니다.
        //         navigate('/main', { replace: true });
        //     })
        //     .catch(function (err) {
        //         console.error(err);
        //         setRegisterError('회원가입에 실패하였습니다. 다시한번 확인해 주세요.');
        //     });

        RegisterApi(postData)
            .then((responseData) => {
                // 성공적으로 데이터를 가져온 경우 실행할 코드
                console.log(responseData, '성공');
                // JWT 토큰을 쿠키에 저장합니다.
                setCookie('access_token', responseData.access, { path: '/' });
                setRefresh('refresh_token', responseData.refresh, { path: '/' });

                //"main" 컴포넌트로 리디렉션합니다.
                navigate('/main', { replace: true });
            })
            .catch((error) => {
                // 오류 발생 시 실행할 코드
                console.error(error);
                setRegisterError('회원가입에 실패하였습니다. 다시한번 확인해 주세요.');
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        console.log(data, '너는 뭐야');
        const joinData = {
            email: data.get('email'),
            username: data.get('username'),
            password: data.get('password'),
            rePassword: data.get('rePassword'),
            gender: data.get('gender'),
            height: data.get('height'),
            weight: data.get('weight'),
            age: data.get('age'),
        };
        const { age, city, email, username, password, rePassword, gender, height, weight } = joinData;
        console.log(joinData, '123');

        // 이메일 유효성 체크
        const emailRegex =
            /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (!emailRegex.test(email)) setEmailError('올바른 이메일 형식이 아닙니다.');
        else setEmailError('');

        // 비밀번호 유효성 체크
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        if (!passwordRegex.test(password)) setPasswordState('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!');
        else setPasswordState('');

        // 비밀번호 같은지 체크
        if (password !== rePassword) setPasswordError('비밀번호가 일치하지 않습니다.');
        else setPasswordError('');

        // 이름 유효성 검사
        const nameRegex = /^[가-힣a-zA-Z]+$/;
        // if (!nameRegex.test(name) || name.length < 1) setNameError('올바른 이름을 입력해주세요.');
        // else setNameError('');

        // 회원가입 동의 체크
        if (!checked) alert('회원가입 약관에 동의해주세요.');

        if (
            emailRegex.test(email) &&
            passwordRegex.test(password) &&
            password === rePassword &&
            nameRegex.test(username) &&
            checked
        ) {
            onhandlePost(joinData);
        }
    };

    return (
        <ThemeProvider theme={theme}>
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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
                    <Typography component="h1" variant="h5">
                        회원가입
                    </Typography>
                    <Boxs component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <FormControl component="fieldset" variant="standard">
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        onBlur={() => {
                                            console.log('유효성');
                                        }}
                                        autoFocus
                                        fullWidth
                                        type="email"
                                        id="email"
                                        name="email"
                                        label="이메일 주소"
                                        error={emailError !== '' || false}
                                    />
                                </Grid>
                                <FormHelperTexts>{emailError}</FormHelperTexts>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        type="password"
                                        id="password"
                                        name="password"
                                        label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                                        error={passwordState !== '' || false}
                                    />
                                </Grid>
                                <FormHelperTexts>{passwordState}</FormHelperTexts>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        type="password"
                                        id="rePassword"
                                        name="rePassword"
                                        label="비밀번호 확인"
                                        error={passwordError !== '' || false}
                                    />
                                </Grid>
                                <FormHelperTexts>{passwordError}</FormHelperTexts>
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="username"
                                        name="username"
                                        label="이름 또는 닉네임"
                                        error={nameError !== '' || false}
                                    />
                                    <FormControl required sx={{ ml: 1, minWidth: 50 }}>
                                        <InputLabel id="demo-simple-select-label">나이</InputLabel>
                                        <Input
                                            id="age"
                                            name="age"
                                            type="number"
                                            label="age"
                                            min="0"
                                            max="200"
                                            maxLength={3}
                                        ></Input>
                                    </FormControl>
                                </Grid>
                                <FormHelperTexts>{nameError}</FormHelperTexts>
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <FormControl fullWidth required>
                                        <InputLabel id="demo-simple-select-label">하루 운동량</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={activity}
                                            label="activity"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={'lowest'}>안 함</MenuItem>
                                            <MenuItem value={'low'}>10 ~ 30분</MenuItem>
                                            <MenuItem value={'middle'}>30 ~ 60분</MenuItem>
                                            <MenuItem value={'high'}>1시간 이상</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <ButtonGroup color="primary" size="large" sx={{ ml: 1 }}>
                                        <Button
                                            variant={selectedGender === 'male' ? 'contained' : 'outlined'}
                                            onClick={() => handleGenderClick('male')}
                                        >
                                            남
                                        </Button>
                                        <Button
                                            variant={selectedGender === 'female' ? 'contained' : 'outlined'}
                                            onClick={() => handleGenderClick('female')}
                                        >
                                            여
                                        </Button>
                                    </ButtonGroup>
                                </Grid>
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <TextField
                                        required
                                        id="height"
                                        name="height"
                                        label="키(cm)"
                                        error={nameError !== '' || false}
                                    />
                                    <TextField
                                        required
                                        id="weight"
                                        name="weight"
                                        label="몸무게(kg)"
                                        error={nameError !== '' || false}
                                    />
                                </Grid>
                                <FormHelperTexts>{nameError}</FormHelperTexts>
                                <FormHelperTexts>{nameError}</FormHelperTexts>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox onChange={handleAgree} color="primary" />}
                                        label="회원가입 약관에 동의합니다."
                                    />
                                </Grid>
                            </Grid>
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} size="large">
                                회원가입
                            </Button>
                        </FormControl>
                        <FormHelperTexts>{registerError}</FormHelperTexts>
                    </Boxs>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Register;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cookies, useCookies } from 'react-cookie';
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
import { UserApi, updateApi } from '../../API';

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

const MyPage = () => {
    const theme = createTheme();
    const [checked, setChecked] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordState, setPasswordState] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');
    const [registerError, setRegisterError] = useState('');
    const [activity, setActivity] = useState('');
    const [selectedGender, setSelectedGender] = useState(false);

    const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
    const accessToken = cookies.access_token;

    const [user, setUser] = useState('');

    const navigate = useNavigate();

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
        const { username, password, height, weight, age } = data;
        const postData = { username, password, gender: selectedGender, height, weight, age, activity };
        console.log('data 으악', data);
        console.log('postData 젠장', postData);

        updateApi(postData).then((res) => {
            if (res.status === 202) {
                navigate(`/main`, { replace: true });
            } else {
                alert('업로드 실패.');
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        console.log(data, '너는 뭐야');
        const joinData = {
            username: data.get('username'),
            password: data.get('password'),
            rePassword: data.get('rePassword'),
            height: data.get('height'),
            weight: data.get('weight'),
            age: data.get('age'),
        };
        const { age, username, password, rePassword, height, weight } = joinData;
        console.log(joinData, '123');

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

        // if (passwordRegex.test(password) && password === rePassword && nameRegex.test(username) && checked) {
        if (passwordRegex.test(password) && password === rePassword && nameRegex.test(username)) {
            onhandlePost(joinData);
            console.log('juhu');
        }
        console.log('weoriu');
    };
    useEffect(() => {
        UserApi().then((res) => {
            setUser(res.data);
            setActivity(res.data?.activity);
        });
        if (!accessToken) {
            navigate('/login');
        }
    }, []);
    if (!user) {
        return <div>Loading...</div>;
    }

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
                        마이페이지
                    </Typography>
                    <Boxs component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <FormControl component="fieldset" variant="standard">
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        autoFocus
                                        fullWidth
                                        type="email"
                                        id="email"
                                        name="email"
                                        // label="이메일 주소"
                                        value={user.email}
                                        disabled={true}
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
                                        // label="nickname"
                                        defaultValue={user.username}
                                        error={nameError !== '' || false}
                                    />
                                    <FormControl required sx={{ ml: 1, minWidth: 50 }}>
                                        <InputLabel id="demo-simple-select-label">나이</InputLabel>
                                        <Input
                                            value={user.age}
                                            id="age"
                                            name="age"
                                            type="number"
                                            label="age"
                                            min={0}
                                            max={200}
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
                                            label="하루 운동량"
                                            defaultValue={user.activity}
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
                                            variant={user.gender === 'male' ? 'contained' : 'outlined'}
                                            disabled
                                            onClick={() => handleGenderClick('male')}
                                        >
                                            남
                                        </Button>
                                        <Button
                                            variant={user.gender === 'female' ? 'contained' : 'outlined'}
                                            disabled
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
                                        defaultValue={user.height}
                                        error={nameError !== '' || false}
                                    />
                                    <TextField
                                        required
                                        id="weight"
                                        name="weight"
                                        label="몸무게(kg)"
                                        defaultValue={user.weight}
                                        error={nameError !== '' || false}
                                    />
                                </Grid>
                                <FormHelperTexts>{nameError}</FormHelperTexts>
                                <FormHelperTexts>{nameError}</FormHelperTexts>
                            </Grid>
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} size="large">
                                회원정보수정
                            </Button>
                        </FormControl>
                        <FormHelperTexts>{registerError}</FormHelperTexts>
                    </Boxs>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default MyPage;

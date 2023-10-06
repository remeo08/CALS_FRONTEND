import axios from 'axios';
import { useCookies } from 'react-cookie';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

let refresh = false;

function getCookie(name) {
    let matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function setCookie(name, value, options = {}) {
    options = {
        path: '/', // 경로 지정
        ...options, // 아규먼트로 옵션을 넘겨줬을경우 전개연산자로 추가 갱신
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString(); // 생 Date 객체라면 형식에 맞게 인코딩
    }

    let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += '; ' + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            // 밸류가 없다면
            updatedCookie += '=' + optionValue;
        }
    }

    document.cookie = updatedCookie; // 새로 갱신
}

instance.interceptors.request.use((config) => {
    const access_token = getCookie('access_token');
    if (access_token) {
        config.headers['Authorization'] = `Bearer ${access_token}`;
    }
    return config;
});

instance.interceptors.response.use(
    (resp) => resp,
    async (error) => {
        if (error?.response?.status === 401 && !refresh) {
            refresh = true;
            console.log(getCookie('refresh_token'));
            const response = await instance.post('users/login/token/refresh', { refresh: getCookie('refresh_token') });
            if (response.status === 200) {
                instance.defaults.headers.common['Authorization'] = `Bearer 
       ${response.data['access']}`;
                setCookie('access_token', response.data.access);
                setCookie('refresh_token', response.data.refresh);
                return instance(error.config);
            }
            deleteCookie('access_token');
            deleteCookie('refresh_token');
        }
        refresh = false;
        return error;
    }
);

export function RegisterApi(data) {
    return instance.post(`users/signup`, data).then((res) => res.data);
}

export function SignInApi(data) {
    return instance.post(`users/login/token`, data).then((res) => res.data);
}

export function UserApi() {
    return instance.get(`users/`);
    // .then((res) => res.data);
}

export function LogoutApi() {
    return instance.post(`users/logout`, { refresh_token: getCookie('refresh_token') });
}

export function updateApi(data) {
    return instance.put(`users/`, data);
}

export function updateRecordApi(data) {
    return instance.put(`diets/`, data);
}

export function todayRecordApi(data) {
    return instance.post(`diets/ `, data);
}
export function deleteRecordApi(date, category) {
    return instance.delete(`diets/?created_date=${date}&meal_category=${category} `);
}

export function userDataApi(date) {
    return instance.get(`diets/?created_date=${date}`);
}

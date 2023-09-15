import React from 'react';
import { useForm } from 'react-hook-form';
import './Login.css';

const Login = () => {
    // 양식이 현재 어떤 상태인지를 담고있는 formState를 이용하여 isSubmitting 속성을 읽어서 양식이 현재 제출중인지 아닌지 확인
    // 양식이 제출중이면 disabled
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, isSubmitted, errors },
    } = useForm();
    return (
        <div className="loginContainer">
            <div className="loginWrapper">
                <h2>Login</h2>
                {/* onSubmit 속성에 handleSubmit 함수를 호출 data가 넘어오는 callBack 함수 인자로 받음 
            data를 alert 함수를이용해서 알림창을 띄움
            data에는 현재 양식에 각 input 요소에 입력되는 값이 저장 됨 */}
                <form
                    id="login-form"
                    noValidate
                    onSubmit={handleSubmit(async (data) => {
                        await new Promise((r) => setTimeout(r, 1_000));
                        alert(JSON.stringify(data));
                    })}
                >
                    <div className="emailText">
                        <label htmlFor="email">이메일</label>
                    </div>
                    <div className="emailBox">
                        <input
                            id="email"
                            type="email"
                            placeholder="이메일을 입력해주세요."
                            {...register('email', {
                                required: '이메일은 필수 입력입니다.',
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: '이메일 형식에 맞지 않습니다.',
                                },
                            })}
                            aria-invalid={isSubmitted ? (errors.email ? 'true' : 'false') : undefined}
                        />
                        <div className="errors">
                            {errors.email && <small role="alert">{errors.email.message}</small>}
                        </div>
                    </div>
                    <div className="passwordText">
                        <label htmlFor="password">비밀번호</label>
                    </div>
                    <div className="passWordBox">
                        <input
                            id="password"
                            type="password"
                            placeholder="비밀번호를 입력해주세요."
                            {...register('password', {
                                required: '비밀번호는 필수 입력입니다.',
                                minLength: {
                                    value: 8,
                                    message: '8자리 이상 비밀번호를 사용하세요.',
                                },
                            })}
                            aria-invalid={isSubmitted ? (errors.password ? 'true' : 'false') : undefined}
                        />
                        <div className="errors">
                            {errors.password && <small role="alert">{errors.password.message}</small>}
                        </div>
                    </div>
                    <div className="btn">
                        <button type="submit" disabled={isSubmitting}>
                            로그인
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

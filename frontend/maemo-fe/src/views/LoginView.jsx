import React from 'react';
import InputTitle from "../components/LoginView/div/title";
import LoginInput from "../components/LoginView/input/loginInput";
import SubmitButton from "../components/LoginView/button/submitButton";


const LoginView = () => {
  return (
    <>
    <InputTitle>이름</InputTitle>
    <LoginInput placeholder="이름을 입력하세요."></LoginInput>
    <InputTitle>전화번호</InputTitle>
    <LoginInput placeholder="전화번호를 입력하세요."></LoginInput>
    <InputTitle>장애유형</InputTitle>
    <LoginInput placeholder="유형을 입력하세요."></LoginInput>
    <SubmitButton>
    확인
    </SubmitButton>
    </>
  );
}

export default LoginView;
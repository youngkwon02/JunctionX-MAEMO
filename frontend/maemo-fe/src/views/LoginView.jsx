import React from 'react';
import InputTitle from "../components/LoginView/input-title/title";
import NameInput from "../components/LoginView/input/nameInput";
import SubmitButton from "../components/LoginView/button/submitButton";


const LoginView = () => {
  return (
    <>
    <InputTitle>이름</InputTitle>
    <NameInput placeholder="이름을 입력하세요."></NameInput>
    <SubmitButton>
    확인
    </SubmitButton>
    </>
  );
}

export default LoginView;
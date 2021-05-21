import React, {useState} from 'react';
import styled from 'styled-components';
import Container from "../components/LoginView/div/container";
import InputTitle from "../components/LoginView/input-title/title";
import Input from "../components/LoginView/input/input";
import SubmitButton from "../components/LoginView/button/submitButton";
import Modal from '@material-ui/core/Modal';
import InModal from '../components/common/modal'
import InModalOption from '../components/common/modalDiv'
import { getRandomKey } from '../utils/random'

const typeList = ["장애인", "임산부", "고령자", "영유아", "동반자", "어린이", "해당없음"]

const LoginView = () => {
  const [open, setOpen] = useState(false)
  const [userType, setUserType] = useState("")

  const userTypeHandler = (e) => {
    setUserType(e.target.innerHTML)
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const AnyModals = typeList.map((ty) => (<InModalOption key={getRandomKey()} onClick={userTypeHandler} onClose={() => handleClose()}>{ty}</InModalOption>))

  const InModalBox = (
    <>
      <InModal>{AnyModals}</InModal>
    </>
  );

  const Temp = styled.div`
    width: 100px;
    height: 100px;
    background-color: red;
  `
  const MainInfo = styled.div`
		text-align: center;
		font-weight: bold;
		margin-bottom: 30px;
	`

  return (
    <Container>
      <MainInfo>사용자 정보를 입력하세요.</MainInfo>
      <InputTitle>이름</InputTitle>
      <Input placeholder="이름을 입력하세요."></Input>
      <InputTitle>전화번호</InputTitle>
      <Input placeholder="전화번호를 입력하세요."></Input>
      <InputTitle>사용자 타입</InputTitle>
      <Temp onClick={handleOpen}></Temp>
      <Modal open={open} onClose={handleClose}>
          {InModalBox}
      </Modal>
      <InputTitle>장애유형</InputTitle>
      <Input placeholder="유형을 입력하세요."></Input>
      <InputTitle>보호자 정보(선택)</InputTitle>
			<Input relate placeholder="관계"></Input>
      <Input relatePhone placeholder="전화번호를 입력하세요."></Input>
      <SubmitButton>확인</SubmitButton>
    </Container>
  );
}

export default LoginView;
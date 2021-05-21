import React, {useState} from 'react';
import styled from 'styled-components'
import InputTitle from "../components/LoginView/input-title/title";
import NameInput from "../components/LoginView/input/nameInput";
import SubmitButton from "../components/LoginView/button/submitButton";
import Modal from '@material-ui/core/Modal';
import InModal from '../components/common/modal'
import InModalOption from '../components/common/modalDiv'

const typeList = ["장애인, 임산부, 고령자, 영유아 동반자, 어린이, 해당없음"]

const LoginView = () => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const InModalBox = (
    <>
      <InModal>{typeList.map((ty) => {
        return (<InModalOption>{ty}</InModalOption>)
      })}</InModal>
    </>
  );

  const Temp = styled.div`
    width: 100px;
    height: 100px;
    background-color: red;
  `

  return (
    <>
      <InputTitle>이름</InputTitle>
      <NameInput placeholder="이름을 입력하세요."></NameInput>
      <InputTitle>전화번호</InputTitle>
      <NameInput placeholder="전화번호를 입력하세요."></NameInput>
      <InputTitle>사용자 타입</InputTitle>
      <Temp onClick={handleOpen}></Temp>
      <Modal open={open} onClose={handleClose}>
          {InModalBox}
      </Modal>
      <SubmitButton>확인</SubmitButton>
    </>
  );
}

export default LoginView;
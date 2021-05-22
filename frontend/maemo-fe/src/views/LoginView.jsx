import React, {useState} from 'react';
import styled from 'styled-components';
import Container from "../components/LoginView/div/container";
import InputTitle from "../components/LoginView/div/title";
import Input from "../components/LoginView/input/input";
import UserTypeBox from "../components/LoginView/div/userTypeBox";
import SubmitButton from "../components/LoginView/button/submitButton";
import Modal from '@material-ui/core/Modal';
import InModal from '../components/common/modal'
import InModalOption from '../components/common/modalDiv'
import { getRandomKey } from '../utils/random'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../actions/users';
import { postAxios } from '../api/axios';

const typeList = ["장애인", "임산부", "고령자", "영유아", "동반자", "어린이", "해당없음"]

const LoginView = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
	const [name, setName] = useState("")
	const [phone, setPhone] = useState("")
  const [userType, setUserType] = useState("해당없음")
	const [challenge, setChallenge] = useState("")
	const [relate, setRelate] = useState("")
	const [relatePhone, setRelatePhone] = useState("")

  const userTypeHandler = (e) => {
    setUserType(e.target.innerHTML)
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

	const nameHandler = (e) => {
		setName(e.target.value);
	}

	const phoneHandler = (e) => {
		setPhone(e.target.value);
	}

	const challengeHandler = (e) => {
		setChallenge(e.target.value);
	}

	const relateHandler = (e) => {
		setRelate(e.target.value);
	}

	const relatePhoneHandler = (e) => {
		setRelatePhone(e.target.value);
	}

  const AnyModals = typeList.map((ty) => (<InModalOption key={getRandomKey()} onClick={userTypeHandler} onClose={() => handleClose()}>{ty}</InModalOption>))

  const InModalBox = (
    <>
      <InModal>{AnyModals}</InModal>
    </>
  );

  const MainInfo = styled.div`
		text-align: center;
		font-weight: bold;
		margin-bottom: 30px;
	`

  const submitHandler = async () => {
    try {
      const req = {
        name,
        phoneNumber: phone,
        userType,
        challenge,
        relate,
        relatePhone,
      }
      const res = await postAxios('/login', req)
      dispatch(login(res.data.token))
      history.push("/main")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <MainInfo>사용자 정보를 입력하세요.</MainInfo>
      <InputTitle>이름</InputTitle>
      <Input onChange={nameHandler} placeholder="이름을 입력하세요."></Input>
      <InputTitle>전화번호</InputTitle>
      <Input onChange={phoneHandler} placeholder="전화번호를 입력하세요."></Input>
      <InputTitle>사용자 타입</InputTitle>
      <UserTypeBox onClick={handleOpen}>{userType}</UserTypeBox>
      <Modal open={open} onClose={handleClose}>
          {InModalBox}
      </Modal>
      <InputTitle>장애유형</InputTitle>
      <Input onChange={challengeHandler} placeholder="유형을 입력하세요."></Input>
      <InputTitle>보호자 정보(선택)</InputTitle>
			<Input onChange={relateHandler} relate placeholder="관계"></Input>
      <Input onChange={relatePhoneHandler} relatePhone placeholder="전화번호를 입력하세요."></Input>
      <SubmitButton onClick={submitHandler}>확인</SubmitButton>
    </Container>
  );
}

export default LoginView;
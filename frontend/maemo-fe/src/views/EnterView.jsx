import React from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as MainSVG } from '../assets/main.svg'

const EnterView = () => {
  const history = useHistory();

  return (
    <>
    <MainSVG onClick={() => history.push("/login")} width="100%" height="100%"></MainSVG>
    </>
  );
}

export default EnterView;
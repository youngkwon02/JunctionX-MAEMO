import React from 'react';
import styled, {css} from 'styled-components';
import BookElemTop from "./bookElemTop";
import {standardTime} from "../../../utils/time2str"

const StyledBookElem = styled.div`
  width: 100%;
  height: 180px;
  border-radius: 14px;
  box-shadow: 1px 1px 1px #000000;
  border: 1px solid rgba(0, 0, 0, .2);
  margin: 30px 0px;
`;

const BookElem = ({children, ...props}) => {

  const LineTitle = styled.span`
    margin-right: 20px;
		font-weight: bold;
  `;

  const Line = styled.div`
		text-align: left;
		margin-bottom: 10px;
    padding: 0 20px;
    ${(props) =>
      props.bold &&
      css`
        font-weight: bold;
        margin-bottom: 20px;
    `}
	`;

  return (
      <>
        <StyledBookElem>
          <BookElemTop>예약번호 {props.num}</BookElemTop>
          <Line bold>{standardTime(props.data.date, props.data.is_am)}</Line>
          <Line><LineTitle>출발 위치</LineTitle>{props.data.start_point}</Line>
          <Line><LineTitle>도착 위치</LineTitle>{props.data.end_point}</Line>
        </StyledBookElem>
      </>
  )
}

export default BookElem;
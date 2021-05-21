import React from 'react';
import styled from 'styled-components';

const StyledBookElemTop = styled.div`
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-radius: 14px;
  background-color: #fef000;
  font-weight: bold;
  text-align: center;
  bottom: 0;
  margin-bottom: 20px;
`;

const BookElemTop = ({children, ...props}) => {
    return (
        <>
          <StyledBookElemTop>
            {children}
          </StyledBookElemTop>
        </>
    )
}

export default BookElemTop;
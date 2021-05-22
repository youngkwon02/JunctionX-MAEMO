import React from 'react';
import styled from 'styled-components';

const StyledUserTypeBox = styled.div`
    width: calc(100% - 20px);
    height: 30px;
    color: black;
    border: none;
    border-bottom: 2px solid rgba(10, 10, 10, .1);
    margin-bottom: 10px;
    padding: 0 10px;
    text-align: left;
    font-size: .8em;
    line-height: 30px;
`;

const UserTypeBox = ({children, ...props}) => {
    return (
        <>
            <StyledUserTypeBox onClick={props.onClick}>{children}</StyledUserTypeBox>
        </>
    )
}

export default UserTypeBox;
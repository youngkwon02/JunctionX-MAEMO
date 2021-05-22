import React from 'react'
import styled from 'styled-components';

const StyledBookingButton = styled.button`
    width: 100%;
    height: 50px;
    background-color: #fef000;
    color: black;
    border: none;
    font-weight: bold;
    margin-top: 30px;
    border-radius: 14px;
`;

const BookingButton = ({children, ...props}) => {
    return (
        <StyledBookingButton onClick={props.onClick} type="submit">
        {children}
        </StyledBookingButton>
    )
}

export default BookingButton;
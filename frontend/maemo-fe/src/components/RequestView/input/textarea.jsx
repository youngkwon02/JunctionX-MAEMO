import React from 'react';
import styled from 'styled-components';

const StyledTextArea = styled.textarea`
    color: black;
    border: none;
		word-break: keep-all;
    width: calc(100% - 40px);
    height: 160px;
    border: 1px solid rgba(0, 0, 0, .2);
    border-radius: 14px;
    resize: none;
    padding: 20px;
`;

const TextArea = ({children, ...props}) => {
    return (
        <>
        	<StyledTextArea onChange={props.onChange}>
          {props.sound}
          </StyledTextArea>
        </>
    )
}

export default TextArea;
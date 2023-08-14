import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { PiPencilSimpleLine } from 'react-icons/pi';

const FixedWritingButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/PostWriting/:id');
  };

  return (
    <FixedWritingButtonWrapper>
      <WritingButton onClick={handleClick}><PiPencilSimpleLine color='white' size='70px'/>
      </WritingButton>
    </FixedWritingButtonWrapper>
  );
};

export default FixedWritingButton;

const FixedWritingButtonWrapper = styled.div`
  position: fixed;
  bottom: 165px;
  right: 165px;
  
`;

const WritingButton = styled.button`
  background-color: #2BDE97;
  border: none;
  border-radius: 1000px;
  width: 120px;
  height: 120px;
  transition: transform 0.2s ease;
  &:hover {
  transform: translateY(-10px);
  }
`;
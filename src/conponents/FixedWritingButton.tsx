import React from 'react';
import styled from 'styled-components';
import { useNavigate, } from 'react-router-dom';
import { PiPencilSimpleLine } from 'react-icons/pi';

interface FixedWritingButtonProps {
  id: number;
}

const FixedWritingButton: React.FC<FixedWritingButtonProps> = ({id}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/Post/${id}`);
  };

  return (
    <FixedWritingButtonWrapper>
      <WritingButton onClick={handleClick}>
        <PiPencilSimpleLine color='white' size='36px'/>
      </WritingButton>
    </FixedWritingButtonWrapper>
  );
};

export default FixedWritingButton;

const FixedWritingButtonWrapper = styled.div`
  position: fixed;
  bottom: 140px;
  right: 140px;
  
`;

const WritingButton = styled.button`
  background-color: #2BDE97;
  border: none;
  border-radius: 1000px;
  width: 80px;
  height: 80px;
  transition: transform 0.2s ease;
  &:hover {
  transform: translateY(-10px);
  }
`;
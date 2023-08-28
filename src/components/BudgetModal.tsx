import React from 'react'
import { styled } from 'styled-components'
import BugetMessege from './BugetMessege'

type selectForm = {
  position: string,
  budgetOpen: boolean
}

function BudgetModal({position, budgetOpen}:selectForm) {
  
  return (

    <>
      {budgetOpen && (
     <ModalRayout position={position}>
      <BoxUpper>
        <BoxUpperText>
            새소식
          </BoxUpperText>
          <BoxUpperNum>
            0
          </BoxUpperNum>
      </BoxUpper>
          <BugetMessege items={{
            sender: '',
            createdAt: '',
            readStatus: false,
            contents: '',
            message: ''
          }}/>
   </ModalRayout>
      )}
    </>
  )
}

const ModalRayout = styled.div<{ position: string }>`
  width: 438px;
  height: 189px;
  top: 70px;
  right: 0px;
  flex-grow: 0;
  overflow: hidden;
  object-fit: contain;
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.17);
  position: ${(props) => props.position};

`;

const BoxUpper = styled.div`
  width: 440px;
  height: 45px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 12px 16px;
  border-bottom: solid 1px #f4f5f6;
  background-color: #fff;

`;

const BoxUpperText = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  text-align: left;
  color: #484848;
  margin-right: 8px;

`
const BoxUpperNum = styled.div`
   width: 44px;
  height: 20px;
  flex-grow: 0;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: normal;
  text-align: left;
 
  color: #9a9a9a;
`
export default BudgetModal;

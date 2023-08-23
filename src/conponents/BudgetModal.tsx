import React from 'react'
import { styled } from 'styled-components'

type selectForm = {
  position: string,
  budgetOpen: boolean
}

function BudgetModal({position, budgetOpen}:selectForm) {
  
  return (

    <>
      {budgetOpen && (
      <ModalRayout position={position} >
        BudgetModal
        </ModalRayout>
      )}
    </>
  )
}

const ModalRayout = styled.div<{ position: string }>`
    width: 440px;
  height: 189px;
  top : 70px;
  right: 0px;
  flex-grow: 0;
  object-fit: contain;
  border-radius: 16px;
  box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.17);
  position: ${(props) => props.position};
`


export default BudgetModal;
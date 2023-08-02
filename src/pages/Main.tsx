import React from 'react'
import Button from '../conponents/Button'
import { styled } from 'styled-components'




export const Main = () => {

  const kakaoLoginHandler = ()=>{
      console.log("hi")
  }

  return (
    <div>
    <h1>Main</h1>
    <div>Main</div>
    <button>버튼입니다.</button>
    <Button type='primary'>Primary 버튼</Button>

    <Button type='medium'color="green">Medium 버튼</Button>
    <Button type='small' fontSize="10px">Small 버튼</Button>

    </div>
  )
}


import React from 'react'
import Button from '../conponents/Button'
import Map from '../conponents/Map';



export const Main: React.FC = () => {



  const kakaoLoginHandler = ()=>{
      console.log("hi")
  }

  return (
    <div>
    <h1>Main</h1>
    <div>Main</div>
    <button>버튼입니다.</button>
    <Map googleMapApiKey="AIzaSyBDNsgMQVGY3zcAzHleutND1NTI-lf07y8" />
    </div>
  )
}


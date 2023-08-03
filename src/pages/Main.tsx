import React from 'react'
import Button from '../conponents/Button'
import GoogleMapView from '../conponents/GoogleMapView'


export const Main = () => {



  const kakaoLoginHandler = ()=>{
      console.log("hi")
  }

  return (
    <div>
    <h1>Main</h1>
    <div>Main</div>
    <button>버튼입니다.</button>
    <GoogleMapView/>
    </div>
  )
}



import { css, styled } from 'styled-components';
import React from 'react'
import { useQuery } from 'react-query';
import { getHomePosts } from '../api/api';
import { Cards } from '../conponents/Cards';
import { cardItem } from '../types/posts';
import Sockjs from '../conponents/Sockjs';

export const Main: React.FC = () => {
  const { isLoading, isError, data } = useQuery("mainPost", getHomePosts);
  

  if (isLoading) {
  
    return <p>로딩중...!</p>;
  }
  
  if (isError) {
    return <p>오류가 발생하였습니다...!</p>;
  }

  console.log("data", data)

  return (
    <div>
      <Sockjs/>
      {data.map((item : cardItem)=>(
        <Cards items={item}/>
      ))}
    </div>
  )
}
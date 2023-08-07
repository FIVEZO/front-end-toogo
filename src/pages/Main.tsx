
import { css, styled } from 'styled-components';
import React from 'react'
import { useQuery } from 'react-query';
import { getHomePosts } from '../api/api';
import { Cards } from '../conponents/Cards';
import { cardItem } from '../types/posts';
;

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
   
      <StCardContainer>
      {data?.map((item : cardItem)=>(
        <Cards key={item.id} items={item}/>
      ))}
      </StCardContainer>
    </div>
  )
}

const StCardContainer = styled.div`
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
`
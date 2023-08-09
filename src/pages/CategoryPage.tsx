import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { getCategoryPosts } from '../api/api';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { cardItem } from '../types/posts';
import { Cards } from '../conponents/Cards';

export const CategoryPage = () => {
    const param = Number(useParams().id);
    const [page, setpage]= useState<number>(1)
    const { isLoading, isError, data } = useQuery(["categoryPost", page], ()=>getCategoryPosts(param, page));
  

  if (isLoading) {
  
    return <p>로딩중...!</p>;
  }
  
  if (isError) {
    return <p>오류가 발생하였습니다...!</p>;
  }

  const reviousPage = () =>{
    setpage(page-1)
  }
  const nextPage = () =>{
    setpage(page+1)
  }


  return (
    <div>
        <StCardContainer>
      {data?.map((item : cardItem)=>(
        <Cards key={item.id} items={item}/>
      ))}
      </StCardContainer>
      <button onClick={reviousPage}>page-</button>
      <button onClick={nextPage}>page+</button>
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
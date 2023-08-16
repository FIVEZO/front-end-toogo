import React, { useState } from 'react'
import Header from '../conponents/Header';
import Footer from '../conponents/Footer';
import { cardItem } from '../types/posts';
import { SearchCard } from '../conponents/SearchCard';
import { getSearchPosts } from '../api/api';
import { styled } from 'styled-components';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';

export const SearchPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword'); 
  const [page, setpage]= useState<number>(1);
  const { isLoading, isError, data }= useQuery(["searchPosts", page, keyword], () => {
    if (keyword) {
      return getSearchPosts(page, keyword);
    }
    return Promise.resolve(null);
  });

  console.log(data)
  
  if (isLoading) {
  
    return <p>로딩중...!</p>;
  }
  
  if (isError) {
    return <p>오류가 발생하였습니다...!</p>;
  }


  return (
    <div>
        <Header/>
        <h2>프랑스 검색결과</h2>
        <StCardContainer>
      {data?.map((item : cardItem)=>(
        <SearchCard key={item.id} items={item}/>
      ))}
      </StCardContainer>
        <Footer/>
    </div>
  )
}

const StCardContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  gap: 24px;
`;
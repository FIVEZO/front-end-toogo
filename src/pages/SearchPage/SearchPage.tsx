import React, { useState } from 'react'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { cardItem } from '../../types/posts';
import { SearchCard } from './SearchPageComponents/SearchCard';
import { getSearchPosts } from '../../api/api';
import { styled } from 'styled-components';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import "../../fonts/Font.css";
import Spinner from '../../components/Spinner';

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
  
  if (isLoading) {
  
    return <Spinner/>;
  }
  
  if (isError) {
    return <p>오류가 발생하였습니다...!</p>;
  }

  return (
    <div>
        <Header/>
        <SearchResult>
          <SearchResult2>
            <SearchResultKeyword>{keyword}</SearchResultKeyword> 검색결과
          </SearchResult2>
        </SearchResult>
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

const SearchResult = styled.div`
  font-family: "Pretendard";
  font-size: 30px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: 0em;
  text-align: left;
  display: flex;
  width: auto;
  justify-content: center;
  margin-top: 80px;
  margin-bottom: 48px;
`;

const SearchResult2 = styled.div`
  width: 1200px;
  flex-direction: row;
`;

const SearchResultKeyword = styled.span`
  color: #2BDE97;
`;
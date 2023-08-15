import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { getCategoryPosts, getCategoryCountryPosts } from '../api/api';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { cardItem } from '../types/posts';
import { Cards } from '../conponents/Cards';
import Header from '../conponents/Header';
import Footer from '../conponents/Footer';
import Continent from '../conponents/ContinentImage';
import FixedWritingButton from '../conponents/FixedWritingButton';
import ContinentPageSelectCountry from '../conponents/ContinentPageSelectCountryButton';
import LoadMoreButton from '../conponents/LoadMoreButton';

export const CategoryPage = () => {
    const param = Number(useParams().id);
    const [page, setpage]= useState<number>(1)
    const [country, setCountry] = useState<string | null>(null);

    const handleCountryChange = (country: string) => {
      setCountry(country);
      setpage(1);
    };

    const apiFunction: any = country ? getCategoryCountryPosts : getCategoryPosts;
  
    const fetchData = async () => {
      if (country !== null) {
        return await apiFunction(param, country as string, page);
      } else {
        return await apiFunction(param, page);
      }
    };
  
    const { isLoading, isError, data } = useQuery(
      ["categoryPost", param, country, page],
      fetchData
    );

  if (isLoading) {
  
    return <p>로딩중...!</p>;
  }
  
  if (isError) {
    return <p>오류가 발생하였습니다...!</p>;
  }

  const loadMoreContent = () => {
    setpage(page + 1);
  };

  return (
    <div>
      <Header/>
      <Continent id={param}/>
      <ContinentPageSelectCountry id={param} onSelectCountry={handleCountryChange}/>
        <StCardContainer>
      {data?.map((item : cardItem)=>(
        <Cards key={item.id} items={item}/>
      ))}
      </StCardContainer>
      <FixedWritingButton id={param}/>
      <LoadMoreButton onClick={loadMoreContent}/>
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
  gap:24px;
`;

const StButton = styled.button`
  font-size: 20px;
  margin-top: 20px;
`;
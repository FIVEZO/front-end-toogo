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
import PageMovingButton from '../conponents/PageMovingButton';
import { RootState } from '../types/login';
import { useSelector } from 'react-redux';
import Spinner from '../conponents/Spinner';
import { log } from 'console';


export const CategoryPage = () => {
  const state = useSelector((state: RootState) => state.isLogin.isLogin)
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
  
    return <Spinner/>;
  }
  
  if (isError) {
    return <p>오류가 발생하였습니다...!</p>;
  }

  const nextPage = () => {
    setpage(page + 1);
  };

  const previousPage = () => {
    setpage(page - 1);
  };

console.log("data", data)
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

      {state?(<FixedWritingButton id={param}/>):(<></>)}

      <Pagebuttons>
      {page > 1 && (
        <PageMovingButton onClick={previousPage} text="이전 페이지"/>
      )}
      {data?.length >= 20 && (
        <PageMovingButton onClick={nextPage} text="다음 페이지"/>
      )}
      </Pagebuttons>
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

const Pagebuttons = styled.div`
  gap: 50px;
  justify-content: center;
  display: flex;
  margin-top: 100px;
  margin-bottom: 120px;
`;
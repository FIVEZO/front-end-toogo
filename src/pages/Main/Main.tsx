import { styled } from 'styled-components';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { getHomePosts } from '../../api/api';
import { Cards } from '../../components/Cards';
import { cardItem } from '../../types/posts';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CardSlick from './MainComponents/CardSlick';
import Spinner from '../../components/Spinner';

export const Main: React.FC = () => {
  const [showData, setShowData] = useState(false);
  const { isLoading, isError, data:cardData } = useQuery("mainPost", getHomePosts,{
    refetchOnWindowFocus: false,
    });
  
  useEffect(() => {
    const delay = 300; 
    if (!isLoading && !isError) {
      setTimeout(() => {
        setShowData(true);
      }, delay);
    }
  }, [isLoading, isError]);

  if (isLoading) {
  
    return <Spinner/>;
  }
  
  if (isError) {
    return <p>오류가 발생하였습니다...!</p>;
  }
  
  return (
    <div>
        <MainRayout>
          <Header/>
          <TopText>여행지를 선택하세요.</TopText>
          <SecondText>대륙을 선택해서 동행글을 찾아보세요.</SecondText>
          <CardSlick/>
          <TopText>오이여행 Talk</TopText>
          <SecondText>나와 맞는 여행동행과 이야기를 나누어 보아요!</SecondText>
          <StCardContainer>
          {showData && cardData?.map((item: cardItem) => (
              <Cards key={item.id} items={item} />
            ))}
          </StCardContainer>
          <Footer/>
        </MainRayout>
    </div>
  )
}

const MainRayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;
const SecondText = styled.div`
  height: 24px;
  margin-top: 20px;
  margin-bottom: 80px;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #403f4e;
`;

const TopText = styled.div`
  width: 251px;
  height: 36px;
  margin-top: 80px;
  font-family: Pretendard;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #403f4e;
`;

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
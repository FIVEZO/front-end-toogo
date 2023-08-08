
import { css, styled } from 'styled-components';
import React, { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query';
import { getHomePosts } from '../api/api';
import { Cards } from '../conponents/Cards';
import { cardItem } from '../types/posts';
import Header from '../conponents/Header';
;

export const Main: React.FC = () => {
  const queryClient = useQueryClient();
  const [showData, setShowData] = useState(false);
  const { isLoading, isError, data } = useQuery("mainPost", getHomePosts);

  useEffect(() => {
    const delay = 300; 
    if (!isLoading && !isError) {
      setTimeout(() => {
        setShowData(true);
      }, delay);
    }
  }, [isLoading, isError]);
  
  if (isError) {
    return <p>오류가 발생하였습니다...!</p>;
  }

  console.log("data", data)

  return (
    <div>
      <Header/>
      <StCardContainer>
      {showData && data?.map((item: cardItem) => (
          <Cards key={item.id} items={item} />
        ))}
      </StCardContainer>
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


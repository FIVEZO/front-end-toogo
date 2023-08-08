import React from 'react'
import { useQuery } from 'react-query';
import { getDetailPosts } from '../api/api';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';

export const DetailPage = () => {
    const param = useParams().id;
    let category ="";
    let postId = "";

  if (param?.includes("&")) {
    [category, postId] = param.split("&");
  }



    const { isLoading, isError, data } = useQuery("mainPost", ()=>getDetailPosts(+category,+postId));

    

    if (isLoading) {
  
        return <p>로딩중...!</p>;
      }
      
      if (isError) {
        return <p>오류가 발생하였습니다...!</p>;
      }
    
    const {contents,country,createdAt,id,latitude,longitude,meetDate,nickname,scrap,scrapPostSum,title} = data




  return (
    <div>
        <StTitle>제목: {title}</StTitle>
        <StNickname>닉네임: {nickname}</StNickname>
        <StCountry>나라: {country}</StCountry>
        <StContents>내용: {contents}</StContents>
        

    </div>
  )
}

const StTitle = styled.div`
  
`
const StNickname = styled.div`
  
`
const StCountry = styled.div`
  
`
const StContents = styled.div`
  
`
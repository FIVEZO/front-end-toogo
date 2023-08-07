import React from 'react'
import { useQuery } from 'react-query';
import { getDetailPosts } from '../api/api';
import { useParams } from 'react-router-dom';

export const DetailPage = () => {
    const param = Number(useParams().id);
    // const { isLoading, isError, data } = useQuery("mainPost", ()=>getDetailPosts());

    console.log(param)

    // if (isLoading) {
  
    //     return <p>로딩중...!</p>;
    //   }
      
    //   if (isError) {
    //     return <p>오류가 발생하였습니다...!</p>;
    //   }
    
    //   console.log("data", data)




  return (
    <div>
        


    </div>
  )
}

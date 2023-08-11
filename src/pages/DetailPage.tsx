import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addComment, deleteComment, getDetailPosts } from '../api/api';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import useInput from '../hooks/useInput';
import { countryImages } from '../img/countryImages';
import Map from '../conponents/Map';
import GogleMap from '../conponents/GogleMap';
import Header from '../conponents/Header';
import Button from '../conponents/Button';


export const DetailPage = () => {
  const param = useParams().id;
  let category = "";
  let postId = "";
  const queryClient = useQueryClient();
  const [comment, handleCommentChange, resetComment] = useInput();
  
  interface ContinentMapping {
    [key: number]: string;
  }
 
  if (param?.includes("&")) {
    [category, postId] = param.split("&");
  }
  
  const { isLoading, isError, data } = useQuery(["detailPost", category, postId], () =>
  getDetailPosts(+category, +postId)
  );
  
  const commentMutation = useMutation((comment:string) => addComment(+category, +postId, comment), {
    onSuccess: () => {
      queryClient.invalidateQueries("detailPost")
      console.log('댓글 작성 완료!');
      resetComment()
    },
  });
  
  const deleteCommentMutation = useMutation((commentId:number) =>deleteComment(+category, +postId, commentId),{
    onSuccess: () => {
      queryClient.invalidateQueries('detailPost');
      console.log('댓글 삭제 완료!');
    },
  }
  );
  
  if (isLoading) {
    return <p>로딩중...!</p>;
  }
  if (isError) {
    return <p>오류가 발생하였습니다...!</p>;
  }
  
  const { contents, country, createdAt, id, latitude, longitude, meetDate, nickname, scrap, scrapPostSum, title, commentList } = data;
  const countryImage = countryImages[country] || countryImages['한국']

 
  const continentMapping: ContinentMapping = {
    1: '아시아',
    2: '아프리카',
    3: '유럽',
    4: '오세아니아',
    5: '아메리카',
  };

  const commentHandler = (event: React.FormEvent) => {
    event.preventDefault(); // 이벤트 기본 동작 방지
    commentMutation.mutate(comment); // 댓글 작성 함수 호출
  };

  const handleDeleteComment = (commentId: number) => {
    deleteCommentMutation.mutate(commentId);
  };

  return (
    <Layout>
     
      <Header/>
      <MainImg src={countryImage} alt={country} />

      
<NickContainer>

 <Container>     
      <StTitleBox> 
        <StTitle>{title}</StTitle>
        <StCountry>[{continentMapping[+category]}] {country}</StCountry>
      </StTitleBox>
    <DateBox>
      <DateBoxSpanBox> 
        <DateBoxSpan margin={'39px 16px 21px 40px'}>지역</DateBoxSpan>
        {/* <DateBoxSpan margin={'39px 16px 21px 40px'}>지역</DateBoxSpan> */}
        <DateBoxSpan margin={'39px 16px 21px 232px'}>날짜</DateBoxSpan>
        {/* <DateBoxSpan margin={'39px 16px 21px 232px'}>날짜</DateBoxSpan> */}
      </DateBoxSpanBox>
     
      <DateBoxSpan margin={'90px 16px 40px 40px'} >날짜</DateBoxSpan>
      {/* <DateBoxSpan margin={'90px 16px 40px 40px'} >날짜</DateBoxSpan> */}
    </DateBox>
    <ContentBox>
        {contents}
    </ContentBox>
    <AreaBox>위치</AreaBox>
</Container>

<NickBox>
        <StNickname>{nickname} <div className="Line" />
        
      </StNickname>
      <Button
        color={'detailBtn'} 
        margin={"119px 0 16px 0"}
        size={'detail'}
        name={"쪽지 보내기"}
        />
</NickBox>

</NickContainer>


    <MapBox>
    <GogleMap latitude={latitude} longitude={longitude} />
    </MapBox>
      
    

      <form onSubmit={commentHandler}>
        <StInput value={comment} onChange={handleCommentChange} />
        <StCommentButton type="submit">댓글작성</StCommentButton>
        
      </form>
      {commentList.map((item: any) => (
        <>
        <StComment key={item.id}>{item.comment}</StComment>
        <StDeleteButton onClick={()=>handleDeleteComment(item.id)}>댓글 삭제하기</StDeleteButton>
        </>
      ))}
    </Layout>
  );
};

const DateBoxSpanBox = styled.div`
  display: flex;
`

const DateBoxSpan = styled.span<{ margin: string }>`
  margin: 0 16px 21px 0;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #9a9a9a;
  margin: ${({ margin }) => margin};

`


const NickContainer =styled.div`
  display: flex;
  
  

`

const Layout = styled.div`
  width: 100%;
  max-width:1200px;
  margin: 0 auto;
`

const NickBox = styled.div`
  width: 382px;
  height: 289px;
  flex-grow: 0;
  padding: 36px 27px 47px 30px;
  border-radius: 8px;
  box-shadow: 0 3px 15px 0 rgba(0, 0, 0, 0.1);
  border: solid 1px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`
const Container = styled.div`
  width: 1200px;
  margin: auto;
`;

const MapBox = styled.div`
  width: 1200px;
  height: 480px;
  margin: 40px auto 80px;
`

const AreaBox =styled.div`
  width: 423px;
  height: 41px;

  font-family: Pretendard;
  font-size: 28px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #484848;
`

const ContentBox = styled.div`
  width: 753px;
  height: 149px;

  font-family: Pretendard;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  text-align: left;
  color: #484848;
`

const DateBox = styled.div`
 width: 753px;
  height: 160px;
  border-radius: 8px;
  background-color: #f4f5f6;
`

const MainImg = styled.img`
display: block;
  width: 1200px;
  height: 440px;
  margin: 40px auto 55px auto;
  object-fit: cover;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`
const StTitleBox =styled.div`
  width: 753px;
  height: 97px;
  padding: 19px 2.4px 13px 0;

`
const StTitle = styled.div`
height: 41px;
   font-family: Pretendard;
  font-size: 28px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #484848;
`;
const StNickname = styled.div`
   width: 191px;
  height: 27px;
  flex-grow: 0;
  margin: 0 133px 27px 1px;
  -webkit-text-stroke: 1px rgba(0, 0, 0, 0.1);
  font-family: Montserrat;
  font-size: 22px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #484848;
  .Line{
  width: 325px;
  height: 1px;
  flex-grow: 0;
  margin: 27px 0 37px;
  background-color: rgba(0, 0, 0, 0.1);
}
`;
const StCountry = styled.div`

   font-family: Pretendard;
  font-size: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #9a9a9a;
`;
const StContents = styled.div`
  font-size: 40px;
`;
const StInput = styled.input`
  font-size: 40px;
`;
const StCommentButton = styled.button`
  font-size: 40px;
`;
const StComment = styled.div`
  font-size: 40px;
`;
const StDeleteButton = styled.div`
  font-size: 40px;
  border: 1px solid #1FEC9B;
`;

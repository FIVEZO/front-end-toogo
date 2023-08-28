import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { deletePost, getDetailPosts, postScrap } from '../../api/api';
import { styled } from 'styled-components';
import { countryImages } from '../../img/countryImages';
import GogleMap from './DetailPageComponents/GogleMap';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import { createChatRoom } from '../../api/chatApi';
import { FaRegBookmark } from 'react-icons/fa';
import { FiShare2 } from 'react-icons/fi';
import { BsFillBookmarkCheckFill } from 'react-icons/bs';
import Spinner from '../../components/Spinner';
import { createChat } from '../../types/posts';
import { useSelector } from 'react-redux';
import { RootState } from '../../types/login';
import { Comment } from './DetailPageComponents/Comment';
import { getCookie } from '../../utils/cookieUtils';

export const DetailPage = () => {
  const myNickName = getCookie("nickname");
  const state = useSelector((state: RootState) => state.isLogin.isLogin);
  const params = useParams().id;
  let category = "";
  let postId = "";
  const queryClient = useQueryClient();


  const navigate = useNavigate();
  const { isLoading, isError, data } = useQuery(
    ["detailPost", category, postId],
    () => getDetailPosts(+category, +postId)
  );
  
  const postMutation = useMutation((data: { category: number, postId: number }) => postScrap(data.category, data.postId), {
    onSuccess: () => {
      queryClient.invalidateQueries('detailPost');
    }}
  );


const handleScrap = () => {
  postMutation.mutate({ category: Number(category), postId: Number(postId) });
};


  interface ContinentMapping {
    [key: number]: string;
  }

  if (params?.includes("&")) {
    [category, postId] = params.split("&");
  }

  // ----------------------------------------게시물 삭제
  const deletePostMutation = useMutation(
    (data: { category: number; postId: number }) =>
      deletePost(data.category, data.postId),{
      onSuccess:() => {
        navigate('/');
      }}

  );

  const handleDeletePost = () => {
    deletePostMutation.mutate({
      category: Number(category),
      postId: Number(postId),
    });
  };

  //수정버튼
  const moveToUpdate = () => {
    navigate(`/editpost/${category}&${id}`)
  }

// 채팅방 만들기
const createChatMutation = useMutation((makeChatData:createChat) => createChatRoom(makeChatData), {
  onSuccess: (data) => {
   navigate(`/chat/${data.roomId}`)
  }
});
  
  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <p>오류가 발생하였습니다...!</p>;
  }
  
  const {
    contents,
    country,
    people,
    createdAt,
    id,
    latitude,
    longitude,
    meetDate,
    nickname,
    scrap,
    scrapPostSum,
    title,
    commentList,
    newIntroduction,
  } = data;
  const countryImage = countryImages[country] || countryImages["한국"];

  const continentMapping: ContinentMapping = {
    1: "아시아",
    2: "아프리카",
    3: "유럽",
    4: "오세아니아",
    5: "아메리카",
  };

  const makeChatRoom = () => {
    // 쪽지 보내기
    const makeChatData = {
      receiver: nickname,
      postId: id,
    };

    createChatMutation.mutate(makeChatData);
  };


  const handleCopyClipBoard = async () => {// 페이지 url복사
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("클립보드에 링크가 복사되었어요.");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />
      <Layout>
        <MainImg src={countryImage} alt={country} />
        <NickContainer>
          <Container>
            <ScrapBox>
              <StTitleBox>
                <div>
                  <StTitle>{title}</StTitle>
                  <StCountry>
                    [{continentMapping[+category]}] {country}
                  </StCountry>
                </div>
                <div>
                  {scrap ? (
                    <BookmarkBoxFill onClick={handleScrap} />
                  ) : (
                    <BookmarkBox onClick={handleScrap} />
                  )}
                  <ShaerBox onClick={handleCopyClipBoard} />
                </div>
              </StTitleBox>
            </ScrapBox>
            <DateBox>
              <DateBoxSpanBox>
                <DateBoxSpan margin={"39px 16px 21px 40px"}>지역</DateBoxSpan>
                <AreaBoxSpanBox margin={"39px 0 21px 0"}>
                  {country}
                </AreaBoxSpanBox>

                <DateBoxSpan margin={"39px 16px 21px 40px"}>모집인원</DateBoxSpan>
                <AreaBoxSpanBox margin={"39px 0 21px 0"}>
                  {people}명
                </AreaBoxSpanBox>
              </DateBoxSpanBox>
              
              <DateBoxSpanBox>
                <DateBoxSpan margin={"0 16px 0 40px"}>날짜</DateBoxSpan>
                <AreaBoxSpanBox margin={"0 16px 0 0"}>
                  {meetDate}
                </AreaBoxSpanBox>
              </DateBoxSpanBox>
            </DateBox>
            <ContentBox>{contents}</ContentBox>
            <AreaBox>위치</AreaBox>
        </Container>
<NickBox>
        <StNickname>{nickname} <div className="Line" />
        <Stdiv>{newIntroduction}</Stdiv>
      </StNickname>
      <Button
        color={nickname==myNickName?'negativeDetailBtn':'detailBtn'} 
        margin={"119px 0 16px 0"}
        size={'detail'}
        name={"쪽지 보내기"}
        onClick={makeChatRoom}
        disabled={nickname==myNickName}
        />
</NickBox>
</NickContainer>
    <MapBox>
    <GogleMap latitude={latitude} longitude={longitude} />
    </MapBox>
    <AreaBox>댓글</AreaBox>
      <Comment commentList={commentList}/>
      <DelateButtonBox>
      {state && myNickName === nickname ? <DelateButton onClick={handleDeletePost}>삭제하기</DelateButton> : null}
      {state && myNickName === nickname ? <DelateButton onClick={moveToUpdate}>수정하기</DelateButton> : null}
      </DelateButtonBox>
    </Layout>
        <Footer/>
        </>
  );
};

// onClick={()=>handleDeleteComment(item.id)}

const DelateButtonBox = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;

`
const DelateButton = styled.div`
display: flex;
align-items: center;
justify-content: center;
  width: 370px;
  height: 70px;
  flex-grow: 0;
  margin: 80px 24px 0 0;
  border-radius: 5.1px;
  border: solid 1px #000;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #403f4e;
  cursor: pointer;
`
const ShaerBox = styled(FiShare2)`
  width: 28px;
  height: 30px;
  margin-left: 16px;
  cursor: pointer;
`;

const BookmarkBox = styled(FaRegBookmark)`
  width: 32px;
  height: 28px;
  cursor: pointer;
`;
const BookmarkBoxFill = styled(BsFillBookmarkCheckFill)`
  width: 32px;
  height: 28px;
  cursor: pointer;
`;

const ScrapBox = styled.div`
  display: flex;
`;

const DateBoxSpanBox = styled.div`
  display: flex;
`;

const AreaBoxSpanBox = styled.div<{ margin: string }>`
  margin: ${({ margin }) => margin};
  font-family: Pretendard;
  font-size: 24px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #484848;
`;

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
`;

const NickContainer = styled.div`
  display: flex;
`;

const Layout = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const NickBox = styled.div`
  width: 382px;
  height: 289px;
  flex-grow: 0;
  padding: 36px 27px 47px 30px;
  border-radius: 8px;
  box-shadow: 0 3px 15px 0 rgba(0, 0, 0, 0.1);
  border: solid 1px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;
const Container = styled.div`
  width: 1200px;
  margin: auto;
`;

const MapBox = styled.div`
  width: 1200px;
  height: 480px;
  margin: 40px auto 80px;
`;

const AreaBox = styled.div`
  width: 423px;
  height: 41px;
  margin: 80px 0 0 0;
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

const ContentBox = styled.div`
  width: 753px;
  height: auto;
  font-family: Pretendard;
  font-size: 20px;
  margin-top: 20px;
  line-height: 1.2;
  letter-spacing: normal;
  text-align: left;
  color: #484848;
  word-break: break-all;
    overflow: auto;
`;

const DateBox = styled.div`
  width: 753px;
  height: 160px;
  margin-top: 20px;
  border-radius: 8px;
  background-color: #f4f5f6;
`;

const MainImg = styled.img`
  display: block;
  width: 1200px;
  height: 440px;
  margin: 40px auto 55px auto;
  object-fit: cover;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;
const StTitleBox = styled.div`
  width: 753px;
  height: 97px;
  padding: 19px 2.4px 13px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
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
  .Line {
    width: 325px;
    height: 1px;
    flex-grow: 0;
    margin: 27px 0 16px;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Stdiv = styled.div`
  width: 325px;
  font-size: 16px;
`

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


import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { addComment, deleteComment, deletePost, editComment, editPost, getDetailPosts, postScrap } from '../api/api';
import { styled } from 'styled-components';
import useInput from '../hooks/useInput';
import { countryImages } from '../img/countryImages';
import GogleMap from '../conponents/GogleMap';
import Header from '../conponents/Header';
import Button from '../conponents/Button';
import Footer from '../conponents/Footer';
import { createChatRoom } from '../api/chatApi';
import { FaRegBookmark } from 'react-icons/fa';
import { FiShare2 } from 'react-icons/fi';
import { BsFillBookmarkCheckFill } from 'react-icons/bs';
import Spinner from '../conponents/Spinner';
import { createChat } from '../types/posts';
import 댓글프로필 from '../img/댓글프로필.jpg'
import Input from '../conponents/Input';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../types/login';

function getCookie(cookieName: string) {
  var cookieValue = null;
  if (document.cookie) {
    var array = document.cookie.split(escape(cookieName) + "=");
    if (array.length >= 2) {
      var arraySub = array[1].split(";");
      cookieValue = unescape(arraySub[0]);
    }
  }
  return cookieValue;

}


export const DetailPage = () => {
  const myNickName = getCookie("nickname");
  const state = useSelector((state: RootState) => state.isLogin.isLogin);
  const param = Number(useParams().id);
  const params = useParams().id;
  let category = "";
  let postId = "";
  const queryClient = useQueryClient();
  const [comment, handleCommentChange, resetComment] = useInput();
  const [editcomment, handleEditCommentChange, resetEditComment] = useInput();
  const [editInput, setEditInput] = useState<boolean | number>(false)
  const MAX_COMMENT_LENGTH = 200;



  const navigate = useNavigate();
  const { isLoading, isError, data } = useQuery(
    ["detailPost", category, postId],
    () => getDetailPosts(+category, +postId)
  );

  
  console.log("data",data)
  
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
  // ---------------------------------------- 댓글
  const commentMutation = useMutation(
    (comment: string) => {
      const truncatedComment = comment.substring(0, MAX_COMMENT_LENGTH);
      return addComment(+category, +postId, truncatedComment);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("detailPost");
        console.log('댓글 작성 완료!');
        resetComment();
      },
    }
  );
  
  const deleteCommentMutation = useMutation((commentId:number) =>deleteComment(+category, +postId, commentId),{
    onSuccess: () => {
      queryClient.invalidateQueries('detailPost');
      console.log('댓글 삭제 완료!');
    },
  });
  const editCommentMutation = useMutation(
    (commentId: number) => {
      const truncatedEditComment = editcomment.substring(0, MAX_COMMENT_LENGTH);
      return editComment(+category, +postId, commentId, truncatedEditComment);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('detailPost');
        setEditInput(false);
        resetEditComment();
        console.log('댓글 수정 완료!');
      },
    }
  );
  
  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <p>오류가 발생하였습니다...!</p>;
  }

  const {
    contents,
    country,
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

  const commentHandler = (event: React.FormEvent) => {
    // 댓글 작성
    event.preventDefault();
    commentMutation.mutate(comment);
  };

  const handleDeleteComment = (commentId: number) => {
    // 댓글 삭제
    deleteCommentMutation.mutate(commentId);
  };

  const handleEditComment = (commentId: number) => { // 댓글 수정
    editCommentMutation.mutate(commentId);
  };


  const handleEditToggle = (commentId: number) => { // 댓글 수정 인풋 토글
    if(editInput){
      setEditInput(false)
      resetEditComment()
    }else{
      setEditInput(commentId)
    }
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
        <Stdiv>안녕하세요 반갑습니다. 안녕하세요 반갑습니다. 안녕하세요 반갑습니다. 안녕하세요 반갑습니다.안녕하세요 반갑습니다. 안녕하세요 반갑습니다.</Stdiv>
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
      <StCommentBox>
        {commentList.map((item: any) => (
          <StCommentList key={item.id}>
            <StProfileImg src={댓글프로필} alt='프로필사진'/>
            <StContents>
              
              {editInput==item.id?
              <Input placeholder={'수정할 댓글을 적어주세요'} size={'editComment'} type={'text'} value={editcomment} onChange={handleEditCommentChange}/>
              :<StComment>{item.comment}</StComment>}
              
              <StCommentNickName>{`${item.nickname}`}</StCommentNickName>
              <StTime>{` · ${moment(item.createdAt).format("YYYY.MM.DD HH:mm")}`}</StTime>
              {item.nickname==myNickName&&
              <StCommentButtonSet>
              <StDeleteButton onClick={() => handleDeleteComment(item.id)}> · 삭제</StDeleteButton>
              {editInput==item.id&&<StDeleteButton onClick={() => handleEditComment(item.id)}> · 완료</StDeleteButton> }   
            <StDeleteButton onClick={() => handleEditToggle(item.id)}>{editInput==item.id?" · 취소":" · 수정"}</StDeleteButton> 
            </StCommentButtonSet>}
              
            </StContents>
              
          </StCommentList>
        ))}
        <StInputform onSubmit={commentHandler}>
          <StProfileImg src={댓글프로필} alt='프로필사진'/>
          <Input placeholder={'댓글을 적어주세요'} size={'comment'} type={'text'} value={comment} onChange={handleCommentChange}/>
          <Button color={comment?'detailBtn':'negativeDetailBtn'} size={"addComment"} name={"등록하기"} disabled={!comment}/>
        </StInputform>
      </StCommentBox>
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
  margin: 40px 0 0 0;
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
  height: 550px;
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

const StCommentBox = styled.div``;

const StProfileImg = styled.img`
  width: 55px;
  height: 55px;
`;

const StCommentList = styled.div`
  padding: 30px 0;
  display: flex;
  flex-direction: row;
  border-bottom: solid 1px #dddce3;
`;

const StContents = styled.div`
  margin-left:20px;
  width:100%;
`;

const StInputform = styled.form`
  margin-top: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StCommentButtonSet = styled.span`
  margin-right:auto;
`;
const StComment = styled.div`
  font-size:20px;
  min-height:60x;
  width:1100px;
  margin-bottom:10px;
  overflow:hidden;
  word-wrap:break-word;
  display: -webkit-box; // 얘네를 추가히준다
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const StCommentNickName = styled.span`
  font-size: 20px;
`;

const StTime = styled.span`
  font-size: 20px;
  color: #9a9a9a;
`;

const StDeleteButton = styled.span`
  font-size: 20px;
  color:#9A9A9A;
  cursor: pointer;
`;


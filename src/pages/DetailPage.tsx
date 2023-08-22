import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  addComment,
  deleteComment,
  deletePost,
  editPost,
  getDetailPosts,
  postScrap,
} from "../api/api";
import { styled } from "styled-components";
import useInput from "../hooks/useInput";
import { countryImages } from "../img/countryImages";
import GogleMap from "../conponents/GogleMap";
import Header from "../conponents/Header";
import Button from "../conponents/Button";
import Footer from "../conponents/Footer";
import { createChatRoom } from "../api/chatApi";
import { FaRegBookmark } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import Spinner from "../conponents/Spinner";
import { createChat } from "../types/posts";
import 댓글프로필 from "../img/댓글프로필.jpg";
import Input from "../conponents/Input";
import moment from "moment";
import { HiDotsHorizontal } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";

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
  const param = useParams().id;
  let category = "";
  let postId = "";
  const queryClient = useQueryClient();
  const [comment, handleCommentChange, resetComment] = useInput();
  const [modal, setModal] = useState<boolean>(false);

  const node = useRef<HTMLDivElement | null>(null); // 창의 바깥부분을 클릭하였을때 창이 사라짐
  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (modal && node.current && !node.current.contains(e.target as Node))
        setModal(false);
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [modal]);

  const navigate = useNavigate();
  const { isLoading, isError, data } = useQuery(
    ["detailPost", category, postId],
    () => getDetailPosts(+category, +postId)
  );

  const postMutation = useMutation(
    (data: { category: number; postId: number }) =>
      postScrap(data.category, data.postId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("detailPost");
        // Handle success if needed
      },
    }
  );

  const handleScrap = () => {
    postMutation.mutate({ category: Number(category), postId: Number(postId) });
  };

  interface ContinentMapping {
    [key: number]: string;
  }

  if (param?.includes("&")) {
    [category, postId] = param.split("&");
  }

  // ----------------------------------------게시물 삭제
  const deletePostMutation = useMutation(
    (data: { category: number; postId: number }) =>
      deletePost(data.category, data.postId)
  );

  const handleDeletePost = () => {
    deletePostMutation.mutate({
      category: Number(category),
      postId: Number(postId),
    });
  };
  // ----------------------------------------게시글 수정
  const editPostMutation = useMutation(
    (data: { category: number; postId: number }) =>
      editPost(data.category, data.postId)
  );

  const handleEditPost = () => {
    editPostMutation.mutate({
      category: Number(category),
      postId: Number(postId),
    });
  };

  // 채팅방 만들기
  const createChatMutation = useMutation(
    (makeChatData: createChat) => createChatRoom(makeChatData),
    {
      onSuccess: (data) => {
        navigate(`/chat/${data.roomId}`);
      },
    }
  );

  const commentMutation = useMutation(
    (comment: string) => addComment(+category, +postId, comment),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("detailPost");
        console.log("댓글 작성 완료!");
        resetComment();
      },
    }
  );

  const deleteCommentMutation = useMutation(
    (commentId: number) => deleteComment(+category, +postId, commentId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("detailPost");
        console.log("댓글 삭제 완료!");
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

  const handleCopyClipBoard = async () => {
    // 페이지 url복사
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
            <StNickname>
              {nickname} <div className="Line" />
            </StNickname>
            <Button
              color={nickname == myNickName ? "negativeDetailBtn" : "detailBtn"}
              margin={"119px 0 16px 0"}
              size={"detail"}
              name={"쪽지 보내기"}
              onClick={makeChatRoom}
              disabled={nickname == myNickName}
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
              <StProfileImg src={댓글프로필} alt="프로필사진" />
              <StContents>
                <StComment>{item.comment}</StComment>
                <StCommentNickName>{`${item.nickname}`}</StCommentNickName>
                <StTime>{`  ·  ${moment(item.createdAt).format(
                  "YYYY.MM.DD HH:mm"
                )}`}</StTime>
              </StContents>
              <StCommentModal ref={node}>
                <StDeleteButton onClick={() => setModal((pre) => !pre)}>
                  <HiDotsHorizontal />
                </StDeleteButton>
              </StCommentModal>
            </StCommentList>
          ))}
          <StInputform onSubmit={commentHandler}>
            <StProfileImg src={댓글프로필} alt="프로필사진" />
            <Input
              placeholder={"댓글을 적어주세요"}
              size={"comment"}
              type={"text"}
              value={comment}
              onChange={handleCommentChange}
            />
            <Button
              color={comment ? "detailBtn" : "negativeDetailBtn"}
              size={"addComment"}
              name={"등록하기"}
              disabled={!comment}
            />
          </StInputform>
        </StCommentBox>
        <button onClick={handleDeletePost}>삭제</button>
        <button onClick={handleEditPost}>수정</button>
      </Layout>
      <Footer />
    </>
  );
};

// onClick={()=>handleDeleteComment(item.id)}

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
`;

const DateBox = styled.div`
  width: 753px;
  height: 160px;
  margin: 20px 0 20px 0;
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
  margin-left: 20px;
`;

const StInputform = styled.form`
  margin-top: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StCommentButton = styled.button``;
const StComment = styled.div`
  font-size: 20px;
  height: 70px;
  width: 100%;
  margin-right: 55px;
`;

const StCommentNickName = styled.span`
  font-size: 20px;
`;

const StTime = styled.span`
  font-size: 20px;
  color: #9a9a9a;
`;

const StCommentModal = styled.div`
  margin-left: auto;
`;
const StDeleteButton = styled.div`
  font-size: 30px;
  color: #9a9a9a;
  cursor: pointer;
`;

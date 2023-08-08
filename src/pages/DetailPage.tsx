import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addComment, getDetailPosts } from '../api/api';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import useInput from '../hooks/useInput';

export const DetailPage = () => {
  const param = useParams().id;
  let category = "";
  let postId = "";
  const queryClient = useQueryClient();
  const [comment, handleCommentChange] = useInput();

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
    },
  });

  if (isLoading) {
    return <p>로딩중...!</p>;
  }
  if (isError) {
    return <p>오류가 발생하였습니다...!</p>;
  }

  const { contents, country, createdAt, id, latitude, longitude, meetDate, nickname, scrap, scrapPostSum, title, commentList } = data;

 

  const commentHandler = (event: React.FormEvent) => {
    event.preventDefault(); // 이벤트 기본 동작 방지
    commentMutation.mutate(comment); // 댓글 작성 함수 호출
  };

  return (
    <div>
      <StTitle>제목: {title}</StTitle>
      <StNickname>닉네임: {nickname}</StNickname>
      <StCountry>나라: {country}</StCountry>
      <StContents>내용: {contents}</StContents>
      <form onSubmit={commentHandler}>
        <StInput value={comment} onChange={handleCommentChange} />
        <StCommentButton type="submit">댓글작성</StCommentButton>
      </form>
      {commentList.map((item: any) => (
        <StComment key={item.id}>{item}</StComment>
      ))}
    </div>
  );
};

const StTitle = styled.div`
  font-size: 40px;
`;
const StNickname = styled.div`
  font-size: 40px;
`;
const StCountry = styled.div`
  font-size: 40px;
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

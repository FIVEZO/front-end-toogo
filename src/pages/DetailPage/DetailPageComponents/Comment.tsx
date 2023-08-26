import React, { useState } from 'react'
import { styled } from 'styled-components';
import Input from '../../../conponents/Input';
import Button from '../../../conponents/Button';
import { useMutation, useQueryClient } from 'react-query';
import { addComment, deleteComment, editComment } from '../../../api/api';
import useInput from '../../../hooks/useInput';
import 댓글프로필 from '../../../img/댓글프로필.jpg'
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { ReactComponent as Winking1 } from "../../../conponents/assets/emoticon/winking1.svg";
import { ReactComponent as Winking2 } from "../../../conponents/assets/emoticon/winking2.svg";
import { ReactComponent as Winking3 } from "../../../conponents/assets/emoticon/winking3.svg";
import { ReactComponent as Winking4 } from "../../../conponents/assets/emoticon/winking4.svg";
import { ReactComponent as Winking5 } from "../../../conponents/assets/emoticon/winking5.svg";
import { getCookie } from '../../../utils/cookieUtils';

export const Comment = ({ commentList }: { commentList: any }) => {
    const myNickName = getCookie("nickname");
    const MAX_COMMENT_LENGTH = 200;
    const queryClient = useQueryClient();
    const [comment, handleCommentChange, resetComment] = useInput();
    const [editcomment, handleEditCommentChange, resetEditComment] = useInput();
    const [editInput, setEditInput] = useState<boolean | number>(false)
    const params = useParams().id;
    let category = "";
    let postId = "";
    if (params?.includes("&")) {
        [category, postId] = params.split("&");}

//-----------------------------------------댓글 작성
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

      const commentHandler = (event: React.FormEvent) => {
        event.preventDefault();
        commentMutation.mutate(comment);
      };
      
//-----------------------------------------댓글 삭제
      const deleteCommentMutation = useMutation((commentId:number) =>deleteComment(+category, +postId, commentId),{
        onSuccess: () => {
          queryClient.invalidateQueries('detailPost');
          console.log('댓글 삭제 완료!');
        },
      });

      const handleDeleteComment = (commentId: number) => {
        deleteCommentMutation.mutate(commentId);
      };

//-----------------------------------------댓글 수정
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

      const handleEditComment = (commentId: number) => { 
        if(editcomment){
          editCommentMutation.mutate(commentId);
        }else{
          alert("수정할 댓글을 입력해주세요!")
        }
        
      };

      const handleEditToggle = (commentId: number) => { // 댓글 수정 인풋 토글
        if(editInput){
          setEditInput(false)
          resetEditComment()
        }else{
          setEditInput(commentId)
        }
      };

  //---------------------------------------------------- 'emoticon' 값에 따라 다른 이모티콘 컴포넌트를 렌더링
  const emoticon = getCookie("emoticon");
  type EmoticonComponents = {
    [key: string]: JSX.Element;
  };
  const emoticonComponents: EmoticonComponents = {
    1: <Winking1 />,
    2: <Winking2 />,
    3: <Winking3 />,
    4: <Winking4 />,
    5: <Winking5 />,
  };
  const selectedEmoticon = emoticon ? emoticonComponents[emoticon] : null;

  return (
    <StCommentBox>
        {commentList?.map((item: any) => (
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
              {editInput==item.id&&<StDeleteButton onClick={() => handleEditComment(item.id)}> · 완료</StDeleteButton>}   
            <StDeleteButton onClick={() => handleEditToggle(item.id)}>{editInput==item.id?" · 취소":" · 수정"}</StDeleteButton> 
            </StCommentButtonSet>}
            </StContents>
          </StCommentList>
        ))}
        <StInputform onSubmit={commentHandler}>
            {selectedEmoticon}
          <Input placeholder={'댓글을 적어주세요'} size={'comment'} type={'text'} value={comment} onChange={handleCommentChange}/>
          <Button color={comment?'detailBtn':'negativeDetailBtn'} size={"addComment"} name={"등록하기"} disabled={!comment}/>
        </StInputform>
      </StCommentBox>
  )
}


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




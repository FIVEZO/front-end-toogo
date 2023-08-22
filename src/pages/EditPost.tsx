import React, { useState } from "react";
import useInput from "../hooks/useInput";
import { useMutation, useQuery } from "react-query";
import {  editPost, getDetailPosts } from "../api/api";
import { locationFormValues, postFormValues,  } from "../types/posts";
import { useNavigate, useParams } from "react-router-dom";
import Map from "../conponents/Map";
import { styled } from "styled-components";
import Input from "../conponents/Input";
import Button from "../conponents/Button";
import Header from "../conponents/Header";
import Footer from "../conponents/Footer";
import NavigationBox from "../conponents/NavigationBox";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  selectedCountryState,
  selectedDateState,
} from "../recoil/post/NavigationBar";

function EditPost() {
  const param = useParams().id;
  let category = "";
  let postId = "";
  
  const { isLoading, isError, data } = useQuery(["detailPost", category, postId], () =>
  getDetailPosts(+category, +postId)
  );
  const [title, handleTitleChange] = useInput(data.title);
  const [contents, handleContentsChange] = useInput(data.contents);
  const [meetDate, handleMeetDateChange] =  useInput();

  if (param?.includes("&")) {
    [category, postId] = param.split("&");
  }
  
  const selectedCountry = useRecoilValue(selectedCountryState);
  const formattedDate = useRecoilValue(selectedDateState);
  const [MarkerPosition, setMarkerPosition] =
    useState<null | locationFormValues>(null);
  const [latitudeMarkerPosition, setLatitudeMarkerPosition] =
    useState<number>(0);
  const [longitudeMarkerPosition, setLongitudeMarkerPosition] =
    useState<number>(0);
  const navigate = useNavigate();

  const handleMarkerPositionChange = (newPosition: locationFormValues) => {
    if (newPosition) {
      setLatitudeMarkerPosition(newPosition.latitude);
      setLongitudeMarkerPosition(newPosition.longitude);
      setMarkerPosition(newPosition);
    }
  };


 console.log("data",data)


  // ----------------------------------------게시글 수정
  const editPostMutation = useMutation(
    (postData: postFormValues) =>
      editPost(+category, +postId, postData)
  );
  

  const handleEditPost = () => {

    const postData: postFormValues = {
      title,
      contents,
      country: selectedCountry,
      meetDate: formattedDate,
      latitude: latitudeMarkerPosition,
      longitude: longitudeMarkerPosition,
    };
    
    editPostMutation.mutate(postData);
  };

  return (
    <div>

    <Header/>
    <NavigationBox/>
    <Layout>

  
      <StInputLabel>제목</StInputLabel>
      <Input type={"text"} placeholder="제목을 입력해주세요" value={title} onChange={handleTitleChange} size={"postTitle"} color={'#cfced7'}/>

      <StInputLabel>내용</StInputLabel>
      <ContentInput placeholder="내용을 입력해주세요"  value={contents} onChange={handleContentsChange} />

      <StInputLabel>위치</StInputLabel>
      <Map onMarkerPosition={MarkerPosition} onMarkerPositionChange={handleMarkerPositionChange}/>
      
      
      <StButtonSet>
        <Button name={"취소"} size={'post'} color={"negative"} onClick={()=>navigate(-1)} />
        <Button name={"작성완료"} size={'post'} color={""} onClick={handleEditPost}/>
      </StButtonSet>
      
    </Layout>
    <Footer/>

    </div>
  );
}

export default EditPost;


const ContentInput = styled.textarea`
  width: 1200px;
  height: 180px;
  font-size: 16px;
  margin: 40px auto 60px;
  padding-left: 20px;
  padding-top: 20px;
  border-radius: 8px;
  border: solid 1px #cfced7;
  background-color: #fff;
  outline: none;
  color: #484848;
  &::placeholder { 
    color:  #dddce3;;
  }
`

const Layout = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;
const StCalendar = styled.div`
  width: 100%;
`;

const StInputLabel = styled.div`
  padding-top: 20px;
  font-size: 28px;
  color: #484848;
`;
const StButtonSet = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 80px 0 120px 0;
`;

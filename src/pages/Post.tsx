import React, { useState } from "react";
import useInput from "../hooks/useInput";
import { useMutation } from "react-query";
import { addPost } from "../api/api";
import { locationFormValues, postFormValues } from "../types/posts";
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

function Post() {
  const param = Number(useParams().id);
  const [title, handleTitleChange] = useInput();
  const [contents, handleContentsChange] = useInput();
  const [meetDate, handleMeetDateChange] = useInput();
  // const [selectedCountry, setSelectedCountry] = useState<string>("");
  const selectedCountry = useRecoilValue(selectedCountryState);
  const [, setFormattedDate] = useRecoilState(selectedDateState);
  const formattedDate = useRecoilValue(selectedDateState);
  const [, setSelectedCountry] = useRecoilState(selectedCountryState);
  const [MarkerPosition, setMarkerPosition] =
    useState<null | locationFormValues>(null);
  const [latitudeMarkerPosition, setLatitudeMarkerPosition] =
    useState<number>(0);
  const [longitudeMarkerPosition, setLongitudeMarkerPosition] =
    useState<number>(0);
  const [dateValue, dateValueChange] = useState(new Date());
  const navigate = useNavigate();

  const handleMarkerPositionChange = (newPosition: locationFormValues) => {
    if (newPosition) {
      setLatitudeMarkerPosition(newPosition.latitude);
      setLongitudeMarkerPosition(newPosition.longitude);
      setMarkerPosition(newPosition);
    }
  };

  // ----------------------------------------게시글 등록
  const postMutation = useMutation(
    (postData: postFormValues) => addPost(param, postData),
    {
      onSuccess: () => {
        navigate("/");
        setFormattedDate("");
        setSelectedCountry("");
      },
    }
  );

  const postHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const postData: postFormValues = {
      title,
      contents,
      country: selectedCountry,
      meetDate: formattedDate,
      latitude: latitudeMarkerPosition,
      longitude: longitudeMarkerPosition,
    };
    postMutation.mutate(postData);
  };

  return (
    <div>
      <Header />
      <NavigationBox />
      <Layout>
        {/* <SelectCountry id={param} onClick={setSelectedCountry} />
      <StCalendar>
        <CustomCalendar/>
      </StCalendar> */}
        <StInputLabel>제목</StInputLabel>
        <Input
          type="text"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={handleTitleChange}
          size={"postTitle"}
          color={"#cfced7"}
        />

        <StInputLabel>내용</StInputLabel>
        <Input
          type="text"
          placeholder="내용을 입력해주세요"
          value={contents}
          onChange={handleContentsChange}
          size={"postContents"}
          color={"#cfced7"}
        />

        <StInputLabel>위치</StInputLabel>
        <Map
          onMarkerPosition={MarkerPosition}
          onMarkerPositionChange={handleMarkerPositionChange}
        />

        <StButtonSet>
          <Button
            name={"취소"}
            size={"post"}
            color={"negative"}
            onClick={() => navigate(-1)}
          />
          <Button
            name={"작성완료"}
            size={"post"}
            color={""}
            onClick={postHandler}
          />
        </StButtonSet>
      </Layout>
      <Footer />
    </div>
  );
}

export default Post;

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

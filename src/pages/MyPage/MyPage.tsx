import React, { useState } from "react";
import { styled } from "styled-components";
import { ReactComponent as Winking6 } from "../../components/assets/emoticon/winking6.svg";
import { BiSolidPencil } from "react-icons/bi";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getMyPosts, getScrapPosts } from "../../api/api";
import Footer from "../../components/Footer";
import "../../fonts/Font.css";
import { getCookie } from "../../utils/cookieUtils";
import { selectedEmoticonBig } from "../../utils/emoticonUtils";
import { MyPostTabContent } from "./MyPageComponents/MyPostTabContent";
import { ScrapTabContent } from "./MyPageComponents/ScrapTabContent";

export const MyPage = () => {
  const [activeTab, setActiveTab] = useState("postList");
  const [pagenum, setPagenum] = useState<number>(1);
  const navigate = useNavigate();
  const emoticon = getCookie("emoticon");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const {
    isLoading: isLoadingPost,
    isError: isErrorPost,
    data: postData,
  } = useQuery("myPost", getMyPosts);

  const {
    isLoading: isLoadingScrap,
    isError: isErrorScrap,
    data: scrapData,
  } = useQuery("myScrap", () => getScrapPosts(pagenum));

  const nickname = getCookie("nickname");
  const email = getCookie("email");

  return (
    <>
      <Header />
      <InfoBox>
        <MainEmoticon>
          {selectedEmoticonBig(emoticon)}
          <PenIconBox onClick={() => navigate("/Account")}>
            <PenIcon />
          </PenIconBox>
        </MainEmoticon>
        <NameBox>{nickname}</NameBox>
        {email && <MailBox>{email}</MailBox>}
      </InfoBox>

      <PageBox>
        <PostTap
          active={activeTab === "postList"}
          onClick={() => handleTabClick("postList")}
        >
          작성글 목록
        </PostTap>
        <PostTapLine />
        <PostTap
          active={activeTab === "scrapList"}
          onClick={() => handleTabClick("scrapList")}
        >
          스크랩한 글
        </PostTap>
      </PageBox>
      <MyPostTabContent
        activeTab={activeTab}
        isLoading={isLoadingPost}
        isError={isErrorPost}
        data={postData}
      />
      <ScrapTabContent
        activeTab={activeTab}
        isLoading={isLoadingScrap}
        isError={isErrorScrap}
        data={scrapData}
      />
      <Footer />
    </>
  );
};

const InfoBox = styled.div`
  width: 1200px;
  height: 260px;
  margin: 80px auto 39px auto;
  align-items: center;
  flex-direction: column;
  display: flex;
  position: relative;
`;

const MainEmoticon = styled.div`
  position: relative;
  width: 180px;
  height: 174px;
  margin-top: 10.5px;
  display: flex;
`;

const PenIconBox = styled.div`
  position: absolute;
  margin: 113.5px 0px 65.5px 120px;
  width: 60px;
  height: 60px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #2bde97;
  cursor: pointer;
`;

const PenIcon = styled(BiSolidPencil)`
  color: white;
  width: 25px;
  height: 25px;
`;

const NameBox = styled.div`
  width: 182.1px;
  height: 28px;
  font-family: "Pretendard";
  margin-top: 10.5px;
  font-size: 23.6px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #112211;
`;

const MailBox = styled.div`
  width: 182.1px;
  height: 19px;
  margin-top: 8px;
  opacity: 0.75;
  font-family: "Pretendard";
  font-size: 15.8px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #112211;
`;

const PageBox = styled.div`
  max-width: 1200px;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  border-radius: 11.8px;
  box-shadow: 0 3.9px 15.8px 0 rgba(17, 34, 17, 0.05);
  border: solid 1px #dddce3;
  background-color: #fff;
`;

const PostTap = styled.div<{ active: boolean }>`
  height: 80px;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  border-bottom: ${({ active }) => (active ? " 3.9px solid  #2bde97" : "none")};
  cursor: pointer;
`;

const PostTapLine = styled.span`
  width: 1px;
  height: 47.3px;
  flex-grow: 0;
  background-color: #d7e2ee;
`;

const ContentBox = styled.div`
  max-width: 1200px;
  height: 280px;
  margin: 235px auto;
  padding: 71px auto 72px auto;
  border-radius: 8px;
  border: solid 1px #cfced7;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MiniSvg = styled(Winking6)`
  width: 50px;
  height: 50px;
`;

const MibiText = styled.div`
  width: 173px;
  height: 71px;
  flex-grow: 0;
  margin: 16px 0 0;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: center;
  color: #131f3c;
`;

const StCardContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  gap: 24px;
  margin-top: 80px;
`;

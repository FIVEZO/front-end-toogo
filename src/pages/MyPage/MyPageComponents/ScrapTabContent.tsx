import React from "react";
import Spinner from "../../../components/Spinner";
import { Cards } from "../../../components/Cards";
import { styled } from "styled-components";
import { TabContentProps, cardItem } from "../../../types/posts";
import { ReactComponent as Winking6 } from "../../../components/assets/emoticon/winking6.svg";

export const ScrapTabContent: React.FC<TabContentProps> = ({
  activeTab,
  isLoading,
  isError,
  data,
}) => {
  if (activeTab === "scrapList") {
    if (isLoading) {
      return <Spinner />;
    }
    if (isError) {
      return <p>Error loading scrap data...</p>;
    }
    return data.data && data.data.length > 0 ? (
      <StCardContainer>
        {data.data.map((item: cardItem) => (
          <Cards key={item.id} items={item} />
        ))}
      </StCardContainer>
    ) : (
      <ContentBox>
        <MiniSvg />
        <MibiText>
          아직 스크랩한
          <br /> 글이 없어요
        </MibiText>
      </ContentBox>
    );
  }
  return null;
};

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

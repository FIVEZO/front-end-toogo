import { styled } from "styled-components";
import { countryImages } from "../../../img/countryImages";

//-------------------------------------------채팅 작성글 불러오기
interface ChatPostProps {
    chatRoomIn: any;
    navigate: (path: string) => void;
  }
  
export const ChatPost: React.FC<ChatPostProps> = ({ chatRoomIn, navigate }) => {
    const countryImage =
      countryImages[chatRoomIn?.country] || countryImages["한국"];
  
    return (
      <StPost
        onClick={() =>
          navigate(`/detailpage/${chatRoomIn?.category}&${chatRoomIn?.postId}`)
        }
      >
        <StCountryImg src={countryImage} />
        <StPostTitle>{`[${chatRoomIn?.country}]  ${chatRoomIn?.title}`}</StPostTitle>
      </StPost>
    );
  };

  const StPost = styled.div`
  background-color: #f4f5f6;
  font-size: 16px;
  height: 80px;
  border-bottom: 1px solid #dddce3;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const StCountryImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 8px;
`;
const StPostTitle = styled.span`
  font-size: 16px;
  margin-left: 24px;
  font-weight: 700;
`;
import 일본 from "../img/일본.jpg";
import 한국 from "../img/한국.jpg";
import 홍콩 from "../img/홍콩.jpg";
import 대만 from "../img/대만.jpg";
import 중국 from "../img/중국.jpg";
import 몽골 from "../img/몽골.jpg";
import 싱가포르 from "../img/싱가포르.jpg";
import 베트남 from "../img/베트남.jpg";
import 태국 from "../img/태국.jpg";
import 인도네시아 from "../img/인도네시아.jpg";
import 말레이시아 from "../img/말레이시아.jpg";
import 필리핀 from "../img/필리핀.jpg";
import 라오스 from "../img/라오스.jpg";
import 캄보디아 from "../img/캄보디아.jpg";
import 미얀마 from "../img/미얀마.jpg";
import 아랍에미리트 from "../img/아랍에미리트.jpg";
import 인도 from "../img/인도.jpg";
import 네팔 from "../img/네팔.jpg";
import 이스라엘 from "../img/이스라엘.jpg";
import 카타르 from "../img/카타르.jpg";
import 이집트 from "../img/이집트.jpg";
import 남아프리카공화국 from "../img/남아프리카공화국.jpg";
import 탄자니아 from "../img/탄자니아.jpg";
import 에티오피아 from "../img/에티오피아.jpg";
import 케냐 from "../img/케냐.jpg";
import 나미비아 from "../img/나미비아.jpg";
import 모로코 from "../img/모로코.jpg";
import 프랑스 from "../img/프랑스.jpg";
import 이탈리아 from "../img/이탈리아.jpg";
import 터키 from "../img/터키.jpg";
import 스페인 from "../img/스페인.jpg";
import 영국 from "../img/영국.jpg";
import 오스트리아 from "../img/오스트리아.jpg";
import 네덜란드 from "../img/네덜란드.jpg";
import 독일 from "../img/독일.jpg";
import 스위스 from "../img/스위스.jpg";
import 포르투갈 from "../img/포르투갈.jpg";
import 폴란드 from "../img/폴란드.jpg";
import 아이슬란드 from "../img/아이슬란드.jpg";
import 핀란드 from "../img/핀란드.jpg";
import 스웨덴 from "../img/스웨덴.jpg";
import 노르웨이 from "../img/노르웨이.jpg";
import 덴마크 from "../img/덴마크.jpg";
import 그리스 from "../img/그리스.jpg";
import 러시아 from "../img/러시아.jpg";
import 아일랜드 from "../img/아일랜드.jpg";
import 헝가리 from "../img/헝가리.jpg";
import 벨기에 from "../img/벨기에.jpg";
import 체코 from "../img/체코.jpg";
import 슬로베니아 from "../img/슬로베니아.jpg";
import 호주 from "../img/호주.jpg";
import 뉴질랜드 from "../img/뉴질랜드.jpg";
import 괌 from "../img/괌.jpg";
import 하와이 from "../img/하와이.jpg";
import 미국 from "../img/미국.jpg";
import 캐나다 from "../img/캐나다.jpg";
import 멕시코 from "../img/멕시코.jpg";
import 페루 from "../img/페루.jpg";
import 볼리비아 from "../img/볼리비아.jpg";
import 칠레 from "../img/칠레.jpg";
import 아르헨티나 from "../img/아르헨티나.jpg";
import 쿠바 from "../img/쿠바.jpg";
import 브라질 from "../img/브라질.jpg";

type CountryImageMapping = {
    [key: string]: string;
  };


  export const countryImages:CountryImageMapping = {
    한국, 일본, 홍콩, 대만, 중국, 몽골, 싱가포르, 베트남, 태국, 인도네시아, 말레이시아, 필리핀, 라오스, 캄보디아, 미얀마,
    아랍에미리트, 인도, 네팔, 이스라엘, 카타르, 이집트, 남아프리카공화국, 탄자니아, 에티오피아, 케냐, 나미비아, 모로코,
    프랑스, 이탈리아, 터키, 스페인, 영국, 오스트리아, 네덜란드, 독일, 스위스, 포르투갈, 폴란드, 아이슬란드, 핀란드,
    스웨덴, 노르웨이, 덴마크, 그리스, 러시아, 아일랜드, 헝가리, 벨기에, 체코, 슬로베니아, 호주, 뉴질랜드, 괌, 하와이,
    미국, 캐나다, 멕시코, 페루, 볼리비아, 칠레, 아르헨티나, 쿠바, 브라질
  };

// export const countryImages:CountryImageMapping = {
//     "일본": 일본,
//     "한국": 한국,
//     "홍콩": 홍콩,
//     "대만": 대만,
//     "중국": 중국,
//     "몽골": 몽골,
//     "싱가포르": 싱가포르,
//     "베트남": 베트남,
//     "태국": 태국,
//     "인도네시아": 인도네시아,
//     "말레이시아": 말레이시아,
//     "필리핀": 필리핀,
//     "라오스": 라오스,
//     "캄보디아": 캄보디아,
//     "미얀마": 미얀마,
//     "아랍에미리트": 아랍에미리트,
//     "인도": 인도,
//     "네팔": 네팔,
//     "이스라엘": 이스라엘,
//     "카타르": 카타르,
//     "이집트": 이집트,
//     "남아프리카공화국": 남아프리카공화국,
//     "탄자니아": 탄자니아,
//     "에티오피아": 에티오피아,
//     "케냐": 케냐,
//     "나미비아": 나미비아,
//     "모로코": 모로코,
//     "프랑스": 프랑스,
//     "이탈리아": 이탈리아,
//     "터키": 터키,
//     "스페인": 스페인,
//     "영국": 영국,
//     "오스트리아": 오스트리아,
//     "네덜란드": 네덜란드,
//     "독일": 독일,
//     "스위스": 스위스,
//     "포르투갈": 포르투갈,
//     "폴란드": 폴란드,
//     "아이슬란드": 아이슬란드,
//     "핀란드": 핀란드,
//     "스웨덴": 스웨덴,
//     "노르웨이": 노르웨이,
//     "덴마크": 덴마크,
//     "그리스": 그리스,
//     "러시아": 러시아,
//     "아일랜드": 아일랜드,
//     "헝가리": 헝가리,
//     "벨기에": 벨기에,
//     "체코": 체코,
//     "슬로베니아": 슬로베니아,
//     "호주": 호주,
//     "뉴질랜드": 뉴질랜드,
//     "괌": 괌,
//     "하와이": 하와이,
//     "미국": 미국,
//     "캐나다": 캐나다,
//     "멕시코": 멕시코,
//     "페루": 페루,
//     "볼리비아": 볼리비아,
//     "칠레": 칠레,
//     "아르헨티나": 아르헨티나,
//     "쿠바": 쿠바,
//     "브라질": 브라질,
// };

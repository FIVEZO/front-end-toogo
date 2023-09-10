프로젝트 기간 23.07~23.09 (6주)
[OE] 오늘 이곳에서 함께 할래요?

오이여행 로고
<img width="449" alt="IMG_5966 PNG" src="https://github.com/FIVEZO/front-end-toogo/assets/132332533/994e2f6d-4a97-4464-a7f3-2e9ae0acfa2d">

오늘 이곳 오이 여행으로
![오이여행-1](https://github.com/FIVEZO/front-end-toogo/assets/132332533/976d4c76-6ca8-417d-a2b6-92fe709496d0)
![Page2](https://github.com/FIVEZO/front-end-toogo/assets/132332533/dda510c2-a5b9-40c2-9dbf-4e51d410d0ad)
![Page3](https://github.com/FIVEZO/front-end-toogo/assets/132332533/455f3f89-2a5a-4d70-8b87-77a7d1c479e0)


🚪도메인(IP) 주소
🥒OE Trip 바로가기🥒 https://oetrip.site/

🏗 아키텍쳐
<img width="1163" alt="스크린샷 2023-09-04 오후 12 23 20 (1)" src="https://github.com/FIVEZO/front-end-toogo/assets/132332533/5cd32776-7c28-4ecf-addc-e0f2be27d0e6">

💡 기술적 의사결정

Front-End

사용 기술 기술 설명

Typescript :TypeScript는 변수, 함수 매개변수, 반환값 등에 타입을 명시하여 타입 오류를 사전에 검출할 수 있습니다. 이로써 런타임 에러를 사전에 방지하고 안정성을 높일 수 있음 타입 어노테이션을 통해 함수나 변수의 의도를 명확하게 표현할 수 있어 코드의 가독성을 높임 또한, 많은 개발자들이 활발하게 사용하고 컨트리뷰션하고 있습니다. 따라서 커뮤니티와 다양한 도구의 지원을 받을 수 있습니다.

recoil:	Recoil은 상태를 원하는 대로 선언하고 조작할 수 있는 유연한 상태 관리 패턴을 제공 애플리케이션의 상태를 원자적인 유닛인 "atom"으로 나누어 관리할 수 있음. 이를 통해 복잡한 상태 관리 로직을 간결하고 구조적으로 관리할 수 있음

react-query:	클라이언트쪽 데이터가 아닌 서버쪽 데이터 관리를 더 원활하게 하기위해 사용

리액트쿼리 코드를 사용 시 길게 작성해야 하는 기존 코드들을 짧은 코드로 대체하여 복잡한 설정없이 사용을 용이하게 해주며, 데이터 관리 및 캐싱도 효율적으로 관리하게 해주는데 데이터 업데이트 및 지연 로딩, 메모리 관리 등 옵션들을 통해 유지보수를 편하게 해줌


Styled Components:	"Styled Components"는 컴포넌트 기반으로 스타일을 정의하므로, 각 컴포넌트에 필요한 스타일을 함께 정의하고 유지할 수 있음

스타일을 JavaScript 코드 내에서 작성하므로 변수, 조건문, 반복문 등을 활용하여 동적으로 스타일을 생성할 수 있고 컴포넌트에서 사용되는 색상, 글꼴 등의 테마 정보를 쉽게 관리할 수 있음


stomp:	메세지 전송을 효율적을 하기 위해 탄생한 프로토콜이고, 기본적으로 pub/sub 구조로 되어있어 메세지를 전송하고 메세지를 받아 처리하는 부분이 확실히 정해져 있기 때문에 개발자 입장에서 명확하게 인지하고 개발할 수 있는 이점이 있다.

WebSocket:	하나의 HTTP 접속을 통해 클라이언트와 서버의 양방향 통신 및 그로 인한 서버 부하를 줄일 수 있다. 클라이언트에서의 요청이 없더라도 통신이 가능해진다.

SSE:	WebSocket 과 SSE 모두 실시간 통신이나, 알림 기능의 경우 양방향 통신은 불필요하기 때문에 단방향 통신인 SSE 를 사용

crypto js:	FE Developer가 back-end에서 넘어온 사용자의 민감 정보를 안전하게 저장하기위해 고려 CryptoJS 와 Web Crypto API 중에 브라우저 호환성이 높은 crypto js 채택

소셜 로그인:	카카오 소셜 로그인 기능을 추가하여 사용자가 더욱 편리하게 로그인 및 서비스를 이용할 수 있게 함


Back-End
사용 기술 기술 설명

stomp:	메세지 전송을 효율적을 하기 위해 탄생한 프로토콜이고, 기본적으로 pub/sub 구조로 되어있어 메세지를 전송하고 메세지를 받아 처리하는 부분이 확실히 정해져 있기 때문에 개발자 입장에서 명확하게 인지하고 개발할 수 있는 이점이 있다.

AWS EC2:	여러 다른 AWS 서비스와의 유기적인 연동이 가능하기 때문에 채택

Redis:	임시 데이터 사용과 캐싱에 적합하여 사용자의 빈번한 엑세스가 발생하는 데이터를 Redis에 저장하여 데이터 엑세스 속도를 높임

QueryDSL:	복잡한 동적 쿼리를 쉽게 다루기 위해 채택

WebSocket:	HTTP 통신으로 대화를 주고 받는 것을 고려했으나 대화를 전송할 때마다 요청이 가야만 하고 해당 페이지가 새로고침이 된 이후에야 전송된 내용을 조회할 수 있었다.

따라서 하나의 HTTP 접속을 통해 클라이언트와 서버의 양방향 통신 및 그로 인한 서버 부하를 줄일 수 있는 Websocket 을 사용했다. 클라이언트에서의 요청이 없더라도 통신이 가능했다.


SSE:	WebSocket 과 SSE 모두 실시간 통신이나, 알림 기능의 경우 양방향 통신은 불필요하기 때문에 단방향 통신인 SSE 를 사용

Swagger:	백엔드가 구현한 API 를 문서화하여 프론트 쪽에서 이를 직관적으로 확인해 볼 수 있었다.

소셜 로그인:	카카오 소셜 로그인 기능을 추가하여 사용자가 더욱 편리하게 로그인 및 서비스를 이용할 수 있게 함

Refresh Token:	장기적으로 인증을 유지하고 accessToken을 갱신할 수 있음

이메일 인증 (SMTP):	인증으로 무분별한 사용자 접근 보안 강화

CI/CD: GitHub Actions과 Docker를 이용하여 개발과 배포를 자동화 함


💣트러블 슈팅

Access Token 재발급

문제 : 엑세스 토큰이 만료되어 인터셉터를 이용하여 서버에서 새로운 토큰을 발급 받았을때 기존의 토큰을 갈아 끼우는 것으로 코드를 짜두었으나 인터셉터를 거치치 않는 sse나 WebSocket 에서 토큰을 갈아끼우지 못하는 문제 발생

해결과정:

시도 1 : sse.current.onerror를 이용하여 에러를 케치한 후 에러와 같이 오는 새로운 토큰을 받으려 하였으나 sse의 에러에는 새로운 토큰 값을 받아오지 못하여 실패

시도 2 :토큰이 만료 되었을때 새로운 토큰을 요청하는 Api를 만들어 토큰 만료 에러가 발생했을때 토큰을 요청 하도록 하여 해결


Refresh Token 서버 통신 개선 및 암호화

문제 : 토큰을 필요로 하는 통신마다 Access Token 과 Refresh Token 둘다 헤더에 담아 통신하였으나 비효율 적이고 토큰 탈취 위험성이 높다고 판단

해결과정: 토큰을 필요로 하는 통신마다 Access Token만 서버에 보내고, Access Token이 만료되었을 시에 Refresh Token을 보내 두개 의 토큰 모두 재발급하는 것으로 변경 추가로 Refresh Token은 crypto js를 이용하여 암호화후 쿠키에 보관하여 보안을 강화함


SSE

문제 : 다른 유저와 소통을 위해 알림기능을 구현 하고자 했을때 기존의 HTTP 방식으로는 알림이 없을때에도 서버에 지속적인 요청으로 인해 많은 유저가 몰린다면 서버에 부담이 된다는 것을 알게 되었습니다.

해결 : Server Sent Events 라는 기술을 통해 한번 서버와 연결이 되면 클라이언트쪽에서 지속적인 요청을 하지 않아도 실시간으로 데이터를 받아 올 수 있도록 하였습니다.


Redis

트러블 상황

채팅 기록을 Redis 에 저장하고 조회를 할 때 com.fasterxml.jackson.databind.exc.MismatchedInputException: Cannot deserialize value of type java.lang.String from Object value (token JsonToken.START_OBJECT) 에러가 발생했다.

원인 및 해결 방법

조회에 문제가 있다고 생각하고 접근했지만, 조회가 아닌 저장 방식에 문제가 있었다. redisTemplateMessage.setValueSerializer(new Jackson2JsonRedisSerializer<>(Message.class)); Jackson 라이브러리를 사용하여 객체를 JSON 형식으로 직렬화 및 역직렬화하는 방법으로 이를 해결 할 수 있었다.


Docker

문제 : redis와 연결이 되지 않음

해결과정:

시도 1 : 이전에 jar 파일로 redis와 연결한 것 처럼 ec2에 설치한 redis와 연결을 시도하였으나 실패 함 시도 2 : docker에 redis image를 다운로드 받아서 연결을 시도하였으나 실패 함

시도 3 : docker 컨테이너끼리의 연결이 필요해서 network를 생성하여 배포하려는 image와 redis image를 같은 network로 연결하여 성공 함

해결 : docker에서는 redis와 포트 연결도 필요하지만, 다른 컨테이너끼리의 연결도 필요해서 network 설정도 해야 함

유저 피드백

운영체제마다 다르게 나타나는 UI

문제 : 프론트 엔드측은 모두 맥OS를 사용하여 디자인 구성을 하였으나 윈도우 운영체제에서는 다르게 표현이 되는 문제 발생

해결과정: 윈도우 운영체제의 컴퓨터로 접속하여 다르게 나타나는 부분 수정하여 해결


🔎주요기능

✅ 원하는 위치의 여행지를 검색해 다른 사람들의 게시글을 둘러볼 수 있어요!

✅ 검색한 여행지는 지도 화면으로 위치를 한눈에 확인할 수 있어요!

✅ 맞춤형 여행 검색으로 내가 함께 하고 싶은 여행지를 찾아보세요!

✅ 그동안 작성한 글과 스크랩한 게시물을  한눈에 확인할 수 있어요!

✅ 채팅 기능을 통해 약속 잡기 및 대화가 가능 합니다.

✅ 실시간 알림을 통해 빠르게 확인이 가능합니다.


👩‍👩‍👦‍👦 팀원 소개

디자이너 	송지은	 

FE / React,리더	백태준	https://github.com/Baek-Taejun	https://velog.io/@taejun-baek 

BE / Spring,부리더	장승연	https://github.com/wkdtmddus	https://velog.io/@wkdtmddus

FE / React	이남규	https://github.com/tph7897	https://skarbcoding.tistory.com/ 

FE / React	이상준	https://github.com/Sangjun-L	 

BE / Spring	박영준	https://github.com/baekgomsuyeom	https://velog.io/@baekgom 

BE / Spring	김나영	https://github.com/NayoungKim1212	https://velog.io/@kkd04250

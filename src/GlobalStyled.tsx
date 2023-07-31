import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*{
font-size: 14px;
outline: none;
box-sizing: border-box;
margin: 0;
padding: 0;

}

body {
    -webkit-font-smoothing: antialiased;
    letter-spacing: -.4p;
    letter-spacing: -.4px;
    color: rgb (29, 29, 31);
    background-color: white;
    margin: 0;

}

p{
line-height:1.6;
}


`;

export default GlobalStyle;

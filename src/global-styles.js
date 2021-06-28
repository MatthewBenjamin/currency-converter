// globalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    @media screen and (min-width: 420px) {
      margin: 0;
      padding: 0;
    }
    font-family: "proxima-nova, 'Helvetica Neue', Helvetica, Arial, sans-serif";
  }
`;

export default GlobalStyle;

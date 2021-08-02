import { css } from 'styled-components/macro'

const fonts = css`
  @font-face {
    font-family: 'Circular Std';
    src: url('../fonts/Circular/CircularStd-Book.woff2') format('woff2'),
    url('../fonts/Circular/CircularStd-Book.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Circular Std';
    src: url('../fonts/Circular/CircularStd-Bold.woff2') format('woff2'),
    url('../fonts/Circular/CircularStd-Bold.woff') format('woff');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'Circular Std';
    src: url('../fonts/Circular/CircularStd-Black.woff2') format('woff2'),
    url('../fonts/Circular/CircularStd-Black.woff') format('woff');
    font-weight: 900;
    font-style: normal;
  }
`;

export default fonts;
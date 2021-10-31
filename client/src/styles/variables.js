import { css } from 'styled-components/macro'

const variables = css`
  :root {

    /* Dark Theme */
    --site-background-color: #FFFFFF;
    --button-background: #1dd860;
    --green: #1db954;
    --green-light: #1ed760;
    --green-focus: #1da64d;
    --green-dark: #14833b;
    --white: #fff;
    --red: #cd1a2b;
    --black: #121212;
    --near-black: #181818;
    --dark-grey: #282828;
    --grey: #535353;
    --light-grey: #b3b3b3;
    --white: #FFFFFF;

    /* Light Theme */
    /* Later.. */

    --font: ${process.env.REACT_APP_USE_CIRCULAR_FONTS ? `"Circular Std", ` : ``} -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;

    --body-line-height: 1rem;

    --font-size-xxs: 12px;
    --font-size-xs: 13px;
    --font-size-sm: 14px;
    --font-size-md: 16px;
    --font-size-lg: 18px;
    --font-size-xl: 20px;
    --font-size-xxl: 24px;

    --spacing-xxs: 4px;
    --spacing-xs: 8px;
    --spacing-sm: 12px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
    --spacing-xxl: 64px;

    --border-radius-subtle: 4px;
    --border-radius-pill: 30px;

    --site-max-width: 1300px;

  }
`;

export default variables;
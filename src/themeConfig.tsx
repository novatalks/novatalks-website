import { Variants } from 'framer-motion';
import { createGlobalStyle } from 'styled-components';

const variants: Variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

const defaultTheme = {
  buttonHeight: '50px',
  buttonWidth: '170px',
  buttonSpacing: '15px',
  defaultBorder: '3px',
  defaultBorderLight: '2px',
  headerHeight: '85px',
  switchHeight: '40px',
  switchLabelWidth: '100px',
  speakerDivHeight: '70px',
  memberDivHeight: '98px',
  companyDivHeight: '250px',
  eventDivHeight: '200px',
  eventCardSectionWidth: '86vw',
  eventCardWidth: '43vw',
  transitionSpeed: '0.25s',
  variants,
};

export const lightTheme = {
  ...defaultTheme,
  body: '#FFF',
  text: '#363537',
  textWeaker: '#6d6d6d',
  toggleBorder: '#FFF',
  background: '#363537',
  highlight: '#ff57b2',
  title: '#f8f8f8',
  colorInfo: '#bbbbbb',
  switchBackground: '#8FB5F5',
  isDarkMode: false,
};

export const darkTheme = {
  ...defaultTheme,
  body: '#252525',
  text: '#FAFAFA',
  textWeaker: '#AAA',
  toggleBorder: '#6B8096',
  background: '#999',
  highlight: '#ff57b2',
  title: '#f8f8f8',
  colorInfo: '#bbbbbb',
  switchBackground: '#000',
  isDarkMode: true,
};

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html, body {
    min-height: 100%;
  }
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font: 400 1.125rem 'Open Sans', Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }
  body,
  input,
  textarea,
  select,
  button {
    font: 400 1.125rem 'Raleway', sans-serif;
  }

  p {
    font: 400 1.125rem 'Open Sans', sans-serif;
  }

  h1,h2,h3,h4,h5,h6 {
    font-family: 'Raleway', Arial, Roboto, sans-serif;
  }
  
  h1{
    font-weight: 300;
    font-size: 3rem;
    padding: 20px 0 10px 0;
  }

  h2{
    font-weight: 300;
    font-size: 2rem;
    padding: 30px 0 20px 0;
  }

  h3{
    font-weight: 300;
    font-size: 1.7rem;
  }

  button, a {
    cursor: pointer;
  }

  .container {
    max-width: 1120px;
    margin: 0 auto;
    padding: 0 2rem;
  
    button {
      background-color: transparent;
      border: 0;
  
      font-weight: 600;
      color: ${({ theme }) => theme.highlight};
  
      margin-top: 4rem;
      transition: filter 0.2s ease;
  
      &:hover {
        filter: brightness(0.9);
      }
    }
  }

  .previewExit {
    padding: 0.5rem;
    text-align: center;
    background: ${({ theme }) => theme.title};
    color: ${({ theme }) => theme.text};
    border-radius: 8px;
    font-weight: bold;
    margin: 4rem 0 2rem;
  
    a {
      display: block;
      width: 100%;
      padding: 1.125rem 0;
      font-size: 1.125rem;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  @media (max-width: 1080px) {
    html {
      font-size: 93.75%;
    }
  }

  @media (max-width: 720px) {
    html {
      font-size: 87.5%;
    }
  }
`;

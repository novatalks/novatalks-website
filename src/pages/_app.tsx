import { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import useDarkMode from 'use-dark-mode';
import { AnimatePresence } from 'framer-motion';
import { lightTheme, darkTheme, GlobalStyles } from '../themeConfig';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  // use-dark-mode, toggle dark mode state
  const darkMode = useDarkMode(true);
  const theme = darkMode.value ? darkTheme : lightTheme;

  // save isMounted state to enable prefers-color-scheme
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []); // will only trigger once

  // pass custom prop https://stackoverflow.com/questions/61471079/in-nextjs-is-it-possible-to-have-custom-app-js-read-a-slug-getinitialprops-and
  const modifiedPageProps = { ...pageProps, darkMode };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AnimatePresence exitBeforeEnter>
        {isMounted && <Component {...modifiedPageProps} />}{' '}
      </AnimatePresence>
      {/* Remove isMounted if load too slow, shouldn't be a problem */}
    </ThemeProvider>
  );
}

export default MyApp;

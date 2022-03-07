import Header from '../components/Header';
import '../styles/globals.css';
import { ThemeProvider } from '@emotion/react';
import NProgress from 'nprogress';
import theme from '../components/Theme';
import { Fetcher } from './api/fetch';
import Router from 'next/router';
import { useState } from 'react';
import Loader from '../components/Loader';
import ContextWrapper from '../components/ContextWrapper';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps, nav }) {
  const [loading, setLoading] = useState(false);
  Router.events.on('routeChangeStart', (url) => {
    setLoading(true);
    NProgress.start();
  });
  Router.events.on('routeChangeComplete', (url) => {
    setLoading(false);
    NProgress.done();
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        {loading && <Loader />}
        <ContextWrapper nav={nav?.data}>
          <Header isDark />
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </ContextWrapper>
      </ThemeProvider>
    </>
  );
}

/**
 * получаем данные для всех компонентов, отключает
 * автоматическую статическую оптимизацию
 */

// MyApp.getInitialProps = async () => {
//   const nav = await Fetcher('navigations');

//   return { nav };
// };

export default MyApp;

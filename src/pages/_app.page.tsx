import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from '@/hooks/auth';
import { useApollo } from '@/lib/apollo';
import { ConfigProvider } from 'antd';

const AppHead = () => {
  return (
    <Head>
      <title>Frontend Template</title>
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,viewport-fit=cover"
      />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="apple-mobile-web-app-capable" content="yes"></meta>
    </Head>
  );
};

export default function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={client}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#00b96b',
          },
        }}
      >
        <AppHead />
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ConfigProvider>
    </ApolloProvider>
  );
}

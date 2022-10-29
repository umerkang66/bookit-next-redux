import '../styles/styles.css';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { Provider } from 'react-redux';

import Layout from '../components/layout/layout';
import { wrapper } from '../state/store';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCurrentUserAction } from '../state/action-creators';
import { Action as DefaultAction } from 'redux';
import { Fragment } from 'react';

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Fragment>
      <NextNProgress
        height={3}
        color="#E61E4D"
        options={{ showSpinner: false }}
      />

      <Provider store={store}>
        <Layout>
          <Component {...props.pageProps} />
          <ToastContainer position="bottom-right" />
        </Layout>
      </Provider>
    </Fragment>
  );
}

// @ts-ignore
MyApp.getInitialProps = wrapper.getInitialAppProps(store => {
  return async appContext => {
    await store.dispatch(
      getCurrentUserAction(appContext.ctx.req) as unknown as DefaultAction
    );
  };
});

export default MyApp;

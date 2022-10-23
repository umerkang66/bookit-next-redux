import '../styles/styles.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout/layout';
import { wrapper } from '../state/store';
import { Provider } from 'react-redux';

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...props.pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;

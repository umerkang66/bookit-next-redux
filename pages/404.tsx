import { NextPage } from 'next';
import Head from 'next/head';
import NotFound from '../components/layout/not-found';

const NotFoundPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>404 - Page not found - BookIt</title>
      </Head>
      <NotFound />
    </div>
  );
};

export default NotFoundPage;

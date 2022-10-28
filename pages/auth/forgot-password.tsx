import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import ForgotPassword from '../../components/auth/forgot-password';

const ForgotPasswordPage = () => {
  return (
    <div>
      <Head>
        <title>Forgot Password - BookIt</title>
      </Head>
      <ForgotPassword />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession({ req: context.req });
  if (session) {
    return {
      props: {},
      redirect: { destination: '/' },
    };
  }

  return {
    props: {},
  };
};

export default ForgotPasswordPage;

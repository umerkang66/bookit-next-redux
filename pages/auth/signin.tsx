import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Signin from '../../components/auth/signin';

const SigninPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Login - BookIt</title>
      </Head>
      <Signin />
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

export default SigninPage;

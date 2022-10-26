import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Signup from '../../components/auth/signup';

const SignupPage = () => {
  return (
    <div>
      <Head>
        <title>Signup - BookIt</title>
      </Head>
      <Signup />
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

export default SignupPage;

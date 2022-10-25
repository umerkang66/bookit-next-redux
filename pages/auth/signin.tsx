import { NextPage } from 'next';
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

export default SigninPage;

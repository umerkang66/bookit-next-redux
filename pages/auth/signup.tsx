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

export default SignupPage;

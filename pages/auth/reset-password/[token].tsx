import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import { getSession } from 'next-auth/react';
import ResetPassword from '../../../components/auth/reset-password';

const ResetPasswordPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ token }) => {
  return <ResetPassword token={token} />;
};

export const getServerSideProps: GetServerSideProps<{
  token: string | undefined;
}> = async context => {
  const session = await getSession({ req: context.req });
  if (session) {
    return {
      props: { token: '' },
      redirect: { destination: '/' },
    };
  }

  const token = context.params?.token as string;
  return {
    props: { token },
  };
};

export default ResetPasswordPage;

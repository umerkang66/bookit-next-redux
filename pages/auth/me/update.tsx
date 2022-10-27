import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import UpdateUser from '../../../components/auth/update-user';

const UpdateProfilePage = () => {
  return (
    <div>
      <UpdateUser />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      props: {},
      redirect: { destination: '/auth/signin' },
    };
  }

  return {
    props: { session },
  };
};

export default UpdateProfilePage;

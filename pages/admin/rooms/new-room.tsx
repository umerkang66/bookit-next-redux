import { getSession } from 'next-auth/react';
import { wrapper } from '../../../state/store';
import NewRoom from '../../../components/admin/new-room';
import Head from 'next/head';

const NewRoomPage = () => {
  return (
    <div>
      <Head>
        <title>New Room - BookIt</title>
      </Head>
      <NewRoom />
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  store => async context => {
    const session = await getSession({ req: context.req });
    if (!session) {
      return {
        props: {},
        redirect: { destination: '/auth/signin' },
      };
    }

    // just for the sake of typescript error
    return { props: {} };
  }
);

export default NewRoomPage;

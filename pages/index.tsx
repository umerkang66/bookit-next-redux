import type { NextPage } from 'next';
import Home from '../components/home';
import { wrapper } from '../state/store';
import { actionCreators } from '../state';

const HomePage: NextPage = () => {
  return (
    <div>
      <Home />
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(store => {
  return async context => {
    // @ts-ignore
    await store.dispatch(actionCreators.getAllRooms(context.req));
    // just for the sake of typescript error
    return { props: {} };
  };
});

export default HomePage;

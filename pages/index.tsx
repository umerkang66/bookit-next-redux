import type { NextPage } from 'next';
import Home from '../components/home';
import { wrapper } from '../state/store';
import { actionCreators } from '../state';
import { Action as DefaultAction } from 'redux';

const HomePage: NextPage = () => {
  return (
    <div>
      <Home />
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(store => {
  return async context => {
    const page = parseInt((context.query.page as string) || '1');
    // if it is undefined enter the empty string
    const search = (context.query.search || '') as string;
    const guestCapacity = (context.query.guestCapacity || '') as string;
    const category = (context.query.category || '') as string;

    const action = actionCreators.getAllRooms(
      context.req,
      page,
      search,
      guestCapacity,
      category
    );
    await store.dispatch(action as unknown as DefaultAction);

    // just for the sake of typescript error
    return { props: {} };
  };
});

export default HomePage;

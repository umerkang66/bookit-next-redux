import type { NextPage } from 'next';
import Head from 'next/head';
import Search from '../components/search';

const SearchPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Search Rooms</title>
      </Head>
      <Search />
    </div>
  );
};

export default SearchPage;

import { FC, ReactNode } from 'react';
import Head from 'next/head';

import Header from './header';
import Footer from './footer';

interface LayoutProps {
  children?: ReactNode;
  title?: string;
}

const Layout: FC<LayoutProps> = ({ children, title = 'Book Best Hotel' }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>

      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;

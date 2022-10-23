import { FC, ReactNode } from 'react';
import Head from 'next/head';

import Header from './header';
import Footer from './footer';

interface LayoutProps {
  children?: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const defaultTitle = 'BookIt - Book Best Hotels';

  return (
    <div>
      <Head>
        <title>{defaultTitle}</title>
      </Head>

      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;

import Link from 'next/link';
import React from 'react';

const NotFound = () => {
  return (
    <div className="page-not-found-wrapper">
      <h1 id="title_404">404!</h1>
      <h1 id="description_404">
        Page not found. Go to <Link href="/">Home</Link>
      </h1>
    </div>
  );
};

export default NotFound;

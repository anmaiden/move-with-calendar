import React, { ReactNode } from 'react';
import Navbar from '../../components/Navbar/Navbar';

interface AppLayoutProps {
  children?: ReactNode;
}

const AppLayout = (props: AppLayoutProps) => {
  return (
    <>
      <Navbar />
      <main>{props.children}</main>
    </>
  );
};

export default AppLayout;

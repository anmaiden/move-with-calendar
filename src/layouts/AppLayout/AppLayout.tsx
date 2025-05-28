import React, { ReactNode } from 'react';
import './AppLayout.scss';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import { cn } from '@bem-react/classname';
import ProfileDashboard from '../../components/ProfileDashboard/ProfileDashboard';

const cnAppLayout = cn('AppLayout');

interface AppLayoutProps {
  children?: ReactNode;
}

const AppLayout = (props: AppLayoutProps) => {
  return (
    <div className={cnAppLayout()}>
      <Navbar />
      <main className={cnAppLayout('Main')}>{props.children}</main>
      <Footer />
    </div>
  );
};

export default AppLayout;

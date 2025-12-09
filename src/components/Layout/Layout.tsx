import { type ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CustomCursor, GrainOverlay } from '../shared';
import styles from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <CustomCursor />
      <GrainOverlay />
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}

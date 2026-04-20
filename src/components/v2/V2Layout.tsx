import { useEffect, type ReactNode } from 'react';
import { CustomCursor, Grain } from './Primitives';
import { V2Header } from './Header';
import { V2Footer } from './Footer';

interface V2LayoutProps {
  children: ReactNode;
}

export function V2Layout({ children }: V2LayoutProps) {
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-accent', 'gold');
    root.setAttribute('data-density', 'regular');
    root.setAttribute('data-motion', 'full');
    root.setAttribute('data-cursor', 'on');
    root.setAttribute('data-grain', 'on');
  }, []);

  return (
    <>
      <Grain />
      <CustomCursor />
      <V2Header />
      <main>{children}</main>
      <V2Footer />
    </>
  );
}

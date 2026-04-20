import { type ReactNode } from 'react';
import { V2Layout } from '../v2';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return <V2Layout>{children}</V2Layout>;
}

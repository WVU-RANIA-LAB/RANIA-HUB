import { ReactNode } from 'react';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import Navbar from '@/app/ui/navbar';

type DashboardLayoutProps = { children: ReactNode };

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await auth();

  if (!session?.user) {
    redirect('/redirect');
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar role={session.user.role} />
      {children}
    </div>
  );
}

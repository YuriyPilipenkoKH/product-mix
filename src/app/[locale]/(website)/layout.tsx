import { redirect } from 'next/navigation';
import { Session } from 'next-auth';
import React from 'react';
import { auth } from '../../../auth';
import Image from 'next/image';
import Link from 'next/link';
import { navLinks } from '@/data/links';
import {LogoutButton} from '@/components/Button/logout-button';
import { GiOrangeSlice } from "react-icons/gi";
import LocaleSwitcher from '@/components/Button/LocaleSwitcher';
import ThemeChanger from '@/components/Button/ThemeChanger';
import SearchBar from '@/components/forms/SearchBar';

interface Props {
  children: React.ReactElement<{ session: Session }>; // Specify that children accepts session
}

 async function Layout({ children }: Props) {
  const session = await auth();

   if (!session) redirect('/login'); 
   const activeLink = '/dashboard';
  return (
    <div className="flex min-h-screen w-full">
    <div className="hidden w-80 border-r lg:block">
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4">
          <Link className="flex items-center gap-2 font-semibold text-[var(--text-color)] hover:text-[var(--yellow)] cursor-pointer" href="/">
            <GiOrangeSlice className="h-6 w-6" />
            <span className="">Product Mix</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start gap-2 px-4 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                className={`${
                  activeLink === link.href
                    ? 'bg-gray-400 text-gray-900 hover:text-purple-600'
                    : ''
                } flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-yellow-400`}
                href={link.href}
                key={link.title}
              >
                <span>{link.title}</span>
                {link.badge > 0 && (
                  <div className="badge badge-primary ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    {link.badge}
                  </div>
                )}
              </Link>
            ))}
          </nav>
        </div>
        <div className="border-t py-4 px-1">
          <LogoutButton username={session?.user?.name || 'Dude'} />
        </div>
      </div>
    </div>
    <div className="flex w-full flex-col">
      <header className="flex h-14 items-center border-b px-4 md:gap-4">
        <Link
          className="flex items-center rounded-md bg-gray-100 px-2 py-2 lg:hidden"
          href="#"
        >
          <GiOrangeSlice className="h-6 w-6" />
          <span className="sr-only">Home</span>
        </Link>
        <h1 className="md:blobk hidden text-lg font-semibold">Dashboard</h1>
        <div className="ml-auto flex items-center gap-4">
          <ThemeChanger/>
          <LocaleSwitcher  />
          <SearchBar />
          <button className="btn btn-primary rounded-full">
            <Image
              alt="Avatar"
              className="rounded-full"
              height="32"
              src={session?.user?.image || '/placeholder.svg'}
              style={{
                aspectRatio: '24/32',
                objectFit: 'cover',
              }}
              width="32"
            />
            <span className="sr-only">View profile</span>
          </button>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">{children}</main>
    </div>
  </div>
  );
}
export default Layout;

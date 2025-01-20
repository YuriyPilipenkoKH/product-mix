import {createNavigation} from 'next-intl/navigation';
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'de', 'ua'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/login': '/login',
    '/register': '/register',
    '/dashboard': '/dashboard',
    '/admin': '/admin',
  }
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const {Link, getPathname, redirect, usePathname, useRouter} =
  createNavigation(routing);
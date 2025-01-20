import {clsx} from 'clsx';
import {Inter} from 'next/font/google';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {ReactNode} from 'react';
import Navigation from './Navigation';
import { Toaster } from 'react-hot-toast';
import { options } from '@/lib/hotToast';


const inter = Inter({subsets: ['latin']});

type Props = {
  children: ReactNode;
  locale: string;
};

export default async function BaseLayout({children, locale}: Props) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html className="h-full" lang={locale} suppressHydrationWarning>
      <body className={clsx(inter.className, 'flex h-full flex-col')}>
        <NextIntlClientProvider messages={messages}>

          {children}
          <Toaster 
          position="top-center" 
          toastOptions={options} 
          gutter={24} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
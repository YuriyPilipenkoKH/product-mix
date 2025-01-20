import {notFound} from 'next/navigation';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {ReactNode} from 'react';
import BaseLayout from '@/components/BaseLayout';
import {Locale, routing} from '@/i18n/routing';
import { Metadata } from 'next';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } =await params; // Safely access locale after resolving params

  // Fetch translations for the current locale and namespace
  const t = await getTranslations({ locale, namespace: 'LocaleLayout' });

  // Use the translations to generate dynamic metadata
  return {
    title: t('title'),
   };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return(
    <BaseLayout locale={locale}>
    {children}
    </BaseLayout>
  ) 
}
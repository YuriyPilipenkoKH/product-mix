;
import {getTranslations, setRequestLocale} from 'next-intl/server';
import PageLayout from '@/components/PageLayout';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function IndexPage({params}: Props) {
  const { locale } = await params;
  // Enable static rendering
  setRequestLocale(locale);

  // const t = useTranslations('IndexPage');
  const t =  await getTranslations({locale, namespace: 'IndexPage'});
  return (
    <PageLayout title={t('title')}>
      <p className="max-w-[590px]">
        {t.rich('description', {
          code: (chunks) => (
            <code className="font-mono text-white">{chunks}</code>
          )
        })}
      </p>
    </PageLayout>
  );
}
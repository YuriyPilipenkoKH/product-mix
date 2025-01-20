// import {useTranslations} from 'next-intl';
import NavigationLink from './NavigationLink';
import LocaleSwitcher from './LocaleSwitcher';
import { getTranslations } from 'next-intl/server';
import { auth } from '@/auth';

type Props = {
  locale: string;
};


export default async function Navigation({locale}: Props) {
  
  const session = await auth();
  // const t = useTranslations('Navigation');
  const t = await getTranslations({ locale, namespace: 'Navigation' });

  return (
    <div className='bg-transparent  w-full' >
     
      <nav className="container flex justify-between p-2 text-slate-300 bg-transparent">
        <div>
          <NavigationLink href="/">{t('home')}</NavigationLink>
          {!session && <NavigationLink href="/login">{t('pathnames')}</NavigationLink>}
        </div>
        <LocaleSwitcher  />
      </nav>
 
    </div>
  );
}
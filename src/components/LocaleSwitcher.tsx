'use client';
import {useLocale, useTranslations} from 'next-intl';
import {Locale, routing, usePathname, useRouter} from '@/i18n/routing';
import { MouseEvent, useState, useTransition } from 'react';
import { useParams} from 'next/navigation';
import { IoIosArrowDown } from 'react-icons/io';


export default function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false)
  const t = useTranslations('LocaleSwitcher');
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();
  console.log('params', params, 'pathname', pathname, 'locale', locale);

  const click =(e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const newLocale = target.id as Locale;
    console.log(newLocale);
    startTransition(() => {
      router.replace({pathname,},  {locale: newLocale});  // Only change the locale
      setOpen(false);
    });
  }

  

  return (
    <div   
      className="Mselect relative  inline-flex items-center bg-transparent  py-3 pl-2 pr-8  gap-1"
      >
        <span>{locale}</span>
      <div className='flex flex-col gap-2 absolute right-8 top-10 bg-transparent z-index-5'>
        {open &&  routing.locales.map((cur) => (
          <button
          key={cur}
          id={cur}
          className='bg-transparent text-[var(--text-color)] hover:text-[var(--purple)] cursor-pointer'
          onClick={click}>
            {t('locale', {locale: cur})}
          </button>
        ))}
      </div>
      <button 
      className=" absolute right-2 top-4 " 
      onClick={()=>setOpen(!open)}>
        <IoIosArrowDown className=''/>
      </button>
    </div>
  );
}
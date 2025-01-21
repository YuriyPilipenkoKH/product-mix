'use client';
import {useLocale, useTranslations} from 'next-intl';
import {Locale, routing, usePathname, useRouter} from '@/i18n/routing';
import { MouseEvent, useState, useTransition } from 'react';
// import { useParams} from 'next/navigation';
import { IoIosArrowDown } from 'react-icons/io';
import clsx from 'clsx';


export default function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState<boolean>(false)
  const t = useTranslations('LocaleSwitcher');
  const router = useRouter();
  const pathname = usePathname();
  // const params = useParams();
  const locale = useLocale();


  const click =(e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const newLocale = target.id as Locale;
    console.log(newLocale);
    startTransition(() => {
      router.replace({pathname, },  {locale: newLocale});  // Only change the locale
      setOpen(false);
    });
  }


  return (
    <div   
      className={clsx(
        'Mselect relative  inline-flex items-center bg-transparent  py-3 pl-2 pr-8  gap-1 ',
        isPending && 'transition-opacity [&:disabled]:opacity-30'
      )}
      >
        <span className='text-[var(--text-color)]'>{locale}</span>
      <div 
      className={clsx('flex flex-col gap-2 absolute left-0  top-10 bg-transparent   z-index-5 ',
        open ? 'p-2' : 'p-0'
      )}
      >
        {open &&  routing.locales.map((cur) => (
          <button
          key={cur}
          id={cur}
          className='bg-transparent text-[var(--text-color)] hover:text-[var(--purple)] cursor-pointer w-12 flex items-start'
          onClick={click}>
            {t('locale', {locale: cur})}
          </button>
        ))}
      </div>
      <button 
      className=" absolute right-2 top-4 " 
      onClick={()=>setOpen(!open)}>
        <IoIosArrowDown className='fill-[var(--text-color)]'/>
      </button>
    </div>
  );
}
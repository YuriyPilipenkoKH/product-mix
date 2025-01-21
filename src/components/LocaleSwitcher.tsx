'use client';
import {useLocale, useTranslations} from 'next-intl';
import {routing} from '@/i18n/routing';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';
import { MouseEvent } from 'react';


export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  const click =(e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    console.log(target.id);
  }

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t('current')} >
      {routing.locales.map((cur) => (
        <button 
        key={cur} 
        id={cur} 
        className='bg-transparent text-[var(--text-color)] hover:text-[var(--text-color-hover)]'
        onClick={click}>
          {t('locale', {locale: cur})}
        </button>
      ))}
    </LocaleSwitcherSelect>
  );
}
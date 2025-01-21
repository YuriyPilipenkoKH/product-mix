'use client';

import clsx from 'clsx';
import {useParams} from 'next/navigation';
import { MouseEventHandler, ReactNode, useState, useTransition, } from 'react';
import {Locale, usePathname, useRouter} from '@/i18n/routing';
import { IoIosArrowDown } from "react-icons/io";

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
label,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selcted, setSelcted] = useState<Locale>('en')
  const [open, setOpen] = useState(false)
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: MouseEventHandler<HTMLButtonElement>) {
    // const nextLocale = event.target.value as Locale;
   
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        {pathname, params},
        {locale: selcted}
      );
    });
  }


  return (
    <label
      className={clsx(
        'relative text-gray-400 ml-auto flex items-center gap-1' ,
        isPending && 'transition-opacity [&:disabled]:opacity-30'
      )}
    >{label}
      {/* <p className="sr-only">{label}</p> */}
      <div
        className="Mselect  inline-flex  bg-transparent mt-5 py-3 pl-2 pr-6 outline-none"
        // defaultValue={defaultValue}
        // disabled={isPending}
        onClick={()=>setOpen(!open)}
      >
        <div className='absolute right-9 top-10 flex flex-col gap-[2px]'>
          {open && children}
        </div>
      </div>
      {/* <div className='flex items-center justify-center gap-2'> */}
        <button 
        className=" absolute right-2 top-[8px] " 
        onClick={()=>setOpen(!open)}>
          <IoIosArrowDown className='mt-2'/>
        </button>
        {/* </div> */}
    </label>
  );
}
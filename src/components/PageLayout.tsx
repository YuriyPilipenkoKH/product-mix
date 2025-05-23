import {useTranslations} from 'next-intl';
import {ReactNode} from 'react';


type Props = {
  children?: ReactNode;
  title: ReactNode;
};

export default function PageLayout({children, title}: Props) {
  const t = useTranslations('PageLayout');

  return (
    <div className="relative flex grow flex-col  bg-slate-850 py-36 text-[var(--text-color)]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="custom-gradient" />
      </div>
      <div className="container relative flex grow flex-col items-center px-4">
        <h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
          {title}
        </h1>
        <div className="mt-6  md:text-lg">{children}</div>
      </div>
    </div>
  );
}

// custom-gradient :absolute left-0 top-1 size-[20500px] translate-x-[-47.5%] rounded-full bg-gradient-to-b from-slate-900 via-cyan-500"
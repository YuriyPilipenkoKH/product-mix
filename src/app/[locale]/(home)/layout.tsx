import Navigation from "@/components/Navigation";
import React from "react";


interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <div
     className="flex flex-col items-center justify-center min-h-screen"
     >
      <Navigation locale={locale }/>
      {children}
    </div>
  )
}

export default Layout;
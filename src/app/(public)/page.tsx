import ThemeChanger from "@/components/Button/ThemeChanger";
import Header from "@/components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container grid items-center gap-4 px-4 text-center md:px-6 lg:gap-10">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Welcome to Product Mix
        </h1>
        <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
        Modern web application that leverages server actions to securely handle product management directly on the server side. This app allows users to store, organize, and manage different products in a database using intuitive CRUD operations
        </p>
      </div>
      <div className="flex flex-col justify-center gap-2 min-[400px]:flex-row">
        <Link
          className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
          href="/register"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}

// The Product Mix app is a modern web application that leverages server actions to securely handle product management directly on the server side. This app allows users to store, organize, and manage different products in a database using intuitive CRUD operations.
// </p>
"use client";

import Link from "next/link";

export default function ErrorBoundary({ error }) {
  return (
    <main className="flex justify-center items-center flex-col gap-6 h-[70vh]">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>
      <Link
        href={"/"}
        replace={true}
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
      >
        Try Again
      </Link>
    </main>
  );
}

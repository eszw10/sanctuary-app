import Link from "next/link";

function NotFound() {
  return (
    <main className="text-center space-y-6 mt-4 flex flex-col justify-center items-center h-[70vh]">
      <h1 className="text-3xl font-semibold">
        This cabin could not be found :(
      </h1>
      <Link
        href="/cabins"
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
      >
        Go back to cabins
      </Link>
    </main>
  );
}

export default NotFound;

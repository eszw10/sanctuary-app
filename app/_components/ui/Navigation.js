import Link from "next/link";
import { auth } from "../../_lib/auth";

export default async function Navigation() {
  const session = await auth(); //using this auth would make this component dynamic
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>

        {session?.user ? (
          <li className="flex items-center gap-4">
            <img
              src={session.user?.image}
              alt={session.user?.name}
              referrerPolicy="no-referrer"
              className="h-8 rounded-full"
            />
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              {session.user?.name}
            </Link>
          </li>
        ) : (
          <li>
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

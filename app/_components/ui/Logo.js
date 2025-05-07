import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10 ">
      {/* <Image src="/logo.png" height="60" width="60" alt="Sanctuary logo" /> */}
      <Image
        src={logo}
        height="60"
        width="60"
        alt=" logo"
        quality={100}
        className="bg-accent-300 rounded-full w-fit"
      />
      <span className="text-xl font-semibold text-primary-100 tracking-widest uppercase">
        Sanctuary
      </span>
    </Link>
  );
}

export default Logo;

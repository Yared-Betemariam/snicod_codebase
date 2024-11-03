import Image from "next/image";
import Link from "next/link";

const Logo = ({ mobile }: { mobile?: boolean }) => {
  if (mobile) {
    return (
      <Image
        src={"/logo_full.png"}
        alt="snicod-site"
        width={200}
        height={200}
        className="w-28"
      />
    );
  }
  return (
    <Link href="/" className="flex h-fit gap-2 items-center">
      <Image
        src={"/logo_full.png"}
        alt="snicod-site"
        width={300}
        height={300}
        className="w-32 md:w-36"
      />
    </Link>
  );
};
export default Logo;

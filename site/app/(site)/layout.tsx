import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { CreditCard, PartyPopper } from "lucide-react";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <span className="h-[2.25rem] bg-zinc-200 text-zinc-900 flex items-center text-sm justify-center w-full">
        <span className="text-lg mr-2">&#127881;</span>7 Days free trial
        available{" "}
        <Link
          href={"/download"}
          className="text-primary brigtness-75 underline mx-1.5"
        >
          download it now
        </Link>{" "}
        for Windows and MacOs. No credit card required.
      </span>
      <Nav />
      {children}
      <Footer />
    </>
  );
}

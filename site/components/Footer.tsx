/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";
import Logo from "./Logo";
import { Button } from "./ui/button";
import { navigationLinks } from "./Nav";

const Footer = () => {
  const date = new Date();
  return (
    <footer className="bg-zinc-50 border-t py-6 shadow-md">
      <section className="wrapper flex-col items-center justify-center md:flex-row flex py-12 md:items-start md:justify-between text-center md:text-start gap-12">
        <div className="flex flex-col items-center md:items-start gap-5">
          <Logo />
          <span className=" max-w-[18rem]">
            Save time by using Snicod to write code only once and use it the
            rest of the time.
          </span>
          <span className="text-sm opacity-75 font-normal">
            Copyright &copy;. {date.getFullYear()} All rights reserved.
          </span>
        </div>
        <div className="flex flex-col gap-1 items-center md:items-end md:ml-auto">
          <p className="text-base font-extrabold opacity-80 mb-3">LINKS</p>
          <div className="flex flex-col items-center md:items-end gap-3">
            {navigationLinks.map((item) => (
              <Link
                key={item.title}
                href={item.link}
                className={
                  "text-stone-900/75 font-medium hover:text-stone-900/90 text-base"
                }
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center md:items-end">
          <p className="text-base font-extrabold opacity-80 mb-1">LEGAL</p>
          <Link href={"/terms"}>
            <Button
              variant={"link"}
              className="text-stone-900/75 hover:text-stone-900/90 p-0 h-auto text-base"
            >
              Terms of services
            </Button>
          </Link>
          <Link href={"/privacy-policy"}>
            <Button
              variant={"link"}
              className="text-stone-900/75 hover:text-stone-900/90 p-0 h-auto text-base"
            >
              Privacy policy
            </Button>
          </Link>
        </div>
      </section>
    </footer>
  );
};
export default Footer;

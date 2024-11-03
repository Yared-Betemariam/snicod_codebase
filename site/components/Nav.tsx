import Link from "next/link";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import { Button } from "./ui/button";

export const navigationLinks = [
  {
    title: "Download",
    link: "/download",
  },
  {
    title: "Features",
    link: "#features",
  },
  {
    title: "Pricing",
    link: "#pricing",
  },
  {
    title: "FAQ",
    link: "#faq",
  },
];

const Nav = () => {
  return (
    <nav className="flex border-b border-color">
      <section className="wrapper h-[78px] flex items-center justify-between md:gap-12">
        <Logo />
        <div className="hidden mr-auto md:flex items-center gap-8">
          {navigationLinks.map((navLink, index) => (
            <Link href={navLink.link} key={index} className="">
              {navLink.title}
            </Link>
          ))}
        </div>
        <MobileNav />
        <Link href={"#pricing"}>
          <Button
            variant={"outlined"}
            className="border-primary/25 hover:bg-primary/5 brightness-75 text-primary hidden sm:flex"
          >
            Get Snicod
          </Button>
        </Link>
      </section>
    </nav>
  );
};
export default Nav;

import { font2Wrapper } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <section className="relative">
      <div className="wrapper flex flex-col md:flex-row gap-12 justify-between items-center py-10 md:py-6 h-[40rem] relative">
        <div className="flex flex-col gap-4 items-center text-center md:text-start md:items-start w-[40%]">
          <h1 className={font2Wrapper("h1 leading-[1.1]")}>
            Avoid code repetition & save time using{" "}
            <span className="gradient-text">Snicod</span>
          </h1>
          <p className="max-w-[40ch] text-lg mb-3">
            Snicod is an app that saves you code of programming language of your
            choice, and copy it instead or rewriting it again.
          </p>
          <div className="flex flex-col">
            <Link href="#pricing">
              <Button className="h-12 text-base hover:opacity-80 gap-3 duration-300 transition-all button-gradient-bg px-6 mb-2 w-56 font-semibold">
                <span>Get Snicod</span>
              </Button>
            </Link>
            <span className="text-sm opacity-75">
              7 days free trial. No card required
            </span>
          </div>
        </div>
        <div className="flex relative px-4 py-6">
          <Image
            src={"/app/pattern.svg"}
            alt="hero section pattern"
            width={620}
            height={620}
            className="absolute -z-10 opacity-5 brightness-0 inset-0 w-full h-full object-cover"
          />
          <div className="w-fit h-fit relative">
            <Image
              src={"/app/hero.png"}
              alt="hero_image"
              width={620}
              height={620}
              className="object-cover dropshadow-xl w-[420px] md:w-[540px] drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;

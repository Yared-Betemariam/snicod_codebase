import { font2Wrapper } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <section className="relative overflow-x-hidden overflow-y-auto">
      <div className="wrapper flex flex-col md:flex-row gap-12 justify-between items-center py-10 md:py-6">
        <div className="flex flex-col gap-4 items-center text-center md:text-start md:items-start">
          <h1
            className={font2Wrapper(
              "text-4xl xs:text-5xl lg:text-[4.2rem] lg:leading-[1.1] tracking-tight font-extrabold max-w-[16ch] capitalize"
            )}
          >
            Stop repeating code &{" "}
            <span className="bg-gradient-to-r from-primary to-sky-900 text-gradient bg-clip-text text-transparent">
              Save Time
            </span>
          </h1>
          <p className="max-w-[40ch] text-lg mb-3">
            Use snicod to save codes in any progamming language, and use it any
            time
          </p>
          <Link href="#pricing" className="w-fit">
            <Button className="h-12 text-lg hover:opacity-80 gap-3 duration-300 transition-all button-gradient-bg w-fit px-6 mb-2">
              <span>Purchase now</span>{" "}
              <IoIosArrowRoundForward className="size-8" />
            </Button>
          </Link>
        </div>
        <div className="flex relative overflow-hidden">
          <div className="w-fit h-fit relative">
            <Image
              src={"/app/hero.png"}
              alt="hero_image"
              width={600}
              height={600}
              className="object-cover w-[420px] md:w-[490px] glow border-t-2 border-primary/0 rounded-t-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;

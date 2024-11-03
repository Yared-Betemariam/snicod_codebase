import Image from "next/image";
import { font2Wrapper } from "@/lib/utils";
import { IoIosArrowRoundDown } from "react-icons/io";

const Features = () => {
  return (
    <>
      <section className="flex flex-col wrapper pt-16">
        <div className="flex relative overflow-hidden flex-col bg-red-100/50 border-color-2 border rounded-md p-6 sm:p-8 md:p-16 gap-4 text-center md:text-start">
          <h3 className={font2Wrapper("h3 leading-[1] max-w-[30ch]")}>
            <span className="text-destructive">
              <span className="text-[50px]">&#8734;</span> hours
            </span>{" "}
            wasted on <span className="underline">rewriting</span> already
            written codes
          </h3>
          <p className="body max-w-[64ch]">
            You are buring up you time writing code you have already written
            before. use snicod a save yourself a some <i>time</i> and{" "}
            <i>headache</i>
          </p>
          <code className="grid grid-cols-1 gap-2 text-5xl font-bold absolute -rotate-12 -bottom-4 -right-4 opacity-[0.055] select-none">
            <span>&gt; Console.log(&apos;Rewriting Code&apos;)</span>
            <span>&gt; Console.log(&apos;Rewriting Code&apos;)</span>
            <span>&gt; Console.log(&apos;Rewriting Code&apos;)</span>
            <span>&gt; Console.log(&apos;Rewriting Code&apos;)</span>
            <span>&gt; Console.log(&apos;Rewriting Code&apos;)</span>
            <span>&gt; Console.log(&apos;Rewriting Code&apos;)</span>
            <span>&gt; Console.log(&apos;Rewriting Code&apos;)</span>
          </code>
        </div>
      </section>
      <IoIosArrowRoundDown className="my-8 sm:my-12 md:my-16 size-12 mx-auto text-zinc-400" />
      <section className="flex flex-col wrapper pb-16">
        <div className="flex relative items-center justify-center overflow-hidden flex-col border border-color-2 rounded-md p-6 sm:p-8 md:p-16 gap-4 text-center">
          <h3 className={font2Wrapper("h3 leading-[1] max-w-[30ch]")}>
            Save{" "}
            <span className="text-emerald-500">
              <span className="text-[50px]">&#8734;</span> hours
            </span>{" "}
            using snicod&apos;s code saving features
          </h3>
          <p className="body max-w-[64ch]">
            Using snicod you can save any code from any programming language and
            access it <i>whenever</i> you want in lightspeed.
          </p>
          <div className="relative w-fit h-fit">
            <Image
              src={"/app/use-case.png"}
              alt="use-case"
              width={700}
              height={700}
              className="min-w-[32rem] w-full max-w-3xl"
            />
            <Image
              src={"/app/arrow.svg"}
              alt="arrow"
              width={100}
              height={100}
              className="w-20 absolute -left-10 -top-10"
            />
          </div>
        </div>
      </section>
      {/* <section className="flex flex-col wrapper pb-16">
        <div className="flex relative items-center justify-center overflow-hidden flex-col bg-emerald-100/50 border border-color-2 rounded-md p-6 sm:p-8 md:p-16 gap-4 text-center pb-[18rem] sm:pb-[22rem] md:pb-[29rem]">
          <h3 className={font2Wrapper("h3 leading-[1] max-w-[30ch]")}>
            Save{" "}
            <span className="text-emerald-500">
              <span className="text-[50px]">&#8734;</span> hours
            </span>{" "}
            using snicod&apos;s code saving features
          </h3>
          <p className="body max-w-[64ch]">
            Using snicod you can save any code from any programming language and
            access it <i>whenever</i> you want in lightspeed.
          </p>
          <Image
            src={"/app/use-case.png"}
            alt="use-case"
            width={700}
            height={700}
            className="min-w-[32rem] w-full absolute -bottom-[30%] xs:-bottom-[55%] sm:-bottom-[65%] md:-bottom-[42%] mask-image max-w-3xl"
          />
        </div>
      </section> */}
    </>
  );
};
export default Features;

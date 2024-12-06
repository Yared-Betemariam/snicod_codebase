import { font2Wrapper } from "@/lib/utils";
import Image from "next/image";
import { IoIosArrowRoundDown } from "react-icons/io";

const Features = () => {
  return (
    <>
      <section className="flex flex-col wrapper pt-16">
        <div className="flex relative overflow-hidden flex-col bg-red-300/20 border-color-2 border rounded-md p-6 sm:p-8 md:p-16 gap-4 text-center md:text-start">
          <h3 className={font2Wrapper("h3 leading-[1] max-w-[28ch]")}>
            <span className="text-red-700">
              <span className="text-[50px]">&#8734;</span> hours
            </span>{" "}
            wasted on <span className="underline">rewriting</span> already
            written codes
          </h3>
          <p className="body max-w-[64ch]">
            You are buring up you time writing code you have already written
            before. use snicod a save yourself a some time and headache.
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
      <section className="flex flex-col wrapper">
        <div className="flex items-center justify-center flex-col gap-4 text-center">
          <h3 className={font2Wrapper("h3 leading-[1] max-w-[30ch]")}>
            Save{" "}
            <span className="text-emerald-700">
              <span className="text-[50px]">&#8734;</span> hours
            </span>{" "}
            using snicod&apos;s code saving features
          </h3>
          <p className="body max-w-[64ch] mb-6">
            Using snicod you can save any code from any programming language and
            access it whenever you want in lightspeed.
          </p>
          <Image
            src={"/app/use-case.png"}
            alt="use-case"
            width={1200}
            height={1200}
            className="min-w-[32rem] w-full mask-image max-w-[50rem] brightness-110"
          />
        </div>
      </section>
    </>
  );
};
export default Features;

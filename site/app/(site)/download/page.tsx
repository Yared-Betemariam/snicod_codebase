import DownloadButton from "@/components/dowload/DownloadButton";
import { Button } from "@/components/ui/button";
import { font2Wrapper } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";

export const metadata: Metadata = {
  title: "Download",
};

const releases = [
  {
    version: "1.0",
    latest: true,
    date: "Oct 7, 2024",
    downloads: [
      {
        type: "mac",
        link: "",
      },
      {
        type: "win",
        link: "",
      },
    ],
  },
];

const Page = () => {
  return (
    <main className="flex flex-col flex-1">
      <section className="flex relative bg-gradient-to-tr overflow-hidden">
        <Image
          src={"/app/download.png"}
          alt="Snicod"
          width={800}
          height={800}
          className="absolute left-1/2 w-[38rem] top-1/2 -translate-y-1/2 glow-download -translate-x-1/2 opacity-[0.03]"
        />
        <div className="flex border-b border-color items-center text-center gap-6 justify-center flex-col wrapper py-32 z-10">
          <h1 className={font2Wrapper("h1")}>
            Download <span className="gradient-text">Snicod</span>
          </h1>
          <p className="body max-w-[48ch]">
            Download the app to get started using the snicod application both
            for MacOS and Windows. You can also purchase a license key for
            snicod application
          </p>
          <div className="flex items-center gap-6">
            <DownloadButton />
            <Link href={"/#pricing"}>
              <Button
                variant={"outline"}
                className="h-10 text-base bg-transparent border-zinc-400/25 hover:opacity-80 gap-3 duration-300 transition-all w-58 px-4"
              >
                <span>Purchase License</span>{" "}
                <IoIosArrowRoundForward className="size-8" />
              </Button>
            </Link>
          </div>
          <p className="text-sm max-w-[38ch]">
            By downloading and using Postman, I agree to the{" "}
            <Link href={"/privacy-policy"} className="text-sky-600">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href={"/terms"} className="text-sky-600">
              Terms
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
};
export default Page;

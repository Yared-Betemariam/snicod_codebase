import DownloadButton from "@/components/dowload/DownloadButton";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { font2Wrapper } from "@/lib/utils";
import { Download, Star } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GoDownload } from "react-icons/go";
import { IoSparklesSharp } from "react-icons/io5";
import { SiApple, SiWindows } from "react-icons/si";

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
      <section className="flex bg-gradient-to-tr relative  from-zinc-900 to-sky-900 text-zinc-100 overflow-hidden">
        <span className="text-[8rem] leading-[1] font-black absolute top-0  right-0 w-fit text-end text-transparent bg-clip-text bg-gradient-to-l from-zinc-100/[0.02] to-transparent">
          DOWNLOAD SNICOD
        </span>
        <Image
          src={"/app/download.png"}
          alt="Snicod"
          width={800}
          height={800}
          className="absolute left-1/2 w-[38rem] top-1/2 -translate-y-1/2 glow-download -translate-x-1/2 opacity-5"
        />
        <div className="flex border-b border-color items-center text-center gap-6 justify-center flex-col wrapper py-28 z-10">
          <h1 className={font2Wrapper("h2")}>
            Download{" "}
            <span className="highlight brightness-[1.5] decoration-sky-400/10">
              Snicod
            </span>
          </h1>
          <p className="body text-zinc-100 max-w-[38ch]">
            Download the latest version of snicod for Mac and Windows and start
            using snicod
          </p>
          <DownloadButton />
          <p className="text-sm text-zinc-300 max-w-[38ch]">
            By downloading and using Postman, I agree to the{" "}
            <Link href={"/privacy-policy"} className="text-blue-400">
              Privacy Policy
            </Link>{" "}
            and
            <Link href={"/terms"} className="text-blue-400">
              Terms
            </Link>
            .
          </p>
          <span className="border-t w-full max-w-md border-zinc-300/25" />
          <p className="text-sm">
            Looking for
            <Link href={"#releases"} className="underline hover:opacity-80">
              {" "}
              previous versions?
            </Link>
          </p>
        </div>
      </section>
      <section id="releases" className="flex flex-col wrapper py-20 gap-4">
        <div className="flex flex-col gap-1">
          <h2 className={font2Wrapper("h4")}>Active Snicod releases</h2>
          <p>Get access to all releases of snicod</p>
        </div>
        <Table className="">
          <TableCaption>A list of all releases.</TableCaption>
          <TableHeader>
            <TableRow className="text-base">
              <TableHead className="min-w-[240px] w-[240px]">Version</TableHead>
              <TableHead className="min-w-[120px] max-w-[120px]">
                Release date
              </TableHead>
              <TableHead className="text-right flex-1" />
              <TableHead className="text-right w-20">
                <span className="flex ml-auto gap-2 items-center justify-end border-none">
                  <Download className="size-4 " />
                  <span>Download</span>
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {releases.map((release, index) => (
              <TableRow key={index} className="text-base">
                <TableCell className="relative">
                  Snicod {release.version}{" "}
                  {release.latest && (
                    <span className="absolute mx-2 bg-primary rounded-full ring-1 py-0.5 ring-zinc-900/10 ring-inset px-2 text-xs text-zinc-100/90">
                      <IoSparklesSharp className="inline mr-1" />
                      latest release
                    </span>
                  )}
                </TableCell>
                <TableCell>{release.date}</TableCell>
                <TableCell />
                <TableCell className="text-right flex gap-3">
                  {release.downloads.map((download, indexY) => (
                    <Link
                      key={`${index}${indexY}`}
                      href={download.link}
                      target="_blank"
                      className="ml-auto"
                    >
                      <Button
                        size={"sm"}
                        variant={"outline"}
                        className="gap-2 bg-transparent flex items-center border border-color"
                      >
                        {download.type == "mac" ? (
                          <SiApple className="size-4" />
                        ) : (
                          <SiWindows className="size-3.5" />
                        )}
                        <span>
                          {download.type == "mac" ? "Apple" : "Windows"}{" "}
                          Download
                        </span>
                      </Button>
                    </Link>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </main>
  );
};
export default Page;

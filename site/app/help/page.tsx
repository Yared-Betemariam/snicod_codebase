/* eslint-disable react/no-unescaped-entities */
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { websiteMail } from "@/lib/config";
import { font2Wrapper } from "@/lib/utils";
import Link from "next/link";

export const metadata = {
  title: "Help",
};

const page = () => {
  return (
    <main className="flex flex-col items-center justify-center flex-1 relative overflow-hidden gap-4">
      <div className="max-w-3xl bg-white p-4 py-6 sm:p-8 rounded-md w-full h-auto flex flex-col gap-6 z-10 border">
        <Logo />
        <h1 className={font2Wrapper("h3")}>Need Help?</h1>
        <p className="body">
          Having issues with the application, your payment, your license or
          anything else? Contact us directly at{" "}
          <Link
            target="_blank"
            href={`mailto:${websiteMail}`}
            className="text-sky-800/75 underline"
          >
            {websiteMail}
          </Link>{" "}
          and We'll get back to you as soon as possible.
        </p>
        <p className="body">Kind regards, Snicod's Developers</p>
      </div>
      <Link href={"/"} className="w-fit">
        <Button
          variant={"link"}
          className="text-zinc-600 font-normal p-0 h-auto hover:opacity-80"
        >
          Back to home
        </Button>
      </Link>
      <span className="size-[200vh] rounded-full bg-primary/[0.025] absolute -top-[50vh] -right-[100vh] -z-10" />
    </main>
  );
};
export default page;

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="wrapper my-12 flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <Link href={"/"}>
          <Button
            className="space-x-2 border hover:bg-black/5 rounded-xl "
            variant={"ghost"}
          >
            <FaArrowLeft size={12} />
            <span className="text-sm">Back to home</span>
          </Button>
        </Link>
        <Logo />
      </div>
      <section className="flex-1">{children}</section>
    </main>
  );
};
export default layout;

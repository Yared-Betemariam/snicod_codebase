"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { navigationLinks } from "./Nav";
import { Button } from "./ui/button";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

const MobileNav = () => {
  const [isTOCOpen, setIsTOCOpen] = useState(false);
  const router = useRouter();

  return (
    <Sheet open={isTOCOpen} onOpenChange={setIsTOCOpen}>
      <SheetTrigger asChild className="px-0 ml-auto mr-4 md:hidden">
        <Button
          variant={"outline"}
          size={"icon"}
          className="bg-transparent hover:opacity-80 duration-100 transition-all border-color"
        >
          <Menu size={22} className="drop-shadow" />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-transparent shadow-none h-fit border-none max-w-[16rem] p-0 m-4">
        <div className="bg-zinc-200 border border-gray-500/25 rounded-xl p-4 px-6 drop-shadow-md flex flex-col gap-4">
          <Logo mobile />
          <span className="w-full border-b border-gray-500/25" />
          <div className="flex flex-col gap-2 items-start">
            {navigationLinks.map((item, index) => (
              <span
                className="opacity-70 cursor-pointer hover:underline"
                onClick={(e) => {
                  setIsTOCOpen(false);
                  setTimeout(() => {
                    router.push(item.link);
                  }, 300);
                }}
                key={index}
              >
                {item.title}
              </span>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default MobileNav;

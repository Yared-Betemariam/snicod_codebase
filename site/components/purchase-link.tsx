import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const PurchaseLink = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Link
      href={
        "https://customail.lemonsqueezy.com/buy/7efc02a7-6787-4e57-a501-f904b5da5f58"
      }
      className={cn("flex", className)}
    >
      {children}
    </Link>
  );
};
export default PurchaseLink;

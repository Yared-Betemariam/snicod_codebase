import { clsx, type ClassValue } from "clsx";
import {
  Bricolage_Grotesque,
  DM_Sans,
  Hanken_Grotesk,
  Imprima,
  Inconsolata,
  Inter,
  Koulen,
  M_PLUS_1_Code,
  Montserrat,
  Outfit,
  Poppins,
  Schibsted_Grotesk,
  Source_Code_Pro,
  Space_Grotesk,
} from "next/font/google";
import { twMerge } from "tailwind-merge";

export const font = Inter({ subsets: ["latin"] });
export const font2 = DM_Sans({
  subsets: ["latin"],
});

export const font2Wrapper = (className: string) => {
  return cn(font2.className, className);
  // return className;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

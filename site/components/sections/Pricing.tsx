import { cn, font2Wrapper } from "@/lib/utils";
import { Check } from "lucide-react";
import PurchaseLink from "../purchase-link";
import { Button } from "../ui/button";
import Link from "next/link";

const Pricing = () => {
  const pricingPlan = {
    price: 12,
    features: [
      "One-time payment",
      "Unlimited snippets",
      "All application features",
    ],
  };

  return (
    <section
      id="pricing"
      className="py-28 border-t border-color bg-zinc-900 text-zinc-100"
    >
      <div className="wrapper flex flex-col gap-10">
        <div className="flex flex-col gap-6 items-center justify-center">
          <h2 className={font2Wrapper("h2 text-center max-w-2xl")}>
            Pay once, use for
            <span className="highlight brightness-110"> lifetime</span>
          </h2>
          <p className="body text-zinc-300 text-center max-w-[38ch]">
            Purchase a snicod license below for a personal use with
            straightforward pricing.
          </p>
        </div>

        <div
          className={cn(
            "flex max-w-[24rem] w-full mx-auto flex-col ring-1 ring-primary p-6 px-8 rounded-md gap-6 bg-zinc-950 shadow-2xl shadow-sky-700/35"
          )}
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-end gap-2.5">
              <p
                className={font2Wrapper(
                  "text-6xl font-extrabold tracking-tighter"
                )}
              >
                ${pricingPlan.price}
              </p>
              <span className=" text-sm font-medium text-zinc-300">USD</span>
            </div>
            <p>Use Snicod on your personal devices</p>
          </div>
          <ul className="flex flex-col flex-1 gap-2">
            {pricingPlan.features.map((feature, fIndex) => (
              <li
                key={`${fIndex}`}
                className="flex items-center gap-3 text-base"
              >
                <Check className="text-primary size-4" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3">
            <PurchaseLink>
              <Button
                size={"lg"}
                className="h-14 w-full hover:opacity-80 duration-100 transition-all gap-3 font-medium button-gradient-bg text-base"
              >
                <span>Purchase now</span>
              </Button>
            </PurchaseLink>
            <Link href={"/download"}>
              <Button
                size={"lg"}
                className="h-10 w-full duration-100 transition-all gap-3 font-medium capitalize bg-transparent border border-primary/50 hover:bg-primary/10 text-sm"
              >
                <span>Start free trial</span>
              </Button>
            </Link>
            <p className="flex items-center gap-2 text-sm mx-auto opacity-75">
              Pay once, then{""}
              <span className="underline">it&apos;s your forever</span>
            </p>
          </div>
        </div>
        {/* <div
          className={cn(
            "flex max-w-[24rem] w-full mx-auto flex-col ring-1 ring-primary p-6 px-8 rounded-md gap-6 bg-zinc-950 shadow-2xl shadow-sky-700/35"
          )}
        >
          <p
            className={font2Wrapper(
              "text-6xl font-extrabold tracking-tighter text-center"
            )}
          >
            Free trial
          </p>
          <div className="flex flex-col gap-3">
            <PurchaseLink>
              <Button
                size={"lg"}
                className="h-14 w-full hover:opacity-80 duration-100 transition-all gap-3 font-medium button-gradient-bg text-base"
              >
                <span>Download app now</span>
              </Button>
            </PurchaseLink>
            <p className="flex items-center gap-2 text-sm mx-auto">
              7 days free trial
            </p>
          </div>
        </div> */}
      </div>
    </section>
  );
};
export default Pricing;

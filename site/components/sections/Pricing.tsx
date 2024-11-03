// images
import { cn, font2Wrapper } from "@/lib/utils";
import { Check, LockKeyhole } from "lucide-react";
import { HiMiniArrowLongRight } from "react-icons/hi2";
import PurchaseLink from "../purchase-link";
import { Button } from "../ui/button";
import { IoIosArrowRoundForward } from "react-icons/io";

const Pricing = () => {
  const pricingPlan = {
    price: 12,
    features: [
      "One-time payment",
      "Unlimited snippets",
      "All application features",
      "Updates available",
    ],
  };

  return (
    <section id="pricing" className="py-24 border-t border-color bg-primary/5">
      <div className="wrapper flex flex-col gap-10">
        <div className="flex flex-col gap-6 items-center justify-center">
          <h2 className={font2Wrapper("h2 text-center max-w-3xl")}>
            Pay once, use for <span className="highlight">Lifetime</span>
          </h2>
          <p className="body  text-center">
            Purchase a snicod license below with straightforward pricing.
          </p>
        </div>
        <div
          className={cn(
            "flex max-w-[28rem] w-full mx-auto flex-col ring-1 ring-primary p-6 px-8 rounded-md gap-6 bg-white shadow-xl shadow-sky-900/25"
          )}
        >
          <div className="flex flex-col gap-4">
            {/* <div className="flex flex-col gap-2">
              <h3 className={font2Wrapper("text-4xl font-black")}>All-in</h3>

              <p className="body">Use Snicod on your personal devices</p>
            </div> */}
            <div className="flex items-end gap-2.5">
              <p
                className={font2Wrapper(
                  "text-6xl font-extrabold tracking-tighter"
                )}
              >
                ${pricingPlan.price}
              </p>
              <span className=" text-sm font-medium text-zinc-700">USD</span>
            </div>
            <p className="body">Use Snicod on your personal devices</p>
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
            <p className="flex items-center gap-2 text-sm mx-auto">
              Pay once, then{""}
              <span className="underline">it&apos;s your forever</span>
            </p>
          </div>
        </div>
        {/* <div
          className={cn(
            "flex max-w-[28rem] w-full bg-white mx-auto flex-col p-6 rounded-md rings1 ring-primary/75 gap-6 shadow-xl shadow-sky-700/25"
          )}
        >
          <div className="flex flex-col gap-6 mb-4">
            <div className="flex flex-col gap-2">
              <h3 className={font2Wrapper("text-4xl font-black")}>All-in</h3>

              <p className="body">Use Snicod on your personal devices</p>
            </div>
            <div className="flex items-end gap-2.5">
              <p className={font2Wrapper("text-6xl font-extrabold")}>
                ${pricingPlan.price}
              </p>
              <span className="text-zinc-400 font-normal">/One-Time</span>
            </div>
          </div>
          <ul className="flex flex-col flex-1 gap-1.5">
            {pricingPlan.features.map((feature, fIndex) => (
              <li
                key={`${fIndex}`}
                className="flex items-center gap-3 text-base"
              >
                <Check className="text-emerald-500 size-5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3">
            <PurchaseLink>
              <Button
                size={"lg"}
                className="h-14 w-full hover:opacity-80 duration-100 transition-all gap-3  text-[19px] font-medium button-gradient-bg"
              >
                <span>Purchase now</span>{" "}
              </Button>
            </PurchaseLink>
            <p className="flex items-center gap-2 text-sm mx-auto">
              <LockKeyhole className="size-4 text-emerald-600" />
              <span>
                <span className="text-emerald-600">Secure</span> payments with
                Lemon Sequeezy, Inc.
              </span>
            </p>
          </div>
        </div> */}
      </div>
    </section>
  );
};
export default Pricing;

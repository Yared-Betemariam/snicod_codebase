import { cn, font2Wrapper } from "@/lib/utils";
import { ArrowDownToLine, Clipboard, PencilLine } from "lucide-react";
import { PiClipboard, PiPencilLine, PiArrowLineDown } from "react-icons/pi";

const Use = () => {
  const workSteps = [
    {
      title: "Write it",
      Icon: PiPencilLine,
      desc: <>Write the code once and copy it to snicod.</>,
    },
    {
      title: "Save it",
      Icon: PiArrowLineDown,
      desc: <>You can create a snippet and The code is automatically saved.</>,
    },
    {
      title: "Copy it",
      Icon: PiClipboard,
      desc: (
        <>
          Copy the code when <i>whenever</i> you want.
        </>
      ),
    },
  ];
  return (
    <div className="wrapper py-16 flex flex-col gap-12">
      <div className="flex flex-col gap-4 text-center items-center justify-center">
        <h2 className={font2Wrapper("h3 capitalize ")}>
          Get started with <span className="highlight">3 simple steps</span>
        </h2>
        <p className="body">
          Start using snicod to the fullest with these simple steps.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 mx-auto gap-8">
        {workSteps.map((item, i) => (
          <div
            key={item.title}
            className={cn(
              "flex h-fit border shadow-xl shadow-sky-950/10 border-color rounded-md bg-white max-w-[20rem] w-full flex-col px-8 gap-4 py-8",
              i % 2 === 0 && "mt-12"
            )}
          >
            {/* <Image
                  src={item.img}
                  alt="steps"
                  fill
                  className="object-contain max-h-[85%] my-auto opacity-50"
                /> */}
            <item.Icon className="size-24 text-primary" />
            <div className="flex flex-col gap-2">
              <span className="text-primary text-sm">Step {i + 1}</span>
              <h3 className={font2Wrapper("text-3xl font-extrabold")}>
                {item.title}
              </h3>
              <p className="text-base">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Use;

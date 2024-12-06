import { cn, font2Wrapper } from "@/lib/utils";
import { PiArrowLineDown, PiClipboard, PiPencilLine } from "react-icons/pi";

const Use = () => {
  const workSteps = [
    {
      title: "Write it",
      Icon: PiPencilLine,
      desc: (
        <>
          Write the code once on your own code editor or IDE and copy whatever
          you want to save in snicod.
        </>
      ),
    },
    {
      title: "Save it",
      Icon: PiArrowLineDown,
      desc: (
        <>
          You can create a code snippet in snicod and by pasting the code it
          will be automatically saved locally.
        </>
      ),
    },
    {
      title: "Copy it",
      Icon: PiClipboard,
      desc: (
        <>
          Copy the saved code from the snicod app whenever you want to use it in
          your project.
        </>
      ),
    },
  ];
  return (
    <div className="wrapper py-16 flex flex-col gap-12">
      <div className="flex flex-col gap-4 text-center items-center justify-center">
        <h2 className={font2Wrapper("h3 capitalize")}>
          Get started with <span className="highlight">3 simple steps</span>
        </h2>
        <p className="body">
          Get started using snicod to the fullest with this 3 simple steps
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 mx-auto gap-8">
        {workSteps.map((item, i) => (
          <div
            key={item.title}
            className={cn(
              "flex h-fit border shadow-lg  shadow-sky-900/10 border-color rounded-md bg-white max-w-[16rem] w-full flex-col px-8 gap-4 py-8 items-center justify-center relative",
              i % 2 === 0 && "mt-12"
            )}
          >
            <item.Icon className="size-20" />
            <span
              className={font2Wrapper(
                "absolute top-4 left-4 text-2xl opacity-25"
              )}
            >
              {i + 1}
            </span>
            <div className="flex flex-col text-center gap-2">
              <h3
                className={font2Wrapper(
                  "text-3xl font-extrabold text-primary "
                )}
              >
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

// images
import { cn, font2Wrapper } from "@/lib/utils";
import { Clock8, Server, TableOfContents } from "lucide-react";
import Image from "next/image";

const Services = () => {
  const servicesCards = [
    {
      Icon: Clock8,
      img: "/app/app-save.png",
      title: "Quick Snippet Copy",
      desc: "Save snippets with syntax highlighting and easily copy them to your clipboard with a single click. Enhance productivity by having your frequently used code readily available.",
    },
    {
      Icon: TableOfContents,
      img: "/app/app-save.png",
      title: "Organized Folder Structure",
      desc: "Create and manage folders to neatly organize your code snippets.",
    },
    {
      Icon: Server,
      img: "/app/app-save.png",
      title: "Local Data Storage",
      desc: "All your snippets are securely stored on your local PC, ensuring privacy and quick access without relying on internet connectivity.",
    },
  ];

  return (
    <section id="features" className="wrapper flex flex-col py-24 gap-10">
      <div className="grid-cols-1 md:grid-cols-2 grid gap-y-12">
        {servicesCards.map((serviceCard, index) => (
          <div
            key={index}
            className={cn(
              index == 0 ? "md:col-span-2 gap-8" : "gap-4",
              "flex flex-col md:flex-row items-center justify-between text-center md:text-start"
            )}
          >
            <div
              className={cn(
                "flex h-fit flex-col md:px-10 py-8",
                index == 0 ? "gap-5" : "gap-3"
              )}
            >
              <h3
                className={font2Wrapper(
                  cn(
                    "text-3xl font-extrabold",
                    index == 0 && "text-4xl md:text-[2.5rem] font-black"
                  )
                )}
              >
                {serviceCard.title}
              </h3>
              <p
                className={cn(
                  "text-sm text-gray-500",
                  index == 0 ? "text-base max-w-[52ch]" : "max-w-[36ch]"
                )}
              >
                {serviceCard.desc}
              </p>
            </div>
            <div className="rounded-md dsb bg-[#1e1e1e] overflow-hidden p-10">
              <div
                className={cn(
                  "relative",
                  index == 0 ? "size-52 md:w-96 " : "size-52"
                )}
              >
                <Image
                  src={serviceCard.img}
                  alt={serviceCard.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Services;

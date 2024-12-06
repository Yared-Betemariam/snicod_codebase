import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { websiteMail } from "@/lib/config";
import { font2Wrapper } from "@/lib/utils";
import Link from "next/link";

const FAQ = () => {
  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer: (
        <>
          Transactions are handled by Lemon Squeezy. You can safely purchase
          Snicod with your PayPal account, or with a credit card.
        </>
      ),
    },
    {
      question: "Where can I download the application?",
      answer: (
        <>
          After purchasing your license, you can download the application{" "}
          <Link href={`/download`} className="underline">
            here
          </Link>{" "}
          on the downloads page.
        </>
      ),
    },
    {
      question: "Where can I find my license key?",
      answer: (
        <>
          After purchase you will receive a confirmation email including your
          download link and your license key. If you haven&apos;t receive it,
          you can contact our team with the email provided.
        </>
      ),
    },
    {
      question: "How do I contact support?",
      answer: (
        <>
          If you have any question or need help, you can contact us{" "}
          <Link href={`mailto:${websiteMail}`} className="underline">
            {websiteMail}
          </Link>
          .
        </>
      ),
    },
    {
      question: "Do you offer refunds?",
      answer: (
        <>
          Refunds are not available except for some cases that have been listed
          on the{" "}
          <Link href={`/terms`} className="underline">
            terms and services
          </Link>{" "}
          .
        </>
      ),
    },
  ];
  return (
    <section
      id="faq"
      className="flex w-full max-w-3xl mx-auto flex-col py-24 gap-10"
    >
      <div className="flex flex-col gap-2">
        <h2 className={font2Wrapper("h3")}>
          Frequently asked <span className="highlight">questions</span>
        </h2>
        <p className="body max-w-[62ch]">
          Have any question regrading the use of snicod? Send us an email.
        </p>
      </div>
      <Accordion
        type="multiple"
        // collapsible
        className="w-full"
      >
        {faqs.map((qItem, index) => (
          <AccordionItem value={`item-${index + 1}`} key={index}>
            <AccordionTrigger className="text-start font-medium text-xl">
              {qItem.question}
            </AccordionTrigger>
            <AccordionContent className="text-base">
              {qItem.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
export default FAQ;

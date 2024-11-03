import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { font2Wrapper } from "@/lib/utils";

const FAQ = () => {
  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer:
        "Transactions are handled by Gumroad. You can safely purchase Snicod with your PayPal account, or with a credit card.",
    },
    {
      question: "How do I download the plugin?",
      answer:
        "After purchase you will receive a confirmation email including your download link and your license key. If you haven't receive it you can resend your purchase receipt here.",
    },
    {
      question: "Where can I find my license key?",
      answer:
        "After purchase you will receive a confirmation email including your download link and your license key. If you haven't receive it you can resend your purchase receipt here.",
    },
    {
      question: "How do I contact support?",
      answer: "If you have any question or need help, you can contact us here.",
    },
    {
      question: "Do you offer refunds?",
      answer: "Refunds are not available",
    },
  ];
  return (
    <section id="faq" className="flex wrapper flex-col py-24 gap-10">
      <div className="flex flex-col gap-6 items-center justify-center">
        <h2 className={font2Wrapper("h2 text-center")}>
          Frequently asked <span className="highlight">questions</span>
        </h2>
        <p className="body">Have another question? Send us an email.</p>
      </div>
      <Accordion
        type="multiple"
        // collapsible
        className="w-full max-w-3xl mx-auto"
      >
        {faqs.map((qItem, index) => (
          <AccordionItem value={`item-${index + 1}`} key={index}>
            <AccordionTrigger className="text-start">
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

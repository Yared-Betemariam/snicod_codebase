import { Button } from "../ui/button";

const CTA = () => {
  return (
    <section className="wrapper">
      <section className="flex shadow-xl shadow-black rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-900/0 flex-col py-16 px-6 mb-32 gap-10 border border-gray-500/25">
        <div className="flex flex-col gap-6 items-center justify-center">
          <h2 className="h2 text-center">Join Our Community</h2>
          <p className="body max-w-4xl text-center">
            At Bot Buzz, we value connection and shared experiences. Join our
            vibrant community to enhance your daily interactions with AI, share
            stories, exchange tips, and discover new ways to maximize your
            Ai-Con experience.
          </p>
          <Button
            size={"lg"}
            variant={"outline"}
            className="border-2 text-base h-10"
          >
            Join community
          </Button>
        </div>
      </section>
    </section>
  );
};
export default CTA;

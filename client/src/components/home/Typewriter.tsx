import { TypewriterEffectSmooth } from "../../ui/TypeEffect";

const words = [
  {
    text: "Start",
    className: "text-7xl"
  },
  {
    text: "Learning.",
    className: "text-teal-400 dark:text-teal-400 text-7xl",
  },
];

const words2 = [
  {
    text: "  Learn",
    className: "text-teal-400 dark:text-teal-600 text-sm",
  },
  {
    text: "every language.",
    className: "text-teal-400 dark:text-teal-600 text-sm",
  },
  {
    text: "Together.",
    className: "text-teal-400 dark:text-teal-600 text-sm",
  },
  {
    text: "With Us.",
    className: "text-teal-400 dark:text-teal-600 text-sm",
  },
];

const Typewriter = () => {
  return (
    <>
      <TypewriterEffectSmooth words={words} cursorClassName="text-teal-500 dark:text-teal-500 bg-teal-700" />
      <div className="-mt-16">
        <TypewriterEffectSmooth words={words2} cursorClassName="hidden" />
      </div>
    </>
  );
};

export default Typewriter;

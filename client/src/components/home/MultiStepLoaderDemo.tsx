import { MultiStepLoader as Loader } from "../../ui/multi-step-loader";

const loadingStates = [
  {
    text: "Register as a Learner",
  },
  {
    text: "Register as a Tutor",
  },
  {
    text: "Choose Your Pricing Model",
  },
  {
    text: "Setup Your budget",
  },
  {
    text: "Create your classroom",
  },
  {
    text: "Create Flashcards with AI ✨",
  },
  {
    text: "Recieve Feedback from AI 🤖",
  },
  {
    text: "Personalized Learning",
  },
  {
    text: "Personalized Quizs",
  }
];

export function MultiStepLoaderDemo() {
  return (
    <div className="w-full h-[60vh] flex items-center justify-center">
      <Loader loadingStates={loadingStates} loading={true} duration={2000} />
    </div>
  );
}

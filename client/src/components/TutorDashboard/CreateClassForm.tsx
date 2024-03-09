import React from "react";
import { Label } from "../../ui/Label";
import { Input } from "../../ui/Input";
import { cn } from "../../utils/cn";
import { Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { appName } from "../../data";
import {motion} from 'framer-motion'
import ClassroomContext from "../../Context/ClassroomContext";

export function CreateClassForm() {

  const {createClassroom} = useContext(ClassroomContext);
  const [duration, setDuration] = useState<string[]>([]);
  const [price, setPrice] = useState<string[]>([]);

  const navigate = useNavigate();

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const languageRef = useRef<HTMLInputElement>(null);
  const durationRef = useRef<HTMLSelectElement>(null);

  const handleSubmit = async () => {
    const title = titleRef.current!.value;
    const description = descriptionRef.current!.value;
    const language = languageRef.current!.value;
    if(!title || !description || !language) return;
    const success = await createClassroom(title, description, language, price, duration);
    if(success) navigate("/tutordashboard");
  };

  const handleAdd = () => {
    if(!priceRef.current!.value || !durationRef.current!.value) return;
    if(price.length >= 3) return;
    setPrice([...price, priceRef.current!.value]);
    setDuration([...duration, durationRef.current!.value]);
  }

  return (
    <div className="w-full my-4">
      <div className="w-full rounded-none md:rounded-2xl p-10 shadow-input bg-black/50">
        <h2 className="font-bold text-xl text-neutral-200">
          Welcome to {appName}
        </h2>
        <p className="text-sm max-w-sm mt-2 dark:text-neutral-300">
          Sign up to {appName}. Start learning now.
        </p>

        <div className="my-8">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstname">Title</Label>
              <Input
                ref={titleRef}
                id="fullname"
                placeholder="English 101"
                type="text"
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="description">Description</Label>
            <Input
              ref={descriptionRef}
              id="description"
              placeholder="Here I'll teach you English, etc."
              type="text"
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="description">Language</Label>
            <Input
              ref={languageRef}
              id="description"
              placeholder="English"
              type="text"
            />
          </LabelInputContainer>
          <div className="flex">
          <LabelInputContainer className="w-1/2 mr-4">
            <Label htmlFor="password">Price</Label>
            <Input
              ref={priceRef}
              id="price"
              placeholder="$ 1.5"
              type="number"
            />
          </LabelInputContainer>

          <select ref={durationRef} className="w-24 mt-5 h-12 mr-6 px-2 bg-black dark:bg-zinc-800 text-neutral-300 rounded-md">
            <option value="45">45 mins</option>
            <option value="60">60 mins</option>
            <option value="90">90 mins</option>
          </select>

          <button
            onClick={handleAdd}
            className="bg-gradient-to-br mt-6 relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-20 text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          >
            Add
            <BottomGradient />
          </button>
          </div>
          <div>
            <div className="flex flex-wrap">
              {price.map((p, i) => (
                <div key={i} className="flex flex-col mx-2 justify-between bg-teal-600 px-4 py-2 my-4 rounded-2xl">
                  <p className="text-neutral-300">${" "+p+" "}</p>
                  <p className="text-neutral-300">{" "+duration[i]} Minutes</p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="bg-gradient-to-br mt-4 relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          >
            Create Class &rarr;
            <BottomGradient />
          </button>
        </div>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

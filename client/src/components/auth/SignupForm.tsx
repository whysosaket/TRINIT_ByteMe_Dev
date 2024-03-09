import React from "react";
import { Label } from "../../ui/Label";
import { Input } from "../../ui/Input";
import { cn } from "../../utils/cn";
import { Link } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { appName } from "../../data";
import {motion} from 'framer-motion'

export function SignupFormDemo() {
  const { signup, isAuthenticated, toastMessage, tutorSignup } = useContext(AuthContext);

  const [languages, setLanguages] = useState<string[]>([]);
  const [isTutor, setIsTutor] = useState<boolean>(false);

  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const fullnameRef = useRef<HTMLInputElement>(null);
  const languageRef = useRef<HTMLInputElement>(null);
  const bioRef = useRef<HTMLInputElement>(null);
  const eoeRef = useRef<HTMLInputElement>(null);

  const handleAddLanguage = () => {

    const lang = languageRef.current?.value;
    if (lang) {
      setLanguages([...languages, lang]);
      languageRef.current!.value = "";
    }
  }

  const handleSubmit = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const fullname = fullnameRef.current?.value;
    const bio = bioRef.current?.value;
    const eoe = eoeRef.current?.value;
    if (isAuthenticated)
      return toastMessage("You are already logged in", "warning");
    if (email && password && fullname) {

      if (isTutor) {
        if (languages && bio && eoe) {
          const res = await tutorSignup(fullname, email, password, languages, bio, parseInt(eoe));
          if (res) {
            navigate("/login");
          }
        } else {
          toastMessage("Please fill all the fields", "warning");
        }
      }else{
        const res = await signup(fullname, email, password);
        if (res) {
          navigate("/login");
        }
      }
    } else {
      toastMessage("Please fill all the fields", "warning");
    }
  };
  return (
    <div className="w-full px-16 my-auto">
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
              <Label htmlFor="firstname">Full name</Label>
              <Input
                ref={fullnameRef}
                id="fullname"
                placeholder="Tyler"
                type="text"
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              ref={emailRef}
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
            />
          </LabelInputContainer>
          <div className="flex">
          <LabelInputContainer className="mb-4 w-1/2 mr-4">
            <Label htmlFor="password">Password</Label>
            <Input
              ref={passwordRef}
              id="password"
              placeholder="••••••••"
              type="password"
            />
          </LabelInputContainer>
          <div className="flex align-middle justify-start">
            <input
              type="checkbox"
              id="tutor"
              name="tutor"
              className="mr-2"
              onChange={() => setIsTutor(!isTutor)}
            />
            <label htmlFor="tutor" className="text-neutral-300 my-auto">
              Are you a tutor?
            </label>
          </div>
          </div>
          {isTutor&&<motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5}}
          className="flex align-middle justify-center">
          <LabelInputContainer className="mb-0 mr-4">
            <Label htmlFor="password">Add Languages</Label>
            <Input
              ref={languageRef}
              id="lamnguage"
              placeholder="English, Spanish, French, etc."
              type="text"
            />
          </LabelInputContainer>
          <button
            onClick={handleAddLanguage}
            className="bg-gradient-to-br mt-6 relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-20 text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          >
            Add
            <BottomGradient />
          </button>
          </motion.div>}
          {isTutor&&<motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1}}
          className="mb-4 mt-2">
            {languages.map((lang, i) => (
              <motion.span
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1}}
              key={i} className="text-xs text-neutral-300 mr-2 px-4 py-2 bg-teal-600 rounded-2xl cursor-pointer">
                {lang}
              </motion.span>
            ))}
          </motion.div>}

          {isTutor&&<motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3}}
          className="flex align-middle justify-center">
          <LabelInputContainer className="mb-6 mr-4">
            <Label htmlFor="password">Add Bio</Label>
            <Input
              ref={bioRef}
              id="bio"
              placeholder="I am a tutor who can help you learn French, etc."
              type="text"
            />
          </LabelInputContainer>
          </motion.div>}

          {isTutor&&<motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5}}
          className="flex align-middle justify-center">
          <LabelInputContainer className="mb-6 mr-4">
            <Label htmlFor="password">Years of Experience</Label>
            <Input
              ref={eoeRef}
              id="eoe"
              placeholder="10"
              type="number"
            />
          </LabelInputContainer>
          </motion.div>}

          <button
            onClick={handleSubmit}
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          >
            Sign up &rarr;
            <BottomGradient />
          </button>
          <p className="text-xs text-neutral-300 mt-4">
            By signing up, you agree to our{" "}
            <a href="#" className="text-cyan-500">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-cyan-500">
              Privacy Policy
            </a>
            .
          </p>
          <p className="text-xs text-neutral-300 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-500">
              Log in
            </Link>
          </p>
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

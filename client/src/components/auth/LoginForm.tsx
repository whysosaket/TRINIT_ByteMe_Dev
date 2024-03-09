import React from "react";
import { Label } from "../../ui/Label";
import { Input } from "../../ui/Input";
import { cn } from "../../utils/cn";
import { Link } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { appName } from "../../data";

export function LoginFormDemo() {

  const { login, isAuthenticated, toastMessage, tutorLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isTutor, setIsTutor] = useState<boolean>(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if(isAuthenticated) return toastMessage("You are already logged in", "warning");
    
    if(isTutor){
      const res = await tutorLogin(email, password);
      if(res){
        navigate("/tutordashboard");
      }
    }else{
      if (email && password) {
        const res = await login(email, password);
        if (res) {
          navigate("/studentdashboard");
        }
      } else {
        toastMessage("Please fill all the fields", "warning");
      }
    }

  };
  return (
    <div className="w-full px-16 my-auto">
      <div className="w-full rounded-none md:rounded-2xl p-10 shadow-input bg-black/50">
        <h2 className="font-bold text-xl text-neutral-200">
          Welcome to {appName}
        </h2>
        <p className="text-sm max-w-sm mt-2 dark:text-neutral-300">
          Login to {appName}. Continue your learning journey.
        </p>

        <div className="my-8">
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input ref={emailRef} id="email" placeholder="projectmayhem@fc.com" type="email" />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input ref={passwordRef} id="password" placeholder="••••••••" type="password" />
          </LabelInputContainer>

          <div className="flex align-middle justify-start mb-6">
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

          <button
            onClick={handleSubmit}
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          >
            Login &rarr;
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
            Don't have an account?{" "}
            <Link to="/signup" className="text-cyan-500">
              Signup
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

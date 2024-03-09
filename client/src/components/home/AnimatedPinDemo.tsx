import { PinContainer } from "../../ui/3d-pin";

export function AnimatedPinDemo() {
  return (
    <div className="h-[50rem] w-full flex items-center justify-center ">
      <PinContainer
        title="Click to know all the services we provide"
        href="#"
      >
        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
          <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
            Show All The Features
          </h3>
          <div className="text-base !m-0 !p-0 font-normal">
            <span className="text-slate-500 ">
              We're your guide, your mentor, and your friend. We're here to help
            </span>
          </div>
          <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-teal-500 via-blue-500 to-violet-500" />
        </div>
      </PinContainer>
    </div>
  );
}

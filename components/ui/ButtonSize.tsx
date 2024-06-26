interface ButtonSize {
  label: string;
  href: string;
}

export interface Props {
  title: string;
  btnsLetters: ButtonSize[];
  btnsNumbers: ButtonSize[];
  title2: string;
  lastButton: ButtonSize;
}

export default function ButtonSize(
  { title, btnsLetters, btnsNumbers, title2, lastButton }: Props,
) {
  return (
    <>
      <div class={`flex flex-col gap-5 justify-center items-center mb-8`}>
        <h1 class={`text-xl text-black lg:text-2.5xl`}>{title}</h1>
        <ul
          class={`flex flex-col gap-3 justify-center items-center md:flex-row`}
        >
          {btnsLetters.map((item) => {
            return (
              <li class={``}>
                <a
                  class={`hover:bg-primary hover:border-primary hover:text-white w-[40vw] md:w-full lg:w-[10.7vw] lg:max-w-[165px] min-w-[160px] md:min-w-[100px] text-base flex justify-center items-center px-4 text-black h-[59px] lg:h-[52px] border-2 border-black rounded-md`}
                  href={item.href}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
        <ul
          class={`flex flex-col gap-3 justify-center items-center md:flex-row`}
        >
          {btnsNumbers.map((item) => {
            return (
              <li class={`first-of-type:mt-5 md:first-of-type:mt-0`}>
                <a
                  class={`hover:bg-primary hover:border-primary hover:text-white w-[40vw] md:w-full lg:w-[10.7vw] lg:max-w-[165px] min-w-[160px] md:min-w-[100px] text-base flex justify-center items-center px-4 text-black h-[59px] lg:h-[52px] border-2 border-black rounded-md`}
                  href={item.href}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
        <h2 class={`text-xl text-black mt-10 lg:text-2.5xl`}>{title2}</h2>
        <a
          class={`hover:bg-primary hover:border-primary hover:text-white w-[40vw] md:w-[160px] lg:w-[10.7vw] lg:max-w-[165px] min-w-[160px] md:min-w-[100px] text-base flex justify-center items-center px-4 text-black h-[59px] lg:h-[52px] border-2 border-black rounded-md`}
          href={lastButton.href}
        >
          {lastButton.label}
        </a>
      </div>
    </>
  );
}

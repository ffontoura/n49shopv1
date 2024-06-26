export interface Props {
  title: string;
  text: string;
  button: {
    text: string;
    link: string;
  };
}

export default function LookingWhereChange({ title, text, button }: Props) {
  return (
    <div class="home-container home-container-mobile">
      <div class="max-w-[900px] mx-auto mb-8 sm:mb-10">
        <h2 class="font-bold text-[18px] sm:text-[22px]">{title}</h2>
        <p class="py-4 text-[14px]">{text}</p>
        <a
          href={button.link}
          class="flex justify-center items-center w-full bg-primary border-none text-white py-3 px-2.5 rounded-md mt-3 hover:bg-primary hover:opacity-80 max-w-[260px]"
        >
          {button.text}
        </a>
      </div>
    </div>
  );
}

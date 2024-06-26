export interface Props {
  title: string;
}

export default function ({ title }: Props) {
  return (
    <div>
      <div class="w-full flex justify-center items-center bg-[#F2F2F7]">
        <h1 class="py-[45px] sm:py-25 text-[18px] sm:text-[30px] tracking-[0.04em] text-[#1C1C1E]">
          {title}
        </h1>
      </div>
    </div>
  );
}

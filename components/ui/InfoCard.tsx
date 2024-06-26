import type { ImageWidget as LiveImage } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { HTML } from "deco-sites/std/components/types.ts";

export interface Props {
  title: string;
  text: HTML;
  banner: LiveImage;
  altImage?: string;
  btnLabel: string;
}

export default function InfoCard(
  { title, text, banner, btnLabel, altImage }: Props,
) {
  return (
    <>
      <div class={`flex p-4 py-[50px] gap-8 max-w-[1110px] mx-auto`}>
        <div class={`flex flex-col gap-8 w-[85%] lg:w-1/2 mx-auto`}>
          <h1
            class={`text-black font-bold text-[50px] leading-[1em] lg:text-[5rem]`}
          >
            {title}
          </h1>
          <div
            class={`text-[22px] leading-normal font-bold text-black`}
            dangerouslySetInnerHTML={{ __html: text }}
          />
          <form method={"POST"} action={""} class={`flex flex-col gap-2`}>
            <label htmlFor="email" class={`text-sm font-bold text-black`}>
              Email*
            </label>
            <input
              class={`border border-[#979797] rounded text-black p-1.5`}
              placeholder={"Digite seu email"}
              type="email"
              name={"email"}
              id={"email"}
            />
            <button
              class={"leading-[1] mt-3 bg-primary text-2xl text-white p-4 rounded-lg w-min"}
              type={"submit"}
            >
              {btnLabel}
            </button>
          </form>
        </div>
        <div class={`hidden lg:flex w-fit`}>
          <Picture preload={true}>
            <Source
              media="(min-width: 1024px)"
              fetchPriority={"high"}
              loading={"eager"}
              src={banner}
              width={451}
              preload={true}
            />
            <img
              class={`object-cover w-full max-w-[451px] rounded-3xl`}
              loading={"eager"}
              src={banner}
              alt={altImage}
              width={870}
            />
          </Picture>
        </div>
      </div>
    </>
  );
}

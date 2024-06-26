export interface Props {
  text: string;
}

export interface MainProps extends Props {
  headingText: string;
}

export const HeadingSearchResult = (
  { text, headingText }: MainProps,
) => {
  return (
    <div class="w-full max-w-[1920px] mx-auto p-[21px_16px] lg:p-[0_100px_0_180px] h-[90px] lg:h-auto bg-base-100">
      <p class="text-sm text-info tracking-[.1px] lg:pt-11">
        {text ? text : "Você buscou por:"}
      </p>
      <h1 class="text-lg lg:text-3xl text-info tracking-[.1px] mt-1 lg:pb-10">
        {headingText ? headingText : ""}
      </h1>
    </div>
  );
};

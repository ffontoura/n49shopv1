import type { HTML } from "deco-sites/std/components/types.ts";
// import Quilltext from "deco-sites/std/components/QuillText.tsx";

export interface Props {
  text: HTML;
  ctaText: string;
  ctaLink: string;
}

export default function SeoText({ text, ctaText, ctaLink }: Props) {
  return (
    <div class="home-container-mobile sm:home-container text-center py-12">
      <div class="max-w-[1280px] mx-auto">
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </div>

      <a href={ctaLink} class="block text-[#0099ff] underline mt-2">
        {ctaText}
      </a>
    </div>
  );
}

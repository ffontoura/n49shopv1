import type { HTML } from "deco-sites/std/components/types.ts";
// import Quilltext from "deco-sites/std/components/QuillText.tsx";

export interface Props {
  content: HTML[];
  maxWidth: "900px" | "1140px";
}

export default function TextInstitutional({ content, maxWidth }: Props) {
  const max = maxWidth == "900px" ? "max-w-[900px]" : "max-w-[1140px]";

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .separador {
              width: 100% !important;
            }
            @media (min-width: 768px) {
              .separador {
                width: 70% !important;
              }
            }

          `,
        }}
      />
      <div class="home-container home-container-mobile">
        <div class={`${max} mx-auto my-8 text-[14px]`}>
          {content.map((content) => {
            return <div dangerouslySetInnerHTML={{ __html: content }} />;
          })}
        </div>
      </div>
    </>
  );
}

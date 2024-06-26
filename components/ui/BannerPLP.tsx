import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { ImageWidget as LiveImage } from "apps/admin/widgets.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";
import type { HTML } from "deco-sites/std/components/types.ts";

export interface Padding {
  /** @description Margem interna esquerda */
  paddingLeft?: number;
  /** @description Margem interna direita */
  paddingRight?: number;
  /** @description Margem interna cima */
  paddingTop?: number;
  /** @description Margem interna baixo */
  paddingBottom?: number;
}

export interface Button {
  /** @description Texto do botão */
  text?: string;
  /** @description Link do botão */
  href?: string;
  /** @description Cor do botão */
  color: "blue" | "white";
}

export interface Title {
  text: HTML;
}

export interface Content {
  /** @description Dentro ou fora da imagem? */
  where?: "Dentro" | "Fora";
  /** @description Textos */
  title?: Title[];
  /** @description Alinhamento dos botões */
  align?: "center" | "left" | "right";
  /** @description Alinhamento vertical */
  verticalAlign?: "center" | "top" | "bottom";
  /** @description Botões */
  buttons?: Button[];
}

export interface Banner {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;
  /** @description text to be rendered on top of the image */
  title?: HTML;
  image: {
    /** @description Image for big screens */
    desktop?: LiveImage;
    /** @description Image for small screens */
    mobile?: LiveImage;
    /** @description image alt text */
    alt?: string;
  };
  /** @description Textos e Botões */
  content?: Content;
  /** @description Margem interna */
  padding?: Padding;
}

export interface Props {
  page?: LoaderReturnType<ProductListingPage | null>;
  banners?: Banner[];
}

function BannerUI(
  { banner, content, padding }: {
    banner: Banner;
    content: Content | undefined;
    padding: Padding | undefined;
  },
) {
  const { title, image } = banner;

  return (
    <div class="grid grid-cols-1 grid-rows-1 relative">
      <Picture preload class="col-start-1 col-span-1 row-start-1 row-span-1">
        <Source
          src={image.mobile ?? ""}
          width={360}
          height={224}
          media="(max-width: 767px)"
          loading="eager"
          fetchPriority="high"
          preload={true}
        />
        <Source
          src={image.desktop ?? ""}
          width={1440}
          height={262}
          media="(min-width: 767px)"
          loading="eager"
          fetchPriority="high"
          preload={true}
        />
        <img
          class="w-full"
          src={image.desktop}
          alt={image.alt ?? title}
          loading="eager"
          preload="true"
        />
      </Picture>

      <Content padding={padding} content={content} />
    </div>
  );
}

/**
 * TODO: run the matcher agains the true URL instead on the breadcrumb.
 * This way we can remove the need for a loader. This can be done on live@1.x
 */
function Banner({ page, banners = [] }: Props) {
  if (!page || page.breadcrumb.itemListElement.length === 0) {
    return null;
  }

  const { item: canonical } = page
    .breadcrumb
    .itemListElement
    .reduce((curr, acc) => curr.position > acc.position ? curr : acc);

  const matching = banners.find(({ matcher }) =>
    new RegExp(matcher).test(canonical)
  );

  if (!matching) {
    return null;
  }

  return (
    <BannerUI
      banner={matching}
      content={matching.content}
      padding={matching.padding}
    />
  );
}

export default Banner;

function Content(
  { padding, content }: {
    padding: Padding | undefined;
    content: Content | undefined;
  },
) {
  const align = content?.align == "center"
    ? "justify-center"
    : content?.align == "left"
    ? "justify-start"
    : "justify-end";
  const verticalAlign = content?.verticalAlign == "center"
    ? "justify-center"
    : content?.verticalAlign == "top"
    ? "justify-start"
    : "justify-end";

  return (
    <div
      style={`
      padding: ${padding?.paddingTop || 0}px ${padding?.paddingRight || 0}px ${
        padding?.paddingBottom || 0
      }px ${padding?.paddingLeft || 0}px
      `}
      class={`w-full h-full ${
        content?.where == "Dentro" ? "absolute top-0" : ""
      } flex flex-col ${verticalAlign}`}
    >
      <div class="w-full">
        {content?.title?.map((title) => {
          return (
            <div dangerouslySetInnerHTML={{ __html: title.text }}>
            </div>
          );
        })}
      </div>
      {content?.buttons?.length && (
        <div class={`w-full flex gap-5 py-2.5 ${align}`}>
          {content?.buttons?.map((button) => {
            return (
              <a
                href={button.href}
                class="flex items-center text-center bg-white text-black px-6 py-2 rounded-md text-[14px] tracking-wide"
              >
                {button.text}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

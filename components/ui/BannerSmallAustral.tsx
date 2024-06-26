import type { ImageWidget as LiveImage } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Video from "deco-sites/std/components/Video.tsx";
import type { VideoWidget } from "apps/admin/widgets.ts";

export interface VideoProps {
  /** @description O título do seu vídeo */
  title: string;
  /** @description Insira o vídeo com resolução 375 × 486 px */
  videoMobile: VideoWidget;
  /** @description Para melhorar a perfomance digite a proporação no formato exemplo: 1920x1080 */
  ratioMobile?: string;
  /** @description Insira o vídeo com resolução 1518 × 553 px */
  videoDesktop: VideoWidget;
  /** @description Para melhorar a perfomance digite a proporação no formato exemplo: 1920x1080 */
  ratioDesktop?: string;
}

export interface ImageProps {
  /** @description Seu banner Mobile */
  imageMobile: LiveImage;
  /** @description Seu banner Desktop */
  imageDesktop: LiveImage;
  /** @description Texto Alternativo */
  /** @default Alt image */
  altImage?: string;
  /** @description Link para redirecionar */
  hrefImage?: string;
}

export type Item = ImageProps | VideoProps;

export interface Creative {
  creative: Item;
  label?: string;
}

export interface Props {
  /** @description Colunas */
  banner: Creative;
  /** @description Bordas arredondadas */
  borderRadius?: boolean;
}

const isImage = (item: Item): item is ImageProps =>
  // deno-lint-ignore no-explicit-any
  typeof (item as any)?.altImage === "string";

export default function Container(
  {
    banner,
    borderRadius,
  }: Props,
) {
  return (
    <div class={`mx-auto flex justify-center py-8 px-4`}>
      <BannerSmallAustral
        banner={banner}
        borderRadius={borderRadius}
      />
    </div>
  );
}

function BannerSmallAustral(
  { banner, borderRadius }: Props,
) {
  return (
    <div class="flex w-full">
      {isImage(banner.creative)
        ? (
          <Image
            creative={banner.creative}
            borderRadius={borderRadius}
          />
        )
        : <VideoComponent creative={banner.creative} />}
    </div>
  );
}

function Image(
  { creative, borderRadius }: {
    creative: Item;
    borderRadius: boolean | undefined;
  },
) {
  return (
    <a
      class="w-[92%] mx-auto md:w-[59.2%] lg:py-10 max-w-[870px]"
      href={(creative as ImageProps).hrefImage}
      aria-label={(creative as ImageProps).altImage ||
        (creative as ImageProps).imageDesktop}
    >
      <Picture preload={true}>
        <Source
          media="(max-width: 1024px)"
          fetchPriority={"high"}
          loading={"eager"}
          src={(creative as ImageProps).imageMobile}
          width={330}
          preload={true}
        />
        <Source
          media="(min-width: 1025px)"
          fetchPriority={"high"}
          loading={"eager"}
          src={(creative as ImageProps).imageDesktop}
          width={870}
          preload={true}
        />
        <img
          class={`object-cover w-full h-[200px] md:banner-small md:max-h-[358px] ${
            borderRadius && "rounded-lg"
          }`}
          loading={"eager"}
          src={(creative as ImageProps).imageDesktop}
          alt={(creative as ImageProps).altImage ||
            (creative as ImageProps).imageDesktop}
          width={870}
        />
      </Picture>
    </a>
  );
}

function VideoComponent({ creative }: Creative, { borderRadius }: Props) {
  return (
    <>
      <div class="w-full block lg:hidden">
        <Video
          src={(creative as VideoProps).videoMobile}
          width={330}
          height={199}
          class={`object-cover w-full max-w-[100vw] video-banner-full-mobile ${
            borderRadius && "rounded-md"
          }`}
          loop
          muted
          autoPlay
          playsInline
          loading={"eager"}
        >
        </Video>
      </div>
      <div class="w-full hidden lg:block">
        <Video
          src={(creative as VideoProps).videoDesktop}
          width={1920}
          height={700}
          class={`object-cover w-full max-w-[100vw] sm:video-banner-full-desktop ${
            borderRadius && "rounded-md"
          }`}
          loop
          muted
          autoPlay
          playsInline
          loading={"eager"}
        >
        </Video>
      </div>
    </>
  );
}

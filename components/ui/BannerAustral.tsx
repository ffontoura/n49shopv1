import type { HTML } from "deco-sites/std/components/types.ts";

import type { ImageWidget as LiveImage } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Video from "apps/website/components/Video.tsx";

import Icon from "deco-sites/australroupas/components/ui/Icon.tsx";

import Slider from "deco-sites/australroupas/components/ui/Slider.tsx";
import SliderJS from "deco-sites/australroupas/islands/SliderJS.tsx";
import type { VideoWidget } from "apps/admin/widgets.ts";

import { useId } from "preact/hooks";

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
  /** @description Link para redirecionar */
  targetHref?: string;
}

export interface ImageProps {
  /** @description Seu banner Mobile */
  imageMobile: LiveImage;
  /** @description Para melhorar a perfomance digite a proporação no formato exemplo: 1920x1080 */
  ratioMobile?: string;
  /** @description Seu banner Desktop */
  imageDesktop: LiveImage;
  /** @description Para melhorar a perfomance digite a proporação no formato exemplo: 1920x1080 */
  ratioDesktop?: string;
  /** @description Texto Alternativo */
  altImage?: string;
  /** @description Link para redirecionar */
  hrefImage?: string;
}

export type Item = ImageProps | VideoProps;

export interface Creative {
  creative: Item;
  label?: string;
}

export interface Carousel {
  autoplay?: boolean;
  /** @description Intervalo de tempo para o Carrossel */
  interval?: number;
}

export interface Title {
  text: HTML;
  font: "lusitana" | "nunito-sans" | "Roboto-ligth" | "Palatino";
}

export interface Column {
  /** @description Suas imagens e vídeos */
  creativeCarousel: Creative[];
  /** @description Carrossel automático */
  carouselOptions?: Carousel;
}

export interface Props {
  /** @description Colunas */
  column: Column;
  /** @description Largura máxima total */
  maxWidth?: number;
  /** @description Tela cheia */
  fullScreen: boolean;
  /** @description Banner Principal */
  isFirstBanner: boolean;
  /** @description Bordas arredondadas */
  borderRadius?: boolean;
  /** @description Espaçamento embaixo */
  marginBottom?: boolean;
  /** @description Ícone de mouse ao centro */
  mouseIcon?: boolean;
}

const isImage = (item: Item): item is ImageProps => {
  return (item as ImageProps).imageMobile !== undefined ||
    (item as ImageProps).imageDesktop !== undefined;
};

export default function Container(
  {
    column,
    maxWidth,
    fullScreen,
    isFirstBanner,
    borderRadius,
    marginBottom = true,
    mouseIcon = false,
  }: Props,
) {
  return (
    <div
      class={`mx-auto flex flex-wrap justify-center ${
        marginBottom && "mb-10"
      } ${fullScreen ? "" : "sm:home-container"}`}
    >
      <div class="sm:w-full">
        <BannerAustral
          column={column}
          maxWidth={maxWidth}
          fullScreen={fullScreen}
          isFirstBanner={isFirstBanner}
          borderRadius={borderRadius}
          mouseIcon={mouseIcon}
        />
      </div>
    </div>
  );
}

function BannerAustral(
  { column, maxWidth, fullScreen, isFirstBanner, borderRadius, mouseIcon }:
    Props,
) {
  const { creativeCarousel, carouselOptions } = column;
  const id = useId();
  return (
    <div class={`relative`}>
      <div
        id={id}
        class="grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_48px]"
      >
        <Slider class="carousel carousel-center w-full col-span-full row-span-full scrollbar-none">
          {creativeCarousel?.map((creative, index) => {
            if (isImage(creative.creative)) {
              return (
                <Slider.Item
                  index={index}
                  class={`relative carousel-item ${
                    fullScreen
                      ? "min-w-[100vw]"
                      : "max-w-[calc(100vw-30px)] sm:max-w-full w-full flex flex-col"
                  }`}
                >
                  <div class={`${fullScreen ? `min-w-[100vw]` : `w-full`}`}>
                    <Image
                      creative={creative.creative}
                      borderRadius={borderRadius}
                      index={index}
                      isFirstBanner={isFirstBanner}
                    />
                  </div>
                </Slider.Item>
              );
            } else {
              return (
                <Slider.Item
                  index={index}
                  class={`relative carousel-item ${
                    fullScreen
                      ? "min-w-[100vw]"
                      : "max-w-[calc(100vw-30px)] sm:max-w-full"
                  }`}
                >
                  <VideoComponent creative={creative.creative} />
                </Slider.Item>
              );
            }
          })}
        </Slider>

        {creativeCarousel.length > 1 && <Controls />}

        {creativeCarousel.length > 1 && (
          <Dots
            creativeCarousel={creativeCarousel}
            interval={carouselOptions?.interval}
          />
        )}

        {isFirstBanner && mouseIcon && (
          <span class="absolute bottom-[10px] hover:bottom-[5px] left-1/2 transform -translate-x-1/2 px-4 py-3 transition-all duration-150 cursor-pointer">
            <i class="icon icon-mouse text-white text-[26px]"></i>
          </span>
        )}

        <SliderJS
          rootId={id}
          interval={carouselOptions?.interval && carouselOptions.interval * 1e3}
          infinite={true}
        />
      </div>
    </div>
  );
}

function Image(
  { creative, borderRadius, index, isFirstBanner }: {
    creative: Item;
    borderRadius: boolean | undefined;
    index: number;
    isFirstBanner: boolean;
  },
) {
  const isLcp = isFirstBanner && index < 1;
  return (
    <a
      href={(creative as ImageProps).hrefImage}
      aria-label={(creative as ImageProps).altImage ||
        (creative as ImageProps).imageDesktop}
    >
      <Picture preload={isLcp}>
        <Source
          media="(max-width: 1024px)"
          fetchPriority={isLcp ? "high" : "low"}
          loading={isLcp ? "eager" : "lazy"}
          src={(creative as ImageProps).imageMobile}
          width={Number((creative as ImageProps).ratioMobile?.split("x")[0]) ||
            414}
          height={Number((creative as ImageProps).ratioMobile?.split("x")[1])}
          preload={isLcp}
        />
        <Source
          media="(min-width: 1025px)"
          fetchPriority={isLcp ? "high" : "low"}
          loading={isLcp ? "eager" : "lazy"}
          src={(creative as ImageProps).imageDesktop}
          width={Number((creative as ImageProps).ratioDesktop?.split("x")[0]) ||
            1440}
          height={Number((creative as ImageProps).ratioDesktop?.split("x")[1])}
          preload={isLcp}
        />
        <img
          class={`object-cover w-full max-w-[100vw] sm:h-full ${
            borderRadius && "rounded-md"
          }`}
          loading={isLcp ? "eager" : "lazy"}
          src={(creative as ImageProps).imageDesktop}
          alt={(creative as ImageProps).altImage ||
            (creative as ImageProps).imageDesktop}
          width={Number((creative as ImageProps).ratioMobile?.split("x")[0]) ||
            1440}
          height={Number((creative as ImageProps).ratioMobile?.split("x")[1])}
        />
      </Picture>
    </a>
  );
}

function VideoComponent({ creative }: Creative, { borderRadius }: Props) {
  return (
    <a
      href={(creative as VideoProps)?.targetHref ?? "#"}
      aria-label={(creative as VideoProps).title ?? ""}
    >
      <div class="w-full block lg:hidden">
        <Video
          src={(creative as VideoProps).videoMobile}
          width={Number((creative as ImageProps).ratioMobile?.split("x")[0]) ||
            414}
          height={Number((creative as ImageProps).ratioMobile?.split("x")[1]) ||
            536}
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
          width={Number((creative as ImageProps).ratioDesktop?.split("x")[0]) ||
            1920}
          height={Number(
            (creative as ImageProps).ratioDesktop?.split("x")[1],
          ) || 700}
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
    </a>
  );
}

function Controls() {
  return (
    <>
      <div class="flex items-center justify-center z-10 col-start-1 row-start-2">
        <Slider.PrevButton class="">
          <Icon
            class="text-base-100"
            size={50}
            id="ChevronLeft"
            strokeWidth={1}
          />
        </Slider.PrevButton>
      </div>
      <div class="flex items-center justify-center z-10 col-start-3 row-start-2">
        <Slider.NextButton class="">
          <Icon
            class="text-base-100"
            size={50}
            id="ChevronRight"
            strokeWidth={1}
          />
        </Slider.NextButton>
      </div>
    </>
  );
}

function Dots(
  { creativeCarousel, interval = 0 }: {
    creativeCarousel: Creative[];
    interval: number | undefined;
  },
) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
              @property --dot-progress {
                syntax: '<percentage>';
                inherits: false;
                initial-value: 0%;
              }
              `,
        }}
      />
      <ul class="flex w-full absolute top-[100%] carousel justify-center col-span-full gap-2 z-10 row-start-4">
        {creativeCarousel?.map((_, index) => (
          <li class="carousel-item">
            <Slider.Dot index={index}>
              <div
                class="my-5 w-2 h-2 rounded-full bg-[rgba(0,0,0,0.2)] group-disabled:bg-[#000] "
                style={{ animationDuration: `${interval}s` }}
              />
            </Slider.Dot>
          </li>
        ))}
      </ul>
    </>
  );
}

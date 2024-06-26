import type { ImageWidget as LiveImage } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

import type { HTML } from "deco-sites/std/components/types.ts";

import HTMLRenderer from "deco-sites/std/components/HTMLRenderer.tsx";

export interface Props {
  image: LiveImage;
  mobileImage?: LiveImage;
  altImage?: string;
  subTitle?: string;
  title: HTML;
  description: HTML;
  callToAction: string;
  href: string;
  isLCP: boolean;
}

interface CardProps extends Props {
  index?: number;
}

function Card(
  {
    image,
    altImage,
    title,
    description,
    callToAction,
    href,
    subTitle = "",
    index = 0,
    mobileImage = "",
    isLCP,
  }: CardProps,
) {
  const isLcp = isLCP && index > 2;
  return (
    <div class={`w-full px-2 lg:px-0`}>
      <a class="block w-full" href={href} aria-label={altImage || image}>
        <Picture preload={isLcp}>
          <Source
            media="(max-width: 1024px)"
            fetchPriority={isLcp ? "high" : "low"}
            loading={isLcp ? "eager" : "lazy"}
            src={mobileImage ? mobileImage : image}
            width={282}
            height={176}
            preload={isLcp}
          />
          <Source
            media="(min-width: 1025px)"
            fetchPriority={isLcp ? "high" : "low"}
            loading={isLcp ? "eager" : "lazy"}
            src={image}
            width={545}
            height={341}
            preload={isLcp}
          />
          <img
            class={`w-full rounded-md`}
            loading={isLcp ? "eager" : "lazy"}
            src={image}
            width={282}
            height={176}
            alt={altImage || image}
          />
        </Picture>
      </a>
      {subTitle &&
        <p class="mt-5 text-sm mb-2.5">{subTitle}</p>}
      <div class="font-bold text-1.5xl pt-2.5 mt-2.5">
        <HTMLRenderer html={title} />
      </div>

      <div
        class="text-sm mt-2.5 overflow-hidden leading-normal child:line-clamp2"
        style={{
          display: "-webkit-box",
          "-webkit-line-clamp": "2",
          "-webkit-box-orient": "vertical",
        }}
      >
        <HTMLRenderer html={description} />
      </div>

      <a
        class="text-sm text-primary underline tracking-wider block mt-2.5"
        href={href}
      >
        {callToAction}
      </a>
    </div>
  );
}

export default Card;

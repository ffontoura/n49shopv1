import type { ImageWidget as LiveImage } from "apps/admin/widgets.ts";
import type { HTML } from "deco-sites/std/components/types.ts";
import Image from "apps/website/components/Image.tsx";
// import Quilltext from "deco-sites/std/components/QuillText.tsx";

import Icon from "deco-sites/australroupas/components/ui/Icon.tsx";
import Button from "deco-sites/australroupas/components/ui/Button.tsx";

import Slider from "deco-sites/australroupas/components/ui/Slider.tsx";
import SliderJS from "deco-sites/australroupas/islands/SliderJS.tsx";

import { useId } from "preact/hooks";

export interface InstagramImage {
  image: LiveImage;
  href: string;
  altText?: string;
}

export interface Props {
  images: InstagramImage[];
  title: HTML;
}

export default function Instafeed({ images, title }: Props) {
  const id = useId();

  return (
    <div class="sm:home-container">
      <div class="home-container-mobile sm:no-container">
        <div dangerouslySetInnerHTML={{ __html: title }} />
      </div>
      <div
        id={id}
        class="grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_48px] relative"
      >
        <Slider class="carousel w-full col-span-full row-span-full scrollbar-none gap-4 sm:gap-0">
          {images.map((image, index) => {
            return (
              <Slider.Item
                index={index}
                class={`relative pl-4 carousel-item w-[80%] sm:w-[24%] first:ml-[15px] last:mr-[15px] sm:first:ml-0 sm:last:mr-0 sm:mx-[0.67%] lg:pl-0`}
              >
                <a
                  class="cursor-pointer"
                  href={image.href}
                  target="_blank"
                  aria-label={image.altText || "Austral Instagram Image"}
                >
                  <Image
                    class="w-full rounded-md"
                    src={image.image}
                    width={290}
                    height={290}
                    alt={image.altText || "Austral Instagram Image"}
                    loading={"lazy"}
                    fetchPriority="low"
                  />
                </a>
              </Slider.Item>
            );
          })}
        </Slider>

        <Controls />

        <SliderJS
          rootId={id}
          interval={0}
          infinite={true}
        />
      </div>
    </div>
  );
}

function Controls() {
  return (
    <>
      <div class="hidden sm:flex items-center justify-center z-10 absolute left-[-50px] top-[calc(50%-25px)]">
        <Slider.PrevButton class="">
          <Icon
            class="text-[#636366]"
            size={50}
            id="ChevronLeft"
            strokeWidth={1}
          />
        </Slider.PrevButton>
      </div>
      <div class="hidden sm:flex items-center justify-center z-10 absolute right-[-50px] top-[calc(50%-25px)]">
        <Slider.NextButton class="">
          <Icon
            class="text-[#636366]"
            size={50}
            id="ChevronRight"
            strokeWidth={1}
          />
        </Slider.NextButton>
      </div>
    </>
  );
}

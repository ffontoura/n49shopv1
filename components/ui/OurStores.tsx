import type { HTML } from "deco-sites/std/components/types.ts";
// import Quilltext from "deco-sites/std/components/QuillText.tsx";

import Image from "apps/website/components/Image.tsx";
import type { ImageWidget as LiveImage } from "apps/admin/widgets.ts";

export interface Store {
  imagePosition: "left" | "right";
  imagePositionMobile: "top" | "bottom";
  image: LiveImage;
  alt?: string;
  text: HTML;
  button: {
    text?: string;
    link?: string;
    openInNewTab?: true | false;
  };
}

export interface Props {
  stores: Store[];
}

export default function OurStores({ stores }: Props) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .title-heading {
              font-size: 18px;
          }

          .description-ourstores {
            padding: 0 10px !important;
          }
          
          @media (min-width: 768px) {
              .title-heading {
                  font-size: 30px;
              }
              .description-ourstores {
                padding: 0 !important;
              }
          }
        `,
        }}
      />
      <div class="sm:home-container home-container-mobile">
        <ul class="flex flex-col gap-10 sm:gap-20 justify-center items-center py-12">
          {stores.map((store) => {
            return <Store store={store} />;
          })}
        </ul>
      </div>
    </>
  );
}

function Store({ store }: { store: Store }) {
  return (
    <div
      class={`${
        store.imagePositionMobile == "bottom" ? "flex-col-reverse" : ""
      } ${
        store.imagePosition == "right" ? "lg:flex-row-reverse" : "lg:flex-row"
      } flex gap-4 sm:gap-28 lg:gap-0 flex-wrap justify-center lg:max-w-[1206px] w-full`}
    >
      <div class="lg:basis-1/2 w-full">
        <Image
          src={store.image}
          alt={store.alt}
          width={570}
          class="rounded-[20px] w-full max-w-[570px]"
        />
      </div>
      <div class="flex flex-col gap-4 justify-center items-center lg:w-[400px] lg:basis-1/2">
        <div dangerouslySetInnerHTML={{ __html: store.text }}>
        </div>
        {store.button.link &&
          store.button.text &&
          (
            <a
              target={store.button.openInNewTab ? "_blank" : "_self"}
              href={store.button.link}
              class="border-[1px] border-primary text-primary hover:text-white hover:bg-primary h-[48px] w-[262px] rounded-md flex justify-center items-center transition duration-300"
            >
              {store.button.text}
            </a>
          )}
      </div>
    </div>
  );
}

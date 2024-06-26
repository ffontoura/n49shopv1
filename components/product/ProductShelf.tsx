import ProductCard from "$store/components/product/ProductCard.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import { SendEventOnLoad } from "$store/sdk/analytics.tsx";
import { useId } from "preact/hooks";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product } from "apps/commerce/types.ts";
import type { HTML } from "deco-sites/std/components/types.ts";
import type { FnContext } from "deco/mod.ts";
// import Quilltext from "deco-sites/std/components/QuillText.tsx";

export interface Props {
  title?: HTML;
  products: LoaderReturnType<Product[] | null>;
  twoItemsPerPage?: true | false;
}

function Shelf({
  title,
  products,
  twoItemsPerPage = false,
  device,
}: Props & { device: string }) {
  const id = useId();

  if (!products || products.length === 0) {
    return null;
  }

  const itemsDesktop = twoItemsPerPage ? "md:w-[50%]" : "sm:w-[25%]";
  const paddingXitemsDesktop = twoItemsPerPage
    ? "lg:pl-[62px] lg:pr-[35px]"
    : "";
  const marginDesktop = twoItemsPerPage ? "mx-[1.25%]" : "mx-[0.67%]";
  const gridRows = title
    ? "grid-rows-[64px_1fr_48px_1fr] pt-10"
    : "grid-rows-[1fr]";

  return (
    <div
      id={id}
      class={`sm:home-container relative grid grid-cols-[48px_1fr_48px] ${gridRows} px-0 ${paddingXitemsDesktop} my-10 mb-10 pb-10`}
    >
      {title &&
        (
          <div class="absolute home-container-mobile sm:home-container">
            <div dangerouslySetInnerHTML={{ __html: title }} />
          </div>
        )}

      <Slider
        class={`carousel carousel-center sm:carousel-end col-span-full row-start-2 row-end-5 snap-always`}
      >
        {products?.map((product, index) => (
          <Slider.Item
            index={index}
            class={`carousel-item w-[80%] ${itemsDesktop} first:ml-[15px] sm:first:ml-0 last:mr-[15px] mx-[2%] lg:mx-0 sm:last:mr-0 sm:${marginDesktop}`}
          >
            <ProductCard
              product={product}
              itemListName={title}
              device={device}
              styleClass="lg:px-1 2xl:px-2"
            />
          </Slider.Item>
        ))}
      </Slider>

      <>
        <div class="hidden relative sm:block z-10 col-start-1 row-start-3">
          <Slider.PrevButton class="absolute left-[-50px]">
            <Icon
              class="text-inherit"
              size={50}
              id="ChevronLeft"
              strokeWidth={1}
            />
          </Slider.PrevButton>
        </div>
        <div class="hidden relative sm:block z-10 col-start-3 row-start-3">
          <Slider.NextButton class="absolute right-[-50px]">
            <Icon
              class="text-inherit"
              size={50}
              id="ChevronRight"
              strokeWidth={1}
            />
          </Slider.NextButton>
        </div>
      </>

      <Dots
        products={products}
        interval={0}
        twoItemsPerPage={twoItemsPerPage}
      />

      <SliderJS rootId={id} infinite={true} />
      <SendEventOnLoad
        event={{
          name: "view_item_list",
          params: {
            item_list_name: title,
            items: products.map((product) =>
              mapProductToAnalyticsItem({
                product,
                ...(useOffer(product.offers)),
              })
            ),
          },
        }}
      />
    </div>
  );
}

function ProductShelf(
  { title, products, twoItemsPerPage, device }: Props & { device: string },
) {
  return (
    <Shelf
      title={title}
      products={products}
      twoItemsPerPage={twoItemsPerPage}
      device={device}
    />
  );
}

export default ProductShelf;

export const loader = (
  props: Props,
  req: Request,
  ctx: FnContext,
) => {
  const device = ctx.device;
  return {
    ...props,
    device: device || "desktop",
  };
};

function Dots(
  { products, interval = 0, twoItemsPerPage = false }: {
    products: Product[];
    interval: number | undefined;
    twoItemsPerPage?: true | false;
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
      <ul class="flex w-full absolute bottom-0 carousel justify-center col-span-full gap-1.5 z-10 row-start-4">
        {products?.map((_, index) => (
          <li
            class={`carousel-item ${
              (index + 1) % 4 != 0 && !twoItemsPerPage && "sm:hidden"
            } ${(index + 1) % 2 != 0 && twoItemsPerPage && "sm:hidden"}`}
          >
            <Slider.Dot index={index}>
              <div
                class={`my-5 w-2 h-2 rounded-full bg-[rgba(0,0,0,0.2)] group-disabled:bg-[#000]`}
                style={{ animationDuration: `${interval}s` }}
              />
            </Slider.Dot>
          </li>
        ))}
      </ul>
    </>
  );
}

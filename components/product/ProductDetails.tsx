import { useId } from "preact/hooks";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/components/ui/SliderJS.tsx";
import ProductSizeTable from "$store/components/product/ProductSizeTable.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { SendEventOnLoad } from "$store/sdk/analytics.tsx";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import type { ProductDetailsPage } from "apps/commerce/types.ts";
import type { LoaderReturnType } from "$live/types.ts";
import ProductSimilarSelector from "./ProductSimilarSelector.tsx";
import ProductSelector from "./ProductVariantSelector.tsx";
import { useQuickView } from "../../sdk/useQuickView.ts";
import ProductImageZoom from "$store/islands/ProductImageZoom.tsx";
import NavigatorShare from "$store/islands/NavigatorShare.tsx";
import AddToCartButton from "$store/islands/AddToCartButton.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import { useVariations } from "../../sdk/useVariantPossiblities.ts";
import { Color } from "$store/components/search/SearchResult.tsx";
import { Table } from "$store/loaders/ProductSizeTable.tsx";
import {
  ComponentProps,
  ProductSizeTableCustom,
} from "deco-sites/fashion/components/product/ProductSizeTableCustom.tsx";

export type Variant = "front-back" | "slider" | "auto";

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
  /**
   * @title Product view
   * @description Ask for the developer to remove this option since this is here to help development only and should not be used in production
   */
  variant?: Variant;
  /** @title Color Configuration */
  colors: Color[];
  /** @title Size Table Configuration */
  tables?: Table[];
  /** @title Size Table Component */
  tableComponentProps?: ComponentProps;
}

export interface MainProps extends Props {
  currentUrl: string;
}

const WIDTH = 424;
const HEIGHT = 635;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

/**
 * Rendered when a not found is returned by any of the loaders run on this page
 */
function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-28">
      <div class="flex flex-col items-center justify-center gap-6">
        <span class="font-medium text-2xl">Página não encontrada</span>
        <a href="/">
          <Button>Voltar à página inicial</Button>
        </a>
      </div>
    </div>
  );
}

function ProductInfo(
  { page, currentUrl, colors, tables, tableComponentProps }: {
    page: ProductDetailsPage;
    currentUrl: string;
    colors: Color[];
    tables: Table[];
    tableComponentProps?: ComponentProps;
  },
) {
  const {
    breadcrumbList,
    product,
  } = page;
  const {
    description,
    productID,
    offers,
    name,
    gtin,
    isVariantOf,
    url,
  } = product;

  const { price, listPrice, seller, installments, availability } = useOffer(
    offers,
  );
  const categories = product.additionalProperty?.filter((property) =>
    property.name === "category"
  );
  const category = categories?.at(-1)?.value;
  const collections = product.additionalProperty?.filter((property) =>
    property.name === "cluster"
  );
  const currentTable = tables?.find(({ collection }) =>
    collections?.find(({ propertyID }) => collection === propertyID)
  );

  const { selectedSku } = useQuickView();
  const { productVariations } = useVariations(product);
  const sizes = productVariations.get("Tamanho");
  const newName = sizes?.find((size) => size.item.sku == selectedSku.value)
    ?.item?.name;

  return (
    <>
      {/* Code and name */}
      <div class="">
        <h1>
          <span class="text-base leading-[140%] tracking-[.04rem] text-info lg:text-[22px]">
            {!selectedSku.value ? isVariantOf?.name : newName}
          </span>
        </h1>
      </div>
      {/* Prices */}
      <div class="mt-5 mb-2.5">
        <div class="flex flex-row gap-2 items-center">
          {formatPrice(listPrice, offers!.priceCurrency!)! >
              formatPrice(price, offers!.priceCurrency!)! &&
            (
              <span class="line-through text-[#878787] text-[14px]">
                {formatPrice(listPrice, offers!.priceCurrency!)}
              </span>
            )}
          <span class="font-bold text-lg text-info">
            {formatPrice(price, offers!.priceCurrency!)}
          </span>
        </div>
        <span class="text-sm text-neutral mt-[5px]">
          ou {installments}
        </span>
      </div>
      {/* Sku Selector */}
      <div>
        <ProductSimilarSelector
          product={product}
          currentUrl={currentUrl}
          productColors={colors ?? []}
        />
      </div>
      <div class="">
        <ProductSelector product={product} selectedID={selectedSku.value} />
      </div>
      {/* <ProductSizeTable category={category!} /> */}
      <ProductSizeTableCustom table={currentTable} {...tableComponentProps} />
      {/* Add to Cart and Favorites button */}
      <div class="flex flex-row items-center gap-2 lg:max-w-[500px]">
        {availability === "https://schema.org/InStock"
          ? (
            <>
              {seller && (
                <AddToCartButton
                  skuId={selectedSku.value!}
                  sellerId={seller}
                  price={price ?? 0}
                  discount={price && listPrice ? listPrice - price : 0}
                  name={product.name ?? ""}
                  productGroupId={product.isVariantOf?.productGroupID ?? ""}
                  openPdp={false}
                  url={""}
                  currentUrl={currentUrl}
                  // disabled={!selectedSku.value}
                />
              )}
            </>
          )
          : <OutOfStock productID={productID} />}
        <NavigatorShare title={name ?? ""} url={url ?? ""} />
      </div>
      {/* Description card */}
      {description && (
        <div class="mt-[30px] pt-5 border-t border-base-100 leading-[140%]">
          <p class="text-sm text-info font-semibold mb-[15px]">
            Descrição do produto
          </p>
          <span
            class="text-sm text-accent leading-[140%]"
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        </div>
      )}
      {/* Analytics Event */}
      <SendEventOnLoad
        event={{
          name: "view_item",
          params: {
            items: [
              mapProductToAnalyticsItem({
                product,
                breadcrumbList,
                price,
                listPrice,
              }),
            ],
          },
        }}
      />
    </>
  );
}

/**
 * Here be dragons
 *
 * bravtexfashionstore (VTEX default fashion account) has the same images for different skus. However,
 * VTEX api does not return the same link for the same image. This causes the image to blink when
 * the user changes the selected SKU. To prevent this blink from happening, I created this function
 * bellow to use the same link for all skus. Example:
 *
 * {
    skus: [
      {
        id: 1
        image: [
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/123/a.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/124/b.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/125/c.jpg"
        ]
      },
      {
        id: 2
        image: [
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/321/a.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/322/b.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/323/c.jpg"
        ]
      }
    ]
  }

  for both skus 1 and 2, we have the same images a.jpg, b.jpg and c.jpg, but
  they have different urls. This function returns, for both skus:

  [
    "https://bravtexfashionstore.vtexassets.com/arquivos/ids/321/a.jpg",
    "https://bravtexfashionstore.vtexassets.com/arquivos/ids/322/b.jpg",
    "https://bravtexfashionstore.vtexassets.com/arquivos/ids/323/c.jpg"
  ]

  This is a very catalog dependent function. Feel free to change this as you wish
 */
const useStableImages = (product: ProductDetailsPage["product"]) => {
  const imageNameFromURL = (url = "") => {
    const segments = new URL(url).pathname.split("/");
    return segments[segments.length - 1];
  };

  const images = product.image ?? [];
  const allImages = product.isVariantOf?.hasVariant.flatMap((p) => p.image)
    .reduce((acc, img) => {
      if (img?.url) {
        acc[imageNameFromURL(img.url)] = img.url;
      }
      return acc;
    }, {} as Record<string, string>) ?? {};

  return images.map((img) => {
    const name = imageNameFromURL(img.url);

    return { ...img, url: allImages[name] ?? img.url };
  });
};

function Details({
  page,
  variant,
  currentUrl,
  colors,
  tables,
  tableComponentProps,
}: {
  page: ProductDetailsPage;
  variant: Variant;
  currentUrl: string;
  colors: Color[];
  tables: Table[];
  tableComponentProps?: ComponentProps;
}) {
  const { product, breadcrumbList } = page;
  const id = `product-image-gallery:${useId()}`;
  const images = useStableImages(product);

  const {
    offers,
  } = product;

  const { price, listPrice } = useOffer(
    offers,
  );

  const discount = listPrice && price
    ? ((listPrice - price) * 100) / listPrice
    : 0;

  /**
   * Product slider variant
   *
   * Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
   * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
   * we rearrange each cell with col-start- directives
   */
  if (variant === "slider") {
    return (
      <>
        <div class="px-[15px] py-2.5 lg:px-0 lg:pb-5">
          {/* Breadcrumb */}
          <Breadcrumb
            itemListElement={breadcrumbList?.itemListElement.slice(0, -1)}
          />
        </div>
        <div
          id={id}
          class="grid grid-cols-1 lg:flex"
        >
          {/* Image Slider */}
          <div class="relative sm:col-start-2 sm:col-span-1 sm:row-start-1 lg:w-full lg:basis-[70%] max-w-[1000px]">
            {discount >= 1 &&
              (
                <div class="absolute text-white text-[11px] font-bold text-center flex justify-center items-center bg-[#b3b2b7] p-[5px_20px] pointer-events-none rounded-[6px]">
                  {discount.toFixed(0)}% OFF
                </div>
              )}
            {/* Mobile */}
            <Slider class="carousel carousel-center w-screen lg:hidden">
              {images.map((img, index) => (
                <Slider.Item
                  index={index}
                  class="carousel-item min-w-[100vw] sm:min-w-[40vw]"
                >
                  <Image
                    class="w-full"
                    sizes="(max-width: 640px) 100vw, 40vw"
                    style={{ aspectRatio: ASPECT_RATIO }}
                    src={img.url!}
                    alt={img.alternateName}
                    width={WIDTH}
                    height={HEIGHT}
                    // Preload LCP image for better web vitals
                    preload={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "low"}
                  />
                </Slider.Item>
              ))}
            </Slider>

            {/* Desktop */}
            <div class="hidden lg:flex flex-wrap gap-[5px]">
              {images.map((img, index) => (
                <ProductImageZoom
                  image={img.url!}
                  width={WIDTH}
                  height={HEIGHT}
                  aspectRatio={ASPECT_RATIO}
                  index={index}
                  alternativeText={img.alternateName!}
                />
              ))}
            </div>

            <Slider.PrevButton
              class="no-animation absolute left-2 top-1/2 lg:hidden"
              disabled
            >
              <Icon size={38} id="ChevronLeft" strokeWidth={.7} />
            </Slider.PrevButton>

            <Slider.NextButton
              class="no-animation absolute right-2 top-1/2 lg:hidden"
              disabled={images.length < 2}
            >
              <Icon size={38} id="ChevronRight" strokeWidth={.7} />
            </Slider.NextButton>

            <div class="absolute top-2 right-2 bg-base-100 rounded-full">
            </div>
          </div>

          {/* Dots */}
          <ul class="flex lg:hidden gap-2 justify-center overflow-auto px-4 sm:px-0 sm:flex-col sm:col-start-1 sm:col-span-1 sm:row-start-1">
            {images.map((_, index) => (
              <li
                class={`carousel-item ${(index + 1) % 4 != 0 && "sm:hidden"}`}
              >
                <Slider.Dot index={index}>
                  <div
                    class={`my-4 w-2 h-2 rounded-full bg-[rgba(0,0,0,0.2)] group-disabled:bg-[#000]`}
                    style={{ animationDuration: `${0}s` }}
                  />
                </Slider.Dot>
              </li>
            ))}
          </ul>

          {/* Product Info */}
          <div class="relative px-4 sm:pr-0 sm:pl-6 sm:col-start-3 sm:col-span-1 sm:row-start-1 lg:w-full lg:basis-[41%] lg:px-0 lg:ml-[40px] lg:sticky lg:top-[136px] lg:h-full lg:max-w-[500px]">
            <ProductInfo
              page={page}
              currentUrl={currentUrl}
              colors={colors}
              tables={tables}
              tableComponentProps={tableComponentProps}
            />
          </div>
        </div>
        <SliderJS rootId={id}></SliderJS>
      </>
    );
  }

  /**
   * Product front-back variant.
   *
   * Renders two images side by side both on mobile and on desktop. On mobile, the overflow is
   * reached causing a scrollbar to be rendered.
   */
  return (
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-[50vw_25vw] sm:grid-rows-1 sm:justify-center">
      {/* Image slider */}
      <ul class="carousel carousel-center gap-6">
        {[images[0], images[1] ?? images[0]].map((img, index) => (
          <li class="carousel-item min-w-[100vw] sm:min-w-[24vw]">
            <Image
              sizes="(max-width: 640px) 100vw, 24vw"
              style={{ aspectRatio: ASPECT_RATIO }}
              src={img.url!}
              alt={img.alternateName}
              width={WIDTH}
              height={HEIGHT}
              // Preload LCP image for better web vitals
              preload={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </li>
        ))}
      </ul>

      {/* Product Info */}
      <div class="px-4 sm:pr-0 sm:pl-6">
        <ProductInfo
          page={page}
          currentUrl={currentUrl}
          colors={colors}
          tables={tables}
        />
      </div>
    </div>
  );
}

function ProductDetails(
  {
    page,
    variant: maybeVar = "auto",
    currentUrl,
    colors,
    tables = [],
    tableComponentProps,
  }: MainProps,
) {
  /**
   * Showcase the different product views we have on this template. In case there are less
   * than two images, render a front-back, otherwhise render a slider
   * Remove one of them and go with the best suited for your use case.
   */
  const variant = maybeVar === "auto"
    ? page?.product.image?.length && page?.product.image?.length < 2
      ? "front-back"
      : "slider"
    : maybeVar;

  return (
    <div class="sm:home-container py-0 lg:pb-15">
      {page
        ? (
          <Details
            page={page}
            variant={variant}
            currentUrl={currentUrl}
            colors={colors}
            tables={tables}
            tableComponentProps={tableComponentProps}
          />
        )
        : <NotFound />}
    </div>
  );
}

export default ProductDetails;

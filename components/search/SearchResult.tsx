import Filters from "$store/components/search/Filters.tsx";
import { SendEventOnLoad } from "$store/sdk/analytics.tsx";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";
import type { HTML } from "deco-sites/std/components/types.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import ProductGallery from "$store/islands/ProductGallery.tsx";
import SearchControls from "$store/islands/SearchControls.tsx";
import NotFound from "deco-sites/fashion/islands/NotFound.tsx";
import { SelectedFacet } from "apps/vtex/utils/types.ts";

export interface SeoText {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;
  title?: string;
  description?: HTML;
}

export interface Props {
  /**
  * @title Persist Selected Facets
  */
  selectedFacets?: SelectedFacet[];
  page: LoaderReturnType<ProductListingPage | null>;
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  pageType?: "Category" | "Search";
  SeoTexts?: SeoText[];
  filtersColor: Color[];
  
}

export interface MainProps extends Props {
  /**
   * @description Texto para página não encontrada
   */
  headingText?: string;
  SeoText?: SeoText;
  filtersColor: Color[];
}

export interface Color {
  /**
   * @title Color name
   */
  label: string;
  /**
   * @title Color
   * @format color
   */
  hex?: string;
  /**
   * @title Image
   */
  src?: ImageWidget;
}

function Result({
  page,
  variant,
  pageType = "Category",
  headingText = "",
  filtersColor,
  SeoText = { matcher: "", title: "", description: "" },
  device,
  selectedFacets
}: Omit<MainProps, "page"> & { page: ProductListingPage; device: string }) {
  const { products, filters, breadcrumb, sortOptions } = page;
  const marginLeft = pageType == "Category" ? "sm:ml-[80px]" : "";

  return (
    <>
      {products.length > 0
        ? (
          <>
            <div class="home-container-mobile lg:home-container px-4 sm:pb-10">
              <SearchControls
                sortOptions={sortOptions}
                filters={filters}
                filtersColor={filtersColor ?? []}
                breadcrumb={breadcrumb}
                displayFilter={variant === "drawer"}
                quantityOfProducts={page.pageInfo.records}
              />

              <div class="flex flex-row">
                {variant === "aside" && filters.length > 0 && (
                  <aside class="hidden sm:block w-min min-w-[20%] sticky h-full top-[120px]">
                    <Filters
                      filters={filters}
                      filtersColor={filtersColor ?? []}
                    />
                  </aside>
                )}
                <div class={`flex-grow ${marginLeft && marginLeft}`}>
                  <ProductGallery
                    pageType={pageType}
                    page={page}
                    device={device}
                    selectedFacets={selectedFacets}
                  />
                  {SeoText.title &&
                    SeoText.description &&
                    (
                      <div>
                        <h1 class="text-xl capitalize text-black font-bold text-center mb-5">
                          {SeoText.title}
                        </h1>
                        <div class="text-base text-[#3A3A3C] text-center tracking-[.1px] leading-[1.2]">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: SeoText.description,
                            }}
                          />
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
            <SendEventOnLoad
              event={{
                name: "view_item_list",
                params: {
                  // TODO: get category name from search or cms setting
                  item_list_name: "",
                  item_list_id: "",
                  items: page.products?.map((product) =>
                    mapProductToAnalyticsItem({
                      ...(useOffer(product.offers)),
                      product,
                      breadcrumbList: page.breadcrumb,
                    })
                  ),
                },
              }}
            />
          </>
        )
        : <NotFound headingText={headingText} />}
    </>
  );
}

function SearchResult(
  { device, page, ...props }: MainProps & { device: string },
) {
  if (!page) {
    return <NotFound headingText={props.headingText || ""} />;
  }
  const { filtersColor } = props;
  const filteredPageProps: ProductListingPage = {
    "@type": "ProductListingPage",
    breadcrumb: page.breadcrumb,
    filters: page.filters,
    pageInfo: page.pageInfo,
    sortOptions: page.sortOptions,
    seo: page?.seo,
    products: page.products.map((product) => {
      return {
        "@type": "Product",
        productID: product.productID,
        url: product.url,
        name: product.name,
        isVariantOf: {
          "@type": "ProductGroup",
          additionalProperty: [],
          hasVariant: product.isVariantOf!.hasVariant,
          name: product.isVariantOf!.name,
          productGroupID: product.isVariantOf!.productGroupID,
          url: product.isVariantOf!.url,
        },
        image: [
          // @ts-expect-error: type
          product.image[0],
          // @ts-expect-error: type
          product.image[1],
        ],
        sku: product.sku,
        offers: product.offers,
      };
    }),
  };

  return (
    <Result
      {...props}
      page={filteredPageProps}
      device={device}
      filtersColor={filtersColor}
    />
  );
}

export default SearchResult;

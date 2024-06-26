import { useEffect, useRef, useState } from "preact/hooks";
import ProductCard from "deco-sites/australroupas/components/product/ProductCard.tsx";
import type { ProductListingPage } from "apps/commerce/types.ts";

import { invoke } from "../../runtime.ts";
import Spinner from "../ui/Spinner.tsx";
import { SelectedFacet, Sort } from "apps/vtex/utils/types.ts";

interface Options {
  page: ProductListingPage | null;
  pageType?: "Category" | "Search";
  /**
   * @title Persist Selected Facets
   */
  selectedFacets?: SelectedFacet[];
}

const usePaginationController = ({ page, selectedFacets }: Options) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState([page]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancel = false;

    if (!ref.current) return;

    const observer = new IntersectionObserver(async ([entry]) => {
      if (entry?.isIntersecting) {
        try {
          const pageNumber = pages.length + 2;

          const url = new URL(window.location.href);
          url.searchParams.set("page", pageNumber.toString());
          setLoading(true);

          const maybePage = await invoke.vtex.loaders.intelligentSearch
            .productListingPage({
              count: 0,
              page: pageNumber,
              pageHref: window.location.href,
              selectedFacets: selectedFacets ?? [],
            });

          // Prevent self-ddos
          if (
            maybePage && !cancel && maybePage.products &&
            maybePage.products.length > 0
          ) {
            setPages((pages) => {
              const maybePageWithoutDuplicatedProducts = {
                ...maybePage,
                products: maybePage.products.filter(({ sku }) =>
                  ![...pages]?.find((pageProp) =>
                    pageProp?.products?.find((pageProduct) =>
                      pageProduct.sku === sku
                    )
                  )
                ), // Remove duplicated products
              };

              return [...pages, maybePageWithoutDuplicatedProducts];
            });
          }
        } catch (error) {
          console.info("Failed to fetch more products with error", error);
        } finally {
          !cancel && setLoading(false);
        }
      }
    }, { rootMargin: "1000px" });

    observer.observe(ref.current);

    return () => {
      cancel = true;
      observer.disconnect();
    };
  }, [pages.length]);

  return { pages, loading, ref };
};

export default function Gallery(props: Options & { device: string }) {
  const { pages, loading, ref } = usePaginationController(props);

  const { pageType } = props;

  const itemsLine = pageType == "Category"
    ? "lg:grid-cols-3"
    : "lg:grid-cols-4";

  return (
    <div>
      <div
        class={`grid grid-cols-2 gap-2 items-center sm:gap-5 ${
          itemsLine && itemsLine
        }`}
      >
        {pages.map((page) =>
          page?.products.map((product, index) => (
            <div class="w-full list-none ">
              <ProductCard
                product={product}
                preload={index < 4}
                device={props.device}
              />
            </div>
          ))
        )}
      </div>

      <div
        ref={ref}
        class={[
          loading ? "visible" : "invisible",
          "grid place-items-center w-full  my-16",
          "text-[#252526] tracking-[1px] font-semibold overflow-hidden capitalize text-[14px] 15xl:text-[16px] min-h-[50px]",
        ].join(" ")}
      >
        <Spinner />
      </div>
    </div>
  );
}

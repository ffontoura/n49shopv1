import Avatar from "$store/components/ui/Avatar.tsx";
import { useSignal } from "@preact/signals";
import type { ProductGroup } from "apps/commerce/types.ts";
import { useOffer } from "$store/sdk/useOffer.ts";

import Button from "$store/components/ui/Button.tsx";
import {
  Options as UseAddToCartProps,
  useAddToCart,
} from "$store/sdk/useAddToCart.ts";

interface Props extends UseAddToCartProps {
  /**
   * @description Product id
   */
  sellerId: string;
  openPdp: boolean;
  url: string;
}

type Variant = [string, string[]];

export default function ProductCardButton(
  { isVariantOf, variants, urlInStock }: {
    isVariantOf: ProductGroup | undefined;
    variants: Variant[];
    urlInStock: string | undefined;
  },
) {
  const productGroupID = isVariantOf?.productGroupID;

  const selectedUrl = useSignal("");

  const selected = useSignal({
    skuId: "",
    sellerId: "",
    price: 0,
    discount: 0,
    name: "",
    productGroupId: "",
  });

  return (
    <figcaption class=" absolute bottom-0 left-0 w-full transition-opacity bg-[rgba(255,255,255,0.8)] hidden sm:group-hover:block py-3 px-4">
      {/* SKU Selector */}
      <ul class="flex justify-center items-center flex-wrap gap-2 w-full">
        {variants.map(([value, [link]]) => {
          const currentProduct = isVariantOf?.hasVariant.filter(
            (variant) => variant.url == link,
          )!;
          const { listPrice, price, seller, availability } = useOffer(
            currentProduct[0].offers,
          );
          return (
            <button
              disabled={availability == "https://schema.org/OutOfStock"}
              onClick={() => {
                selectedUrl.value = link;
                selected.value = {
                  skuId: currentProduct[0].productID,
                  sellerId: seller ?? "1",
                  price: price ?? 0,
                  discount: price && listPrice ? listPrice - price : 0,
                  name: currentProduct[0].name ?? "",
                  productGroupId: productGroupID ?? "",
                };
              }}
            >
              <Avatar
                variant={availability == "https://schema.org/OutOfStock"
                  ? "disabled"
                  : link === selectedUrl.value
                  ? "active"
                  : "default"}
                content={value}
              />
            </button>
          );
        })}
      </ul>
      <AddToCartButtonShelf
        skuId={selected.value.skuId}
        sellerId={selected.value.sellerId}
        price={selected.value.price}
        discount={selected.value.discount}
        name={selected.value.name}
        productGroupId={selected.value.productGroupId}
        openPdp={selected.value.skuId == ""}
        url={urlInStock || ""}
      />
    </figcaption>
  );
}

function AddToCartButtonShelf(
  { skuId, sellerId, discount, price, productGroupId, name, openPdp, url }:
    Props,
) {
  const props = useAddToCart({
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
  });

  const classBtn =
    "flex justify-center items-center w-full bg-primary border-none text-white py-3 px-2.5 rounded-md mt-3 hover:bg-primary hover:opacity-80";

  if (openPdp) {
    return (
      <a
        href={url}
        class={classBtn}
      >
        Adicionar à Sacola
      </a>
    );
  }

  return (
    <Button
      data-deco="add-to-cart"
      {...props}
      class={classBtn}
    >
      Adicionar à Sacola
    </Button>
  );
}

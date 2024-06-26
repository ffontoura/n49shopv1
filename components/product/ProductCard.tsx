import Image from "apps/website/components/Image.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { SendEventOnClick } from "deco-sites/australroupas/components/Analytics.tsx";
import type { Product } from "apps/commerce/types.ts";
import ProductCardButton from "deco-sites/australroupas/islands/ProductCardButton.tsx";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;
  index?: number;
  device: string;
  styleClass?: string;
}

const WIDTH = 338;
const HEIGHT = 506;

function sortSizes(a: [string, string[]], b: [string, string[]]) {
  const sizeOrder = ["U", "XPP", "PP", "P", "M", "G", "GG"];
  const indexA = sizeOrder.findIndex((size) =>
    size.toUpperCase() === a[0].toUpperCase()
  );
  const indexB = sizeOrder.findIndex((size) =>
    size.toUpperCase() === b[0].toUpperCase()
  );
  if (indexA === -1 && indexB === -1) {
    return 0;
  }
  if (indexA === -1) {
    return 1;
  }

  if (indexB === -1) {
    return -1;
  }

  return indexA - indexB;
}

function ProductCard(
  { product, preload, itemListName, index, device, styleClass }: Props,
) {
  const {
    url,
    productID,
    name,
    image: images,
    offers,
    isVariantOf,
  } = product;
  let groupName = "";
  if (isVariantOf?.hasVariant) {
    groupName = isVariantOf.name!;
  }

  const [front, back] = images ?? [];

  const possibilities = useVariantPossibilities(product);
  const variants = Object.entries(Object.values(possibilities)[1] ?? {})?.sort(
    sortSizes,
  );

  const findFirstOffersAvailable = isVariantOf?.hasVariant.find((variant) => {
    return variant.offers?.offers[0].availability ==
      "https://schema.org/InStock";
  })?.offers;

  const { listPrice, price, installments } = useOffer(findFirstOffersAvailable);

  const findStock = isVariantOf?.hasVariant.filter((variant) =>
    variant.offers?.offers[0].availability == "https://schema.org/InStock"
  );

  const discount = listPrice && price
    ? ((listPrice - price) * 100) / listPrice
    : 0;

  let newInstallment = "";
  if (installments == null) {
    // deno-lint-ignore no-explicit-any
    const validOffer = (isVariantOf as any)?.hasVariant.find((variant: any) =>
      variant?.offers?.offers[0].availability == "https://schema.org/InStock"
      // deno-lint-ignore no-explicit-any
    )?.offers?.offers[0].priceSpecification?.filter((specification: any) =>
      specification.name == "Mastercard"
    );

    // Check if there are valid offers before accessing the last one
    if (validOffer && validOffer.length > 0) {
      const lastOffer = validOffer[validOffer.length - 1];
      newInstallment = `${lastOffer.billingDuration}x de ${
        formatPrice(lastOffer.billingIncrement, offers!.priceCurrency!)
      }`;
    }
  }

  const id = `product-card-${productID}`;

  return (
    <div
      class={`card card-compact card-bordered border-transparent group w-full rounded-md ${
        styleClass ? styleClass : ""
      }`}
      data-deco="view-product"
      id={`product-card-${productID}`}
    >
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                price,
                listPrice,
                index,
              }),
            ],
          },
        }}
      />
      <figure
        class="relative h-full"
        style={{ paddingBottom: `${(HEIGHT / WIDTH) * 100}%` }}
      >
        {discount >= 1 &&
          (
            <div class="absolute z-20 w-[14%] top-[1vw] right-[1vw] text-white text-[11px] font-bold text-center flex justify-center items-center bg-[#b3b2b7] p-[5px_20px] pointer-events-none rounded-[6px]">
              {discount.toFixed(0)}% <br /> OFF
            </div>
          )}
        {/* Product Images */}
        <a
          href={findStock && findStock[0]
            ? findStock[0].url!.split("?")[0]
            : url}
          aria-label="view product"
          class="contents"
        >
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class="absolute transition-opacity rounded-md w-full block sm:group-hover:hidden z-10 top-0"
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={"eager"}
            fetchPriority={"high"}
            decoding="sync"
          />
          <Image
            src={back?.url ?? front.url!}
            alt={back?.alternateName ?? front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class="absolute transition-opacity rounded-md w-full hidden sm:block top-0"
            sizes="(max-width: 640px) 50vw, 20vw"
            loading={"eager"}
            fetchPriority={"high"}
            decoding="sync"
          />
        </a>
        {device === "desktop" && (
          <ProductCardButton
            isVariantOf={isVariantOf}
            variants={variants}
            urlInStock={findStock && findStock[0] ? findStock[0].url : ""}
          />
        )}
      </figure>
      {/* Prices & Name */}
      <div class="py-2.5">
        <h2
          class="overflow-hidden text-[14px]"
          style={{
            "-webkit-line-clamp": "1",
            "-webkit-box-orient": "vertical",
            display: "-webkit-box",
          }}
        >
          {groupName != "" ? groupName : name}
        </h2>
        <div class="flex items-end gap-2">
          {listPrice != price && (
            <span class="text-[12px] text-[#878787] line-through self-center">
              {formatPrice(listPrice, offers!.priceCurrency!)}
            </span>
          )}
          <span class="text-[14px] font-semibold">
            {formatPrice(price, offers!.priceCurrency!)}
          </span>
          <span class="hidden lg:block text-[14px] text-[#878787]">
            {installments || newInstallment || ""}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

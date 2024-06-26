import Avatar from "deco-sites/australroupas/components/ui/AvatarPDP.tsx";
import { useVariations } from "deco-sites/australroupas/sdk/useVariantPossiblities.ts";
import { inStock } from "deco-sites/australroupas/sdk/useOffer.ts";
import { useQuickView } from "../../sdk/useQuickView.ts";
import type { Product } from "apps/commerce/types.ts";

const capitalizeString = (str: string) =>
  str.toLowerCase().replace(
    /(?:^|\s|["'([{])+\S/g,
    (match) => match.toUpperCase(),
  );

interface Props {
  product: Product;
  selectedID?: string;
  isQuickView?: boolean;
}

const SelectorRow = ({
  name,
  values,
  selected,
  onSelect,
  isQuickView,
}: {
  name: "Cor" | "Tamanho";
  selected: number;
  values: Array<{
    content: string;
    disabled?: boolean;
    value: string;
    url: string;
  }>;
  onSelect?: (index: number) => void;
  isQuickView?: boolean;
}) => {
  const maybeVal = values[selected]?.value;

  return (
    <li class="flex flex-col gap-2">
      <p class="text-sm mt-[10px]">
        {name}:{" "}
      </p>
      <ul class="flex flex-row flex-wrap gap-1.5">
        {values.map(({ content, url, disabled }, index) => {
          return (
            <li>
              <Avatar
                // deno-lint-ignore ban-ts-comment
                // @ts-expect-error
                onClick={(e) => {
                  if (name !== "Cor" || isQuickView) {
                    e.preventDefault();
                    e.stopPropagation();
                    onSelect?.(index);
                  }
                }}
                variant={(name === "Tamanho" && maybeVal === content) ||
                    (name !== "Tamanho" && selected === index)
                  ? "active"
                  : (
                    !disabled ? "PDP" : "disabled"
                  )}
                content={content}
                selected={(name === "Tamanho" && maybeVal === content) ||
                  (name !== "Tamanho" && selected === index)}
                disabled={disabled}
              />
            </li>
          );
        })}
      </ul>
    </li>
  );
};

function VariantSelector(
  { product, selectedID, isQuickView }: Props,
) {
  const { select } = useQuickView();
  const { productVariations } = useVariations(
    product,
  );
  const sizes = productVariations.get("Tamanho");

  const colors = [product];

  product.isSimilarTo?.forEach((similar) => {
    const colorString = similar.additionalProperty?.find((property) =>
      property.name == "Cor Básica" || property.name == "Cor"
    )?.value || "";

    const colorGroupId = similar.isVariantOf?.productGroupID;

    const alreadyIn = colors.findIndex((c) => {
      const inColor = c.additionalProperty?.find((property) =>
        property.name == "Cor Básica" || property.name == "Cor"
      )?.value || "";

      if (
        inColor.toLowerCase() === colorString.toLowerCase() &&
        colorGroupId === c.isVariantOf?.productGroupID
      ) {
        return true;
      }
    });

    if (alreadyIn !== -1) {
      return;
    }

    const hasStock = similar.offers?.offers[0].availability ==
      "https://schema.org/InStock";

    if (hasStock) {
      colors.push(similar);
    }
  });

  sizes?.sort((a, b) => {
    const sizeOrder = ["U", "XPP", "PP", "P", "M", "G", "GG"];
    const indexA = sizeOrder.findIndex((size) =>
      size.toUpperCase() === a.property?.value?.toUpperCase()
    );
    const indexB = sizeOrder.findIndex((size) =>
      size.toUpperCase() === b.property?.value?.toUpperCase()
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
  });

  if (sizes?.length === 1) {
    const [uniqueSize] = sizes;
    const { productID } = uniqueSize.item;
    if (productID) {
      select({ productID });
    }
  }

  return (
    <ul class="flex flex-col gap-8">
      {
        /* {colors && (
        <SelectorRow
          name="Cor"
          selected={0}
          values={colors.map((i) => {
            const imageIndex = i.image?.findIndex((item) =>
              item?.alternateName?.includes("thumb") ||
              item?.alternateName?.includes("_9")
            );

            const content = i.image?.[imageIndex || -1]?.url ?? "";

            const colorString = i.additionalProperty?.find((property) =>
              property.name == "Cor Básica" || property.name == "Cor"
            )!.value || "";

            return {
              content: content ?? "",
              value: capitalizeString(colorString),
              url: i.url!,
            };
          })}
          onSelect={(index) => {
            const p = colors[index];
            const productGroupID = p.isVariantOf?.productGroupID;

            if (!productGroupID) {
              return;
            }

            select({ productGroupID });
          }}
          isQuickView={isQuickView}
        />
      )} */
      }
      {sizes &&
        (
          <SelectorRow
            name="Tamanho"
            selected={sizes.findIndex((i) => i.item.productID === selectedID)}
            values={sizes.map((i) => ({
              content: i.property.value!,
              value: i.property.value!,
              url: i.item.url!,
              disabled: !inStock(i.item.offers),
            }))}
            onSelect={(index) => {
              const p = sizes[index].item;

              const productID = p.productID;
              if (!productID) {
                return;
              }

              select({ productID });
            }}
          />
        )}
    </ul>
  );
}

export default VariantSelector;

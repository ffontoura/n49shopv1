import Avatar from "$store/components/ui/Avatar.tsx";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { Color } from "$store/components/search/SearchResult.tsx";

interface Props {
  product: Product;
  currentUrl: string;
  productColors?: Color[];
}

function VariantSelector(
  { product, product: { url }, currentUrl, productColors = [] }: Props,
) {
  const possibilities = useVariantPossibilities(product);

  return (
    <>
      <ul class="flex flex-col gap-3">
        {Object.keys(possibilities).map((name) => {
          if (name == "Cor") {
            const currentColor = product.additionalProperty!.find((property) =>
              property.name === "Cor"
            )!.value || "";
            const colors: string[] = [currentColor];
            const similarToBeRendered: Product[] = [product];

            product.isSimilarTo?.forEach((similar) => {
              const color = similar.additionalProperty!.find((property) =>
                property.name == "Cor"
              )!.value || "";

              if (!colors.includes(color)) {
                colors.push(color);
                similarToBeRendered.push(similar);
              }
            });

            similarToBeRendered.sort((a, b) => {
              const colorA = a.additionalProperty?.find((prop) =>
                prop.name === "Cor"
              )?.value || "";
              const colorB = b.additionalProperty?.find((prop) =>
                prop.name === "Cor"
              )?.value || "";

              return colorA.localeCompare(colorB);
            });

            return (
              <>
                {similarToBeRendered.length > 1 &&
                  (
                    <li class="flex flex-col gap-2">
                      <span class="text-sm">{name}:</span>
                      <ul class="flex flex-row gap-1.5">
                        {similarToBeRendered.map((similar) => {
                          const color =
                            similar.additionalProperty!.find((property) =>
                              property.name === "Cor"
                            )!.value || "";
                          const matchedColor = productColors.find((_color) =>
                            _color.label.toLowerCase() === color.toLowerCase()
                          );
                          return (
                            <li>
                              <a
                                aria-label={name}
                                alt={name}
                                href={similar.url!.split("?")[0]}
                              >
                                <Avatar
                                  content={matchedColor?.hex ?? ""}
                                  imageColor={matchedColor?.src ?? ""}
                                  variant={currentUrl.includes(
                                      similar.url!.split("?")[0],
                                    )
                                    ? "active"
                                    : "PDP"}
                                  name={name}
                                  disponibility={true}
                                />
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  )}
              </>
            );
          }
        })}
      </ul>
    </>
  );
}

export default VariantSelector;

import Avatar from "$store/components/ui/Avatar.tsx";
import { parseRange } from "deco-sites/std/utils/filters.ts";
import { formatPrice } from "$store/sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { Color } from "$store/components/search/SearchResult.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";

interface Props {
  filters: ProductListingPage["filters"];
  filtersColor: Color[];
}

export type FilterToggleValueWithHexAndName = FilterToggleValue & {
  name?: string;
  hex?: string;
  src?: string;
};

type FilterValuesProps = {
  key: string;
  values: FilterToggleValueWithHexAndName[];
  filtersColor: Color[];
};

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label, quantity, name, hex, src }:
    FilterToggleValueWithHexAndName,
) {
  return (
    <li style={{ width: "100%" }}>
      <a href={url} class="flex items-center gap-2 w-full">
        {name != "Departments" && name != "cor" &&
          (
            <>
              <div
                aria-checked={selected}
                class="checkbox checkbox-primary rounded w-[18px] h-[18px] border-[#878787]"
              >
              </div>
              <span class="text-sm text-[#636366] py-[5px] px-[10px]">
                {label}
              </span>
            </>
          )}
        {name === "cor" &&
          (
            <>
              <div
                class={`checkbox rounded flex justify-center items-center w-[18px] h-[18px] ${
                  selected ? "border-[#5881CA]" : "border-[#878787]"
                } p-[2px]`}
                title={label.toUpperCase()}
              >
                {src ? <img class="h-full w-full" src={src} /> : (
                  <div
                    style={{ backgroundColor: hex }}
                    class="h-full w-full"
                  />
                )}
              </div>
              <span
                class={`text-sm py-[5px] px-[10px] ${
                  selected ? "text-[#5881CA]" : "text-[#636366]"
                }`}
              >
                {label}
              </span>
            </>
          )}
        {name == "Categories" &&
          <span class="text-sm text-[#636366] py-[5px]">{label}</span>}
        {name == "Categories" &&
          quantity > 0 && (
          <span class="text-sm text-base-300">({quantity})</span>
        )}
      </a>
    </li>
  );
}

function FilterValues({ key, values, filtersColor }: FilterValuesProps) {
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";
  const name = key;

  const matchingColors: FilterToggleValueWithHexAndName[] = values?.map(
    (value) => {
      const matchedColor = filtersColor.find(
        (color) => color.label.toLowerCase() === value.label.toLowerCase(),
      );
      if (matchedColor) {
        return {
          ...value,
          hex: matchedColor.hex,
          src: matchedColor.src,
        };
      } else {
        return value;
      }
    },
  );

  if (key === "price") {
    matchingColors.sort((a, b) => {
      const rangeA = parseRange(a.value);
      const rangeB = parseRange(b.value);
      if (rangeA!.from < rangeB!.from) {
        return -1;
      }
      if (rangeA!.from > rangeB!.from) {
        return 1;
      }
      return 0;
    });
  }

  return (
    <ul class={`flex flex-wrap gap-2 pb-[15px] ${flexDirection}`}>
      {matchingColors.map((item) => {
        if (key === "price") {
          const range = parseRange(item.value);
          return range && (
            <ValueItem
              {...item}
              label={`Preço (${formatPrice(range.from)} - ${
                formatPrice(range.to)
              })`}
              name={name}
            />
          );
        }
        if (key === "cor") {
          const { hex, src } = item;
          return (
            <ValueItem
              {...item}
              hex={hex}
              src={src}
              name={name}
            />
          );
        }

        return <ValueItem {...item} name={name} />;
      })}
    </ul>
  );
}

const beautifyName = (name: string) => {
  if (name == "Departments") return "Categorias";
  if (name == "Brands") return "Marcas";
  if (name == "Cor") return "Cor";
  if (name == "Tamanho") return "Tamanho";
  if (name == "Preço") return "Faixa de preço";

  return name;
};

function Filters({ filters, filtersColor = [] }: Props) {
  return (
    <div>
      <p class="text-lg lg:text-[30px] font-bold mb-5">Filtrar por</p>
      <ul class="flex flex-col overflow-y-scroll h-[calc(100vh-160px)] container-filter">
        {filters
          .filter(isToggle)
          .map((filter) => {
            if (filter.label == "Marca") return <></>;

            return (
              <li>
                <details class="flex flex-col border-b border-b-[#C7C7CC]">
                  <summary
                    class="filter cursor-pointer relative py-[15px] text-[#636366] text-sm lg:text-base"
                    style={{
                      color: beautifyName(filter.label) == "Categorias"
                        ? "#5881CA"
                        : "inherit",
                    }}
                  >
                    <p>{beautifyName(filter.label)}</p>
                  </summary>
                  <FilterValues {...filter} filtersColor={filtersColor} />
                </details>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Filters;

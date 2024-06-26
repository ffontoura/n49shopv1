import { useMemo } from "preact/hooks";
import { ProductListingPage } from "apps/commerce/types.ts";
import type { JSX } from "preact";
import { useSignal } from "@preact/signals";

const SORT_QUERY_PARAM = "sort";

const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(window.location?.search);
    return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
  }, []);

// TODO: Replace with "search utils"
const applySort = (e: JSX.TargetedEvent<HTMLButtonElement, Event>) => {
  const urlSearchParams = new URLSearchParams(window.location.search);

  urlSearchParams.set(SORT_QUERY_PARAM, e.currentTarget.value);
  window.location.search = urlSearchParams.toString();
};

export type Props = Pick<ProductListingPage, "sortOptions"> & {
  quantityOfProducts: number | undefined;
};

const friedlyText = (text: string) => {
  if (text == "price:asc") return "Menor Preço";
  if (text == "price:desc") return "Maior Preço";
  if (text == "orders:desc") return "Mais vendidos";
  if (text == "name:desc") return "Z a A";
  if (text == "name:asc") return "A a Z";
  if (text == "release:desc") return "Novidades";
  if (text == "discount:desc") return "Maior desconto";
  if (text == "relevance:desc") return "Mais vistos";

  return text;
};

function Sort({ sortOptions, quantityOfProducts }: Props) {
  const sort = useSort();
  const isOpen = useSignal(false);
  return (
    <div class="absolute top-0 right-0 flex items-start gap-2 w-[49%] z-[21] sm:w-auto">
      <span class="text-[#1C1C1E] text-[12px] min-w-[90px] hidden h-[45px] items-center sm:flex">
        {quantityOfProducts} produtos:
      </span>
      <div
        class={`top-0 right-0 border-[1px] border-[#e0e0e0] w-full sm:w-[285px] z-20 rounded-[6px] bg-white duration-300 transition-height overflow-hidden ${
          isOpen.value ? "h-[370px]" : "h-[45px]"
        }`}
      >
        <div
          class="p-2.5 cursor-pointer text-[#636366] text-[14px] flex justify-center sm:justify-start items-center"
          onClick={() => {
            isOpen.value = !isOpen.value;
          }}
        >
          Ordenar Por
          <i
            class={`icon-arrow text-[12px] duration-300 absolute right-2 ${
              isOpen.value ? "rotate-0" : "rotate-180"
            }`}
          >
          </i>
        </div>
        <ul class="z-30">
          {sortOptions.map(({ value, label }) => (
            <li>
              <button
                class="p-2.5 hover:bg-[#e0e0e0] cursor-pointer w-full flex"
                key={value}
                value={value}
                selected={value === sort}
                onClick={applySort}
              >
                <span class="text-sm text-[#1C1C1E]">{friedlyText(label)}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sort;

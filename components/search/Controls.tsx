import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Sort from "$store/components/search/Sort.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import type {
  Filter,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { Color } from "$store/components/search/SearchResult.tsx";

const SIZES_ORDER = ["U", "XPP", "PP", "P", "M", "G", "GG"];

const sizesInOrder = (sizes: Filter[]) => {
  const letterSizes = (sizes[0].values as FilterToggleValue[]).filter((item) =>
    isNaN(parseInt(item.value))
  );
  const numberSizes = (sizes[0].values as FilterToggleValue[]).filter((item) =>
    !isNaN(parseInt(item.value))
  );
  const numbersInOrder = numberSizes.sort((a, b) =>
    parseInt(a.value) - parseInt(b.value)
  );
  const lettersInOrder = letterSizes.sort((a, b) =>
    SIZES_ORDER.indexOf(a.label) - SIZES_ORDER.indexOf(b.label)
  );
  const orderedSizes = [...lettersInOrder, ...numbersInOrder];

  return orderedSizes;
};

type Props =
  & Pick<ProductListingPage, "filters" | "breadcrumb" | "sortOptions">
  & {
    displayFilter?: boolean;
  }
  & { quantityOfProducts: number | undefined }
  & { filtersColor: Color[] };

function SearchControls(
  { filters, breadcrumb, sortOptions, quantityOfProducts, filtersColor }: Props,
) {
  const { displayFilterMenu } = useUI();
  const sizes = filters.filter((filter) =>
    filter.label.toLowerCase() === "tamanho"
  );
  const orderedSizes = sizesInOrder(sizes);
  const filterSize = filters.find(({ key }) => key === "tamanho");
  if (filterSize) {
    filterSize.values = orderedSizes;
  }

  return (
    <div class="flex flex-col justify-between mb-4 py-4 sm:mb-0 sm:p-0 sm:gap-4 sm:flex-row sm:min-h-[100px]">
      <div class="hidden sm:flex flex-row sm:p-0 mb-2 lg:pb-5 items-end">
        <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
      </div>

      <div class="flex flex-row items-center justify-between relative mt-3">
        <Button
          class={`border-[1px] border-[#e0e0e0] p-2.5 w-[49%] rounded-[6px] text-[#636366] text-[14px] h-[45px] ${
            displayFilterMenu.value ? "btn-ghost" : "btn-ghost sm:hidden"
          }`}
          onClick={() => {
            displayFilterMenu.value = true;
          }}
        >
          Filtrar Por
        </Button>
        {sortOptions.length > 0 && (
          <Sort
            sortOptions={sortOptions}
            quantityOfProducts={quantityOfProducts}
          />
        )}
      </div>

      <div
        class={`${
          displayFilterMenu.value ? "left-0" : "-left-full"
        } fixed top-0 transition-all w-full bg-white z-50 h-full duration-300 ease-linear`}
      >
      </div>
      <div
        class={`${
          displayFilterMenu.value ? "left-0" : "-left-full"
        } fixed top-0 transition-all w-full bg-[#000000cc] z-50 h-full duration-300 ease-linear`}
      >
      </div>
      <div
        class={`${
          displayFilterMenu.value ? "left-0" : "-left-full"
        } fixed top-0 transition-all w-[calc(100%-40px)] bg-white z-50 h-full duration-300 ease-linear p-[22px_18px_15px_15px]`}
      >
        <Button
          aria-label="Close minicart"
          class="absolute -right-10 top-2"
          onClick={() => {
            displayFilterMenu.value = !displayFilterMenu.value;
          }}
        >
          <Icon
            id="XMark"
            width={35}
            height={35}
            strokeWidth={1.5}
            class="text-white"
          />
        </Button>
        <Filters filters={filters} filtersColor={filtersColor} />
      </div>
    </div>
  );
}

export default SearchControls;

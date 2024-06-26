import { useUI } from "$store/sdk/useUI.ts";
import Searchcar, {
  Props as SearchbarProps,
} from "$store/components/search/Searchbar.tsx";

// const LazySearchbar = lazy(() =>
//   import("$store/components/search/Searchbar.tsx")
// );

interface Props {
  searchbar: SearchbarProps;
}

function Searchbar({ searchbar }: Props) {
  const { displaySearchbar } = useUI();
  const open = displaySearchbar.value;

  return (
    <div
      class={`${
        open
          ? "block border-y border-base-200 shadow lg:shadow-none lg:border-0"
          : "hidden"
      } fixed lg:absolute lg:pointer-events-none lg:mt-0 left-0 top-0 w-screen lg:w-auto z-50 bg-base-100 lg:bg-transparent mt-[58px]`}
    >
      <>
        <div
          class={`z-20 fixed lg:relative h-0 lg:h-12 w-full bg-white lg:border-b lg:border-b-black lg:right-full transition-all duration-300 ease-linear opacity-0 ${
            open ? "opacity-100 h-12 lg:pointer-events-auto" : ""
          }`}
        >
          <Searchcar {...searchbar} variant="desktop" />
        </div>
      </>
    </div>
  );
}

export default Searchbar;

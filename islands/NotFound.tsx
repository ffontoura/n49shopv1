import { useEffect, useRef, useState } from "preact/hooks";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";

export default function NotFound({ headingText }: { headingText: string }) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!searchInputRef.current) {
      return;
    }

    searchInputRef.current.focus();
  }, []);

  return (
    <div class="home-container-mobile lg:home-container bg-white relative top-[-90px] lg:top-[-150px] pt-[100px]">
      <div class="text-center">
        <h1 class="text-info text-base lg:text-[22px] mb-5 leading-[130%] mx-auto">
          Desculpe, a página não foi encontrada
        </h1>
        <p class="text-black text-base lg:text-[22px] font-bold mb-5 capitalize">
          {'"'}
          {IS_BROWSER && new URL(window.location?.href).searchParams.get("q")}
          {'"'}
        </p>
      </div>
      <div class="text-center">
        <p class="text-info text-base lg:text-[22px] mb-8">
          Por favor, refaça a busca
        </p>
        <div class="hidden lg:block">
          <div class="flex items-center gap-4 px-4 lg:px-5 h-12 w-80 mx-auto">
            <form
              id="searchbar"
              action={"/s"}
              class="flex-grow flex gap-3 px-5 lg:px-0 items-center border-b border-b-black"
            >
              <input
                ref={searchInputRef}
                id="search-input"
                class="h-full bg-transparent flex-grow outline-none placeholder:text-black text-xs text-black pl-3"
                name={"q"}
                required={true}
                onInput={(e) => {
                  const value = e.currentTarget.value;

                  setSearchTerm(value);
                }}
                value={searchTerm}
                placeholder={"O que você está buscando?"}
                role="combobox"
                aria-controls="search-suggestion"
                autocomplete="off"
              />
              <Button
                class="relative right-[-35px] top-0 lg:text-2.5xl"
                aria-label="Search"
                htmlFor="searchbar"
                tabIndex={-1}
                type="submit"
              >
                <i class="icon-search text-[#636366]"></i>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

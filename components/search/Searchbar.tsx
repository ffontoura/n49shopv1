/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */

import { useEffect, useRef, useState } from "preact/compat";
import Icon from "$store/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import Button from "$store/components/ui/Button.tsx";
// import Spinner from "$store/components/ui/Spinner.tsx";
// import ProductCard from "$store/components/product/ProductCard.tsx";
// import Slider from "$store/components/ui/Slider.tsx";
import { useAutocomplete } from "apps/vtex/hooks/useAutocomplete.ts";
// import { useUI } from "$store/sdk/useUI.ts";
import { AnalyticsEvent } from "apps/commerce/types.ts";
import { sendEvent } from "$store/sdk/analytics.tsx";

// declare global {
//   interface Window {
//     DECO_SITES_STD: {
//       sendAnalyticsEvent: (args: AnalyticsEvent) => void;
//     };
//   }
// }

// Editable props
export interface EditableProps {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;
  /**
   * TODO: Receive querystring from parameter in the server-side
   */
  query?: string;
}

export type Props = EditableProps & {
  variant?: "desktop" | "mobile";
};

interface productCardSugestion {
  href: string;
  image: string;
  label: string;
}

interface searchSugestion {
  href: string;
  label: string;
}

function Searchbar({
  placeholder = "What are you looking for?",
  action = "/s",
  name = "q",
  query,
  variant = "mobile",
}: Props) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  // const { setSearch, suggestions, loading } = useAutocomplete();
  const [searchTerm, setSearchTerm] = useState("");
  const [sugestions, setSugestions] = useState<Array<searchSugestion>>([]);
  const [sugestionsProducts, setSugestionsProducts] = useState<
    Array<productCardSugestion>
  >([]);
  // const hasProducts = Boolean(suggestions.value?.products?.length);
  // const hasTerms = Boolean(suggestions.value?.searches?.length);
  //const notFound = !hasProducts && !hasTerms;

  useEffect(() => {
    if (!searchInputRef.current) {
      return;
    }

    searchInputRef.current.focus();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.length > 2) {
        fetch("/deco/autocomplete?term=" + searchTerm, {
          method: "GET",
          headers: {
            "content-type": "application/json",
            "accept": "application/json",
          },
        })
          .then((response) => response.json())
          .then((result) => {
            // deno-lint-ignore no-explicit-any
            result?.itemsReturned?.forEach((item: any) => {
              const parsedUrl = new URL(item.href);
              const path = parsedUrl.pathname;
              if (item.criteria) {
                setSugestions(
                  (prevSugestions) => [...prevSugestions, {
                    label: item.criteria,
                    href: path,
                  }],
                );
              }
              if (!item.criteria) {
                const parsedUrl = new URL(item.href);
                const path = parsedUrl.pathname;
                setSugestionsProducts(
                  (prevSugestionsProducts) => [...prevSugestionsProducts, {
                    href: path,
                    image: item.thumbUrl,
                    label: item.name,
                  }],
                );
              }
            });
          });
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div class="flex flex-col bg-base-100 lg:bg-transparent">
      <div class="flex items-center gap-4 px-4 lg:px-5 h-12 w-64">
        <form
          id="searchbar"
          action={action}
          class="flex-grow flex gap-3 px-5 lg:px-0 items-center"
        >
          <input
            ref={searchInputRef}
            id="search-input"
            class="h-full bg-transparent flex-grow outline-none placeholder:text-black text-xs text-black"
            name={name}
            required={true}
            defaultValue={query}
            onInput={(e) => {
              const value = e.currentTarget.value;

              if (value) {
                sendEvent({
                  name: "search",
                  params: { search_term: value },
                });
              }

              // setSearch(value);
              setSearchTerm(value);

              if (
                // deno-lint-ignore no-explicit-any
                (e as any).inputType == "deleteContentBackward" ||
                // deno-lint-ignore no-explicit-any
                (e as any).inputType == "deleteContentForward"
              ) {
                setSugestions([]);
                setSugestionsProducts([]);
              }
            }}
            value={searchTerm}
            placeholder={placeholder}
            role="combobox"
            aria-controls="search-suggestion"
            autocomplete="off"
          />
          <Button
            class="absolute right-4 lg:left-[104%] lg:top-[6px] lg:text-2.5xl"
            aria-label="Search"
            htmlFor="searchbar"
            tabIndex={-1}
            type="submit"
          >
            <i class="icon-search text-[#636366]"></i>
          </Button>
        </form>
        {/* {variant === "desktop" && <CloseButton />} */}
      </div>
      {sugestions.length > 0 &&
        sugestionsProducts.length > 0 &&
        (
          <div class="w-full bg-white px-4.5 lg:px-5 lg:py-5 lg:max-w-[460px] lg:absolute lg:top-[150%] lg:right-[-20%] lg:w-[460px] lg:shadow-searchsugestions lg:rounded-tl-md lg:rounded-tr-md">
            <div class="hidden lg:block w-3 h-3 border-l border-l-[#C7C7CC] border-t border-t-[#C7C7CC] rotate-45 bg-white absolute top-[-7px] right-5">
            </div>
            <div class="py-2.5 pt-[5px]">
              {sugestions.length > 0 &&
                sugestions.map((item) => (
                  <a
                    class="block py-2.5 text-sm pb-5 text-black"
                    href={item.href}
                  >
                    {searchTerm} em {item.label.split("¢")[0]}
                  </a>
                ))}
            </div>
            <div class="max-h-[400px] border-t border-t-[#AEAEB2] py-2.5 overflow-y-auto search-scroll">
              {sugestionsProducts.length > 0 &&
                sugestionsProducts.map((item) => (
                  <a class="flex my-2.5 py-2.5 items-center" href={item.href}>
                    <Image
                      src={item.image.replace("25-25", "75-75")}
                      alt={item.label}
                      width={44}
                      height={48}
                      sizes="(max-width: 640px) 50vw, 20vw"
                      loading={"eager"}
                      decoding="async"
                    />
                    <span class="text-xs font-black capitalize">
                      {item.label}
                    </span>
                  </a>
                ))}
            </div>
          </div>
        )}
    </div>
  );
}

export default Searchbar;

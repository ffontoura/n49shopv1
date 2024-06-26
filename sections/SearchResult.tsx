import SearchResult, {
  MainProps,
} from "$store/components/search/SearchResult.tsx";
import type { FnContext } from "deco/mod.ts";

function SearchResultSection(props: MainProps & { device: string }) {
  return <SearchResult {...props} />;
}

export const loader = (
  props: MainProps,
  req: Request,
  ctx: FnContext,
) => {
  const device = ctx.device;
  return {
    ...props,
    device: device || "desktop",
  };
};

export default SearchResultSection;

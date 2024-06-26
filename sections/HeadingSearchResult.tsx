import {
  HeadingSearchResult,
  MainProps,
  Props,
} from "$store/components/search/HeadingSearchResult.tsx";

function HeadingSearchResultSection(props: MainProps) {
  return <HeadingSearchResult {...props} />;
}

export default HeadingSearchResultSection;

export function loader({ text }: Props, req: Request) {
  const url = new URL(req.url);

  if (new URLPattern({ pathname: "/s" }).test(url)) {
    return {
      headingText: url.searchParams.get("q") ?? "",
      text: text,
    };
  }

  return {
    headingText: "",
    text: text,
  };
}

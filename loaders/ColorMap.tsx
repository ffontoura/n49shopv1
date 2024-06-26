import { Color } from "$store/components/search/SearchResult.tsx";

interface Props {
  /** @title Color props */
  colors: Color[];
}
/** @title Color Map Configuration */
const loader = ({ colors }: Props): Color[] => colors;

export default loader;

import { allowCorsFor, FnContext } from "deco/mod.ts";

/**
 * @title Column {{{head}}}
 */
export interface Column {
  head: string;
  values: string[];
}

/**
 * @title {{{nameTable}}} - {{{collection}}}
 */
export interface Table {
  /**
   * @title Table name
   */
  nameTable?: string;
  /**
   * @title Collection ID
   * @description (e.g.: 150)
   * @pattern \d*
   * @format dynamic-options
   * @options vtex/loaders/collections/list.ts
   */
  collection: string;
  /**
   * @title Columns
   */
  columns: Column[];
}

export interface Props {
  tableByColection: Table[];
}

/**
 * @title Size Table by CollectionID
 */
const loader = (
  { tableByColection }: Props,
  req: Request,
  ctx: FnContext,
): Table[] => {
  // Allow Cors
  Object.entries(allowCorsFor(req)).map(([name, value]) => {
    ctx.response.headers.set(name, value);
  });

  return tableByColection;
};

export default loader;

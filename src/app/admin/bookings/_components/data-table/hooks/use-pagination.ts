import { parseAsIndex, parseAsInteger, useQueryStates } from "nuqs";

export const DEFAULT_PAGE_SIZE = 8;
export const PAGE_SIZES = [DEFAULT_PAGE_SIZE, 14, 20, 50, 100];

const paginationParsers = {
  pageIndex: parseAsIndex.withDefault(0),
  pageSize: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
};

const paginationUrlKeys = {
  pageIndex: "page",
  pageSize: "perPage",
};

export function usePagination() {
  return useQueryStates(paginationParsers, {
    urlKeys: paginationUrlKeys,
  });
}

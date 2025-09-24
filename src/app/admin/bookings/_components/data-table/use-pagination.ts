import { parseAsIndex, parseAsInteger, useQueryStates } from "nuqs";

export const DEFAULT_PAGE_SIZE = 14;

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
